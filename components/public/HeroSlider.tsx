'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Radiant Smiles',
    subtitle: 'Crafting Your',
    desc: 'Experience world-class dental care with cutting-edge technology and a compassionate team dedicated to your perfect smile near Sarjapur Road.',
    img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&w=2000&q=80',
    badge: 'Cosmetic Excellence',
  },
  {
    id: 2,
    title: 'Precision Implants',
    subtitle: 'Restore Your Bite with',
    desc: 'From advanced All-On-Four surgical implants to flawless ceramic crowns, we deliver maximum clinical results with minimal recovery time to elevate your confidence.',
    img: 'https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?ixlib=rb-4.0.3&w=2000&q=80',
    badge: 'Restorative Excellence',
  },
  {
    id: 3,
    title: 'Ultimate Comfort',
    subtitle: 'Painless Procedures &',
    desc: "Whether you're looking to perfect your smile with porcelain veneers or invisible aligners near Kodathi gate, our specialized dental team provides transformative solutions effortlessly.",
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&w=2000&q=80',
    badge: 'Anxiety-Free Clinic',
  },
];

const SLIDE_DURATION = 5000; // ms per slide

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  };

  // Auto-advance without progress bar
  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] max-h-[900px] sm:p-4 lg:p-6 overflow-hidden">
      <div className="relative w-full h-full sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/40 z-10" />
            <img
              src={slide.img}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {index === current && (
              <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 w-full max-w-7xl mx-auto">
                <div className="space-y-6 sm:space-y-8 max-w-2xl mb-16 sm:mb-0">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span className="uppercase tracking-widest">{slide.badge}</span>
                    </div>
                  </div>
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] drop-shadow-xl tracking-tight">
                    <span className="block text-slate-200 font-light text-2xl sm:text-4xl lg:text-5xl mb-2 drop-shadow-md tracking-normal">
                      {slide.subtitle}
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
                      {slide.title}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-lg lg:text-xl text-slate-100 max-w-xl leading-relaxed drop-shadow-lg">
                    {slide.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Link
                      href="/booking"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white shadow-xl shadow-emerald-500/20 transition-all duration-300 w-full sm:w-auto"
                    >
                      Book Consultation <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Dot indicators + arrows — no progress bar */}
        <div className="absolute bottom-8 sm:bottom-12 left-0 w-full z-30 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Dot indicators */}
          <div className="flex gap-2 sm:gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'w-8 h-2.5 bg-white'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="gap-3 hidden sm:flex">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
