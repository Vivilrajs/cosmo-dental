'use client';

import { use } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { FileText, ArrowLeft } from 'lucide-react';

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { news } = useStore();
  const article = news.find((n) => String(n.id) === id);

  if (!article) {
    return (
      <div className="pt-40 text-center pb-20">
        <p className="text-slate-500 mb-6">Article not found.</p>
        <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <PageHeader
        title={article.title}
        subtitle={`${article.date} • ${article.author}`}
        breadcrumbs={[{ label: 'News', href: '/news' }, { label: 'Article' }]}
        bgImage={article.img_url}
      />

      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-xl border border-slate-100">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold mb-6 sm:mb-8 uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {article.category}
          </div>
          <div className="prose prose-base sm:prose-lg prose-slate max-w-none">
            <p className="text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8">{article.content}</p>
            <p className="text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8">
              Medical innovation in this sector is advancing rapidly. By staying updated with our clinical blog, you
              can ensure that you are making the most informed decisions about your oral health and aesthetic goals at
              our Sarjapur road clinic.
            </p>
          </div>
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 flex items-center justify-between">
            <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all tracking-widest uppercase">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <BookingCtaBanner />
      </div>
    </div>
  );
}
