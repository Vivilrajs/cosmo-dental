'use client';

import { useState } from 'react';
import PageHeader from '@/components/public/PageHeader';
import { servicesData } from '@/lib/data';
import { Calendar, CheckCircle2, User, Mail, Phone, CalendarDays, Stethoscope } from 'lucide-react';

export default function BookingPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: servicesData[0].title,
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', service: servicesData[0].title, date: '' });
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm sm:text-base font-medium bg-white transition-colors';
  const labelClass = 'block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest';

  return (
    <div className="pb-20">
      <PageHeader
        title="Book an Appointment"
        subtitle="Schedule your visit with our expert dental team. We'll confirm your appointment within 24 hours."
        icon={Calendar}
        breadcrumbs={[{ label: 'Booking' }]}
        bgImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-3xl mx-auto">

        {success ? (
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 shadow-xl border border-slate-100 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Appointment Requested!</h3>
            <p className="text-slate-600 mb-2 text-sm sm:text-base">Thank you! We&apos;ve received your booking request.</p>
            <p className="text-slate-600 mb-8 text-sm sm:text-base">
              A confirmation email has been sent to your inbox. Our team will call you to confirm the slot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSuccess(false)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-all tracking-widest uppercase"
              >
                Book Another
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all tracking-widest uppercase"
              >
                Back to Home
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 sm:p-8 text-white">
              <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mb-1">Your Appointment Details</h3>
              <p className="text-emerald-100 text-sm">Fill in your details and we&apos;ll get back to you within 24 hours.</p>
            </div>

            <div className="p-6 sm:p-10">
              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-bold text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Full Name</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email Address</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                {/* Phone + Date */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Phone Number</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      placeholder="9876543210"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center gap-1.5"><CalendarDays className="w-3 h-3" /> Preferred Date</span>
                    </label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1.5"><Stethoscope className="w-3 h-3" /> Service Required</span>
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={inputClass}
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Clinic info note */}
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <p className="text-emerald-800 text-xs sm:text-sm font-medium leading-relaxed">
                    📍 <strong>COSMO DENTAL</strong> — 1st floor, Shop no.40 & 41, Above HDFC Bank, Sarjapur Main Road, Bengaluru 560035
                    <br />
                    📞 063620 40923 &nbsp;|&nbsp; Mon–Sat: 9:00 AM – 9:00 PM
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full font-semibold text-sm sm:text-base uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Booking...' : 'Confirm Appointment'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
