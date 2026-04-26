'use client';

import { use } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { Star, Clock, CheckCircle2, Award, Info, Quote, ArrowLeft } from 'lucide-react';

export default function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { doctors } = useStore();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="pt-40 text-center pb-20 px-4">
        <p className="text-slate-500 mb-6 text-lg">Doctor not found.</p>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <PageHeader
        title={doctor.name}
        subtitle={doctor.role}
        breadcrumbs={[{ label: 'Doctors', href: '/doctors' }, { label: doctor.name }]}
        bgImage={doctor.img_url}
      />

      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mt-10 sm:mt-16">
        <div className="grid lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start">

          {/* Left sticky card */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-50 lg:sticky lg:top-28">
            <div className="h-[300px] sm:h-[400px] w-full relative">
              <img
                src={doctor.img_url}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold drop-shadow-md leading-tight tracking-tight">{doctor.name}</h2>
                <p className="text-emerald-300 font-bold uppercase tracking-[0.15em] drop-shadow-sm text-[10px] sm:text-xs mt-2">{doctor.role}</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-around mb-6 pb-6 border-b border-slate-100">
                <div className="text-center">
                  <div className="font-heading text-xl font-black text-slate-900 flex items-center justify-center gap-1">
                    {doctor.rating} <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Rating</p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="text-center">
                  <div className="font-heading text-xl font-black text-slate-900">{doctor.reviews}+</div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Reviews</p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="text-center">
                  <div className="font-heading text-xl font-black text-slate-900">15+</div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Yrs Exp.</p>
                </div>
              </div>
              <Link
                href="/booking"
                className="w-full inline-flex items-center justify-center py-4 rounded-full font-semibold text-sm tracking-[0.15em] uppercase bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Right content */}
          <div className="space-y-6 sm:space-y-8">

            {/* Quote */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-emerald-500/20 border border-emerald-400">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300 mb-4 opacity-80" />
              <p className="font-heading text-base sm:text-xl font-medium leading-relaxed relative z-10 tracking-wide italic">
                &ldquo;{doctor.quote}&rdquo;
              </p>
            </div>

            {/* About */}
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-3 tracking-tight">
                <div className="w-10 h-10 rounded-[1rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                About {doctor.name}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">{doctor.bio}</p>
            </div>

            {/* Specializations + Credentials */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mb-5 flex items-center gap-3 tracking-tight">
                  <div className="w-10 h-10 rounded-[1rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations?.map((spec, i) => (
                    <span key={i} className="px-3 py-1.5 bg-emerald-50/80 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-bold tracking-wide">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mb-5 flex items-center gap-3 tracking-tight">
                  <div className="w-10 h-10 rounded-[1rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  Credentials
                </h3>
                <ul className="space-y-3">
                  {doctor.credentials?.map((cred, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-xs sm:text-sm font-bold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Consultation Hours */}
            <div className="bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
              <h3 className="font-heading text-base sm:text-lg font-bold mb-6 flex items-center gap-3 relative z-10 tracking-tight">
                <div className="w-10 h-10 rounded-[1rem] bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                Consultation Hours
              </h3>
              <div className="grid grid-cols-2 gap-6 text-sm relative z-10">
                <div>
                  <p className="text-slate-400 mb-1.5 font-bold uppercase tracking-widest text-[10px]">Mon - Sat</p>
                  <p className="font-bold text-white">9:00 AM - 9:00 PM</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1.5 font-bold uppercase tracking-widest text-[10px]">Sunday</p>
                  <p className="font-bold text-emerald-400 mt-1">Closed</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-16">
        <BookingCtaBanner />
      </div>
    </div>
  );
}
