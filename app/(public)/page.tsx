'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users, Star, Award, Info, Cpu, Activity, Camera, Zap, ShieldCheck, Smile,
  Sparkles, Laptop, Video, Crosshair, Tv, Microscope, CheckCircle2, Plus, Minus, ImageIcon,
} from 'lucide-react';
import HeroSlider from '@/components/public/HeroSlider';
import TestimonialCarousel from '@/components/public/TestimonialCarousel';
import DoctorsCarousel from '@/components/public/DoctorsCarousel';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { useStore } from '@/lib/store';
import { servicesData, technologyEquipment } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck, Star, Sparkles, Smile, Activity, Zap, Camera, Laptop, Video, Crosshair, Tv, Cpu,
};

export default function HomePage() {
  const { doctors, testimonials, faqs, galleryImages } = useStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="space-y-20 sm:space-y-32 pb-20">
      <HeroSlider />

      {/* Stats Banner */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto -mt-24 sm:-mt-28 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {[
            { icon: Users, value: '15k+', label: 'Happy Patients', color: 'text-emerald-600', bg: 'bg-emerald-100/50', accent: 'bg-emerald-50', textColor: 'text-emerald-500', labelColor: 'text-emerald-800' },
            { icon: Star, value: '4.9', sub: '/5', label: 'Average Rating', color: 'text-amber-500', bg: 'bg-amber-100/50', accent: 'bg-amber-50', textColor: 'text-slate-400', labelColor: 'text-amber-800' },
            { icon: Award, value: '15+', label: 'Years Experience', color: 'text-teal-600', bg: 'bg-teal-100/50', accent: 'bg-teal-50', textColor: 'text-teal-500', labelColor: 'text-teal-800' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
              <div className={`absolute -top-24 -right-24 w-64 h-64 ${stat.accent} rounded-full -z-10 group-hover:scale-105 transition-transform duration-700 ease-out`} />
              <div className={`w-[72px] h-[72px] ${stat.bg} ${stat.color} rounded-[1.5rem] flex items-center justify-center mb-6`}>
                <stat.icon className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-[2.75rem] sm:text-5xl font-black text-slate-900 mb-2 tracking-tight leading-none">
                {stat.value}
                {stat.sub && <span className={`text-3xl sm:text-4xl ${stat.textColor} font-bold`}>{stat.sub}</span>}
                {!stat.sub && <span className={stat.textColor}>+</span>}
              </h3>
              <p className={`${stat.labelColor} font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] mt-1`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold mb-4 sm:mb-6 uppercase tracking-widest">
          <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> About Us
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-6 leading-tight tracking-tight max-w-4xl">
          Welcome to Cosmodental — Your Trusted Cosmetic & Dental Care Partner
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-medium mb-6 max-w-4xl">
          At Cosmodental, we combine advanced dental science with aesthetic excellence to bring you comprehensive care
          for your smile and confidence. Our expert team is dedicated to delivering personalized treatments that focus
          on both your oral health and your natural beauty.
        </p>
        <p className="text-sm sm:text-base text-emerald-700 font-bold tracking-wider uppercase">
          Recognized as the Best Dental Clinic in Sarjapur Road, near Kodathi Gate
        </p>
      </section>

      {/* Technology Overview */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-left max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold mb-4 sm:mb-6 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Our Technology
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
            Providing Top-Quality Care with Advanced Dental Technology
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            We use the latest dental technology to provide faster, more accurate, and minimally invasive treatments.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {technologyEquipment.map((tech, idx) => {
            const Icon = iconMap[tech.iconName] || Activity;
            return (
              <div key={idx} className="bg-white rounded-[1.5rem] p-5 sm:p-6 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-[1rem] flex items-center justify-center mb-4 ${tech.bg} ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-sm leading-snug">{tech.name}</h3>
                {tech.subtitle && <p className="text-[10px] sm:text-xs text-slate-500 mt-1.5 font-bold uppercase tracking-wider">{tech.subtitle}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Overview */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div className="text-left max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Delivering Outstanding Care
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Your oral health deserves the best. Discover the comprehensive clinical treatments we provide.
            </p>
          </div>
          <Link href="/services" className="hidden sm:inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-white tracking-widest uppercase transition-all">
            View All Services
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => {
            const Icon = iconMap[service.iconName] || ShieldCheck;
            return (
              <div key={idx} className={`group relative rounded-[2.5rem] p-8 sm:p-10 border shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 ${service.cardBg} ${service.shadow}`}>
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none bg-white" />
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-white/20 ${service.bg}`}>
                    <Icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3 relative z-10 leading-tight drop-shadow-md">
                  {service.title}
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8 flex-grow relative z-10 font-medium">
                  {service.desc}
                </p>
                <Link
                  href={`/services/${service.id}`}
                  className={`w-full py-4 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 relative z-10 font-heading tracking-wide ${service.btnBg}`}
                >
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/services" className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-white tracking-widest uppercase transition-all">
            View All Services
          </Link>
        </div>
      </section>

      {/* Doctors Carousel */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-4 sm:mb-8">
          <div className="text-left max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Our Medical Experts
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Our team of specialized and expert doctors is dedicated to delivering top-tier dental care.
            </p>
          </div>
          <Link href="/doctors" className="hidden sm:inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-white tracking-widest uppercase transition-all">
            View All Doctors
          </Link>
        </div>
        <DoctorsCarousel doctors={doctors} />
        <div className="mt-4 sm:hidden">
          <Link href="/doctors" className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-white tracking-widest uppercase transition-all">
            View All Doctors
          </Link>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div className="text-left max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Clinic Gallery
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Take a tour through our state-of-the-art medical facility near Kodathi gate.
            </p>
          </div>
          <Link href="/gallery" className="hidden sm:inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-white tracking-widest uppercase transition-all">
            View Full Gallery
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {galleryImages.slice(0, 4).map((src, idx) => (
            <Link key={idx} href="/gallery" className="relative group rounded-[1.5rem] overflow-hidden cursor-pointer shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 aspect-square block">
              <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/20 transition-colors duration-300 z-10" />
              <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl text-emerald-600 shadow-lg">
                  <ImageIcon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/gallery" className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-white tracking-widest uppercase transition-all">
            View Full Gallery
          </Link>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="bg-slate-900 text-white py-20 sm:py-32 relative overflow-hidden sm:rounded-[3rem] sm:mx-6 lg:mx-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative px-4 sm:px-0 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-teal-500/30 rounded-[2rem] sm:rounded-[3rem] transform rotate-3 sm:rotate-6 scale-105 blur-xl -z-10 group-hover:rotate-12 transition-transform duration-700" />
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&w=1000&q=80"
              alt="Dental Technology"
              className="rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl w-full object-cover relative z-10"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <Microscope className="w-4 h-4" />
              <span>State-of-the-Art Medical Technology</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Advanced Clinical Care for{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Maximum Results.
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              We&apos;ve equipped our clinic near Kodathi gate with the most advanced medical and dental technology.
              From surgical laser therapies to 3D oral mapping, your healthcare is faster, safer, and remarkably
              precise.
            </p>
            <ul className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              {[
                '3D Oral Scanners (No messy clinical impressions)',
                'Advanced Laser Therapies (Painless gum treatments)',
                'AI-Assisted Orthodontic Treatment Planning',
                'Silent Micro-Drills (Anxiety-free dental treatments)',
              ].map((tech, i) => (
                <li key={i} className="flex items-start sm:items-center gap-3 text-slate-200 text-sm sm:text-base font-medium">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5 sm:mt-0" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-[#FAFAFC] to-emerald-50/50 py-16 sm:py-24 sm:rounded-[3rem] sm:mx-6 lg:mx-12 overflow-hidden border border-slate-100/50 shadow-sm">
        <div className="text-left mb-8 sm:mb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
            Patient Reviews
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Hear from patients who have completed their dental care journey with us.
          </p>
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
        <div className="text-left">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Patient FAQs
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Common medical questions about beginning your dental treatment.
          </p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-emerald-100/50 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50/30 to-white hover:border-emerald-300 transition-colors shadow-sm hover:shadow-md">
              <button
                className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between font-bold text-emerald-950 focus:outline-none"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <span className="font-heading text-sm sm:text-base pr-4 tracking-wide">{faq.question}</span>
                {activeFaq === idx ? (
                  <Minus className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-emerald-300 shrink-0" />
                )}
              </button>
              <div className={`px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-48 pb-4 sm:pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-emerald-900/80 font-medium text-sm sm:text-base leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookingCtaBanner />
    </div>
  );
}
