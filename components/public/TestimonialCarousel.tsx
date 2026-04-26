'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import type { Testimonial } from '@/types';

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = window.innerWidth < 768 ? window.innerWidth - 48 : 400;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <div className="flex justify-end gap-3 mb-6">
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
        {testimonials.map((review, idx) => (
          <div key={idx} className="w-[85vw] sm:w-[400px] snap-center sm:snap-start shrink-0 flex">
            <div className="w-full backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 flex flex-col hover:border-emerald-300">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-200 mb-4 sm:mb-6 shrink-0" />
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(Number(review.rating) || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 shrink-0" />
                ))}
              </div>
              <p className="text-emerald-950 mb-6 sm:mb-8 italic text-sm sm:text-base leading-relaxed flex-grow font-medium">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mt-auto border-t border-emerald-100/50 pt-4 sm:pt-6">
                <img
                  src={review.avatar_url || 'https://via.placeholder.com/150'}
                  alt={review.author}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-emerald-200 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm sm:text-base font-heading">{review.author}</h4>
                  <p className="text-xs sm:text-sm text-emerald-600 font-bold uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
