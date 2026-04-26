'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Doctor } from '@/types';

export default function DoctorsCarousel({ doctors }: { doctors: Doctor[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = window.innerWidth < 768 ? window.innerWidth - 48 : 380;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-end gap-3 mb-2 sm:mb-6">
        <button
          onClick={() => scroll('left')}
          className="p-3 rounded-full bg-white border border-emerald-200 text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all shadow-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="p-3 rounded-full bg-white border border-emerald-200 text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all shadow-sm"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {doctors.map((doc, idx) => (
          <div key={idx} className="w-[85vw] sm:w-[350px] snap-center sm:snap-start shrink-0 flex">
            <div className="w-full flex flex-col items-center text-center p-6 sm:p-8 group bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden rounded-[2rem]">
              <div className="absolute top-0 left-0 w-full h-32 bg-emerald-50/50 -z-10" />
              <Link href={`/doctors/${doc.id}`}>
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl shadow-emerald-500/10 group-hover:border-emerald-100 transition-colors cursor-pointer shrink-0">
                  <img
                    src={doc.img_url}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </Link>
              <Link href={`/doctors/${doc.id}`}>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors tracking-wide cursor-pointer line-clamp-1">
                  {doc.name}
                </h3>
              </Link>
              <p className="text-emerald-600 font-bold mb-4 text-[10px] uppercase tracking-[0.2em] line-clamp-1 min-h-[15px]">
                {doc.role}
              </p>
              <p className="text-slate-600 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed font-medium">{doc.bio}</p>
              <Link
                href={`/doctors/${doc.id}`}
                className="w-full mt-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-xs tracking-[0.15em] uppercase bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all duration-300 shrink-0"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
