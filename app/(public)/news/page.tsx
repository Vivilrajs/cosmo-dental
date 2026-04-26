'use client';

import Link from 'next/link';
import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { useStore } from '@/lib/store';
import { FileText, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const { news } = useStore();

  return (
    <div className="pb-20">
      <PageHeader
        title="Dental Health Blog"
        subtitle="The latest clinical insights, oral hygiene tips, and technological breakthroughs from our medical team."
        icon={FileText}
        breadcrumbs={[{ label: 'News' }]}
        bgImage="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <div key={article.id} className="backdrop-blur-xl rounded-[2rem] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden !p-0 flex flex-col h-full group cursor-pointer bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-100 hover:border-emerald-300">
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
              <img src={article.img_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-600 z-20 shadow-sm border border-white">
                {article.category}
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <p className="text-[10px] sm:text-xs text-emerald-500 mb-3 font-extrabold uppercase tracking-widest">{article.date}</p>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-600 transition-colors leading-tight tracking-wide">
                {article.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow font-medium">{article.excerpt}</p>
              <Link
                href={`/news/${article.id}`}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 mt-auto font-heading tracking-widest uppercase"
              >
                Read Article <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <BookingCtaBanner />
      </div>
    </div>
  );
}
