import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, date } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !service?.trim() || !date?.trim()) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }

    // --- Save to Supabase ---
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: service.trim(),
        date: date.trim(),
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to save appointment. Please try again.' },
        { status: 500 }
      );
    }

    // --- Send emails (non-fatal) ---
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && resendKey !== 're_...') {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@cosmidental.in';
        const clinicEmail = process.env.CLINIC_EMAIL || 'fivesdental@gmail.com';

        await Promise.all([
          resend.emails.send({
            from: fromEmail,
            to: email,
            subject: 'Your Appointment at COSMO DENTAL is Confirmed',
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
                <h1 style="color:#059669;">COSMO DENTAL</h1>
                <h2>Appointment Confirmation</h2>
                <p>Dear ${name},</p>
                <p>Your appointment request has been received. Here are your details:</p>
                <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                  <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Service</td><td style="padding:8px;border:1px solid #e5e7eb;">${service}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Date</td><td style="padding:8px;border:1px solid #e5e7eb;">${date}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Status</td><td style="padding:8px;border:1px solid #e5e7eb;color:#d97706;">Pending Confirmation</td></tr>
                </table>
                <p>Our team will call you at <strong>${phone}</strong> to confirm your appointment slot.</p>
                <p><strong>Clinic Address:</strong><br>1st floor, Shop no.40 & 41, Above HDFC Bank Sarjapur Main Road,<br>Ambedkar Nagar, Chikkabellandur, Mullur, Bengaluru, Karnataka 560035</p>
                <p><strong>Phone:</strong> 063620 40923</p>
                <p style="color:#6b7280;font-size:12px;">© 2026 COSMO DENTAL. All rights reserved.</p>
              </div>
            `,
          }),
          resend.emails.send({
            from: fromEmail,
            to: clinicEmail,
            subject: `New Booking: ${name} — ${service}`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
                <h2 style="color:#059669;">New Appointment Booking</h2>
                <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                  <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Patient</td><td style="padding:8px;border:1px solid #e5e7eb;">${name}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #e5e7eb;">${email}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #e5e7eb;">${phone}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Service</td><td style="padding:8px;border:1px solid #e5e7eb;">${service}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Date</td><td style="padding:8px;border:1px solid #e5e7eb;">${date}</td></tr>
                </table>
              </div>
            `,
          }),
        ]);
      } catch (emailErr) {
        console.error('Email send failed (non-fatal):', emailErr);
      }
    }

    return NextResponse.json(
      { success: true, appointmentId: appointment.id },
      { status: 201 }
    );
  } catch (err) {
    console.error('Appointment API error:', err);
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
