'use client';

import { useState } from 'react';
import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { MessageSquare, MapPin, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Medical Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: 'General Medical Inquiry', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pb-20">
      <PageHeader
        title="Contact Our Clinic"
        subtitle="Ready to align your smile and enhance your oral health? Reach out to our clinical team, we are always here to help."
        icon={MessageSquare}
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Info */}
        <div className="space-y-6 sm:space-y-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">Clinic Location</h2>
          {[
            {
              icon: MapPin,
              title: 'Address',
              content: '1st floor, Shop no.40 & 41,\nAbove HDFC Bank Sarjapur Main Road,\nAmbedkar Nagar, Chikkabellandur, Mullur,\nBengaluru, Karnataka 560035',
            },
            { icon: Phone, title: 'Direct Line', content: '063620 40923' },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8 rounded-[2rem] shadow-lg shadow-emerald-500/5 border border-emerald-100 flex items-start gap-4 hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-emerald-950 mb-1 text-sm sm:text-base tracking-wide">{item.title}</h4>
                <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed whitespace-pre-line">{item.content}</p>
              </div>
            </div>
          ))}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
            <h4 className="font-heading font-bold text-base sm:text-lg mb-4 flex items-center gap-2 relative z-10 tracking-wide">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> Clinic Timings
            </h4>
            <ul className="space-y-3 relative z-10 text-sm sm:text-base">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Mon - Sat</span>
                <span className="font-bold">9:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-emerald-400 font-bold">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-xl border border-slate-100 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-bl-full -z-10" />
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-6 tracking-tight">Send a Message</h3>
          {submitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-bold text-sm">
              ✓ Message sent! We&apos;ll get back to you soon.
            </div>
          )}
          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-widest">Name</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm sm:text-base font-medium" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-widest">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm sm:text-base font-medium" placeholder="jane@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-widest">Subject</label>
              <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-white text-sm sm:text-base font-medium">
                <option>General Medical Inquiry</option>
                <option>Book Appointment</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-widest">Message</label>
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none resize-none text-sm sm:text-base font-medium" placeholder="How can we help you today?" />
            </div>
            <button type="submit" className="w-full py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16">
        <BookingCtaBanner />
      </div>
    </div>
  );
}
