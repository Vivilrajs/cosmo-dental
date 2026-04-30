'use client';

import Link from 'next/link';
import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { useStore } from '@/lib/store';
import { Users } from 'lucide-react';

export default function DoctorsPage() {
  const { doctors } = useStore();

  return (
    <div className="pb-20">
      <PageHeader
        title="Our Specialized Doctors"
        subtitle="Our team of specialized and expert doctors is dedicated to delivering top-tier dental care. Whether it's routine care or complex procedures, you can trust our professionals for personalized, precise treatment."
        icon={Users}
        breadcrumbs={[{ label: 'Doctors' }]}
        bgImage="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-16">
        {doctors.map((doc) => (
          <div key={doc.id} className="flex flex-col items-center text-center p-6 sm:p-8 group bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden rounded-[2rem]">
            <div className="absolute top-0 left-0 w-full h-32 bg-emerald-50/50 -z-10" />
            <Link href={`/doctors/${doc.id}`}>
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl shadow-emerald-500/10 group-hover:border-emerald-100 transition-colors cursor-pointer shrink-0">
                <img src={doc.img_url} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </Link>
            <Link href={`/doctors/${doc.id}`}>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors tracking-tight cursor-pointer leading-tight">
                {doc.name}
              </h3>
            </Link>
            <p className="text-emerald-600 font-bold mb-5 text-xs sm:text-sm uppercase tracking-[0.16em] leading-relaxed max-w-[28ch]">
              {doc.role}
            </p>
            <p className="text-slate-600 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed font-medium">{doc.bio}</p>
            <Link href={`/doctors/${doc.id}`} className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-xs tracking-[0.15em] uppercase bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all duration-300 mt-auto">
              View Profile
            </Link>
          </div>
        ))}
      </section>

      <div className="mt-16">
        <BookingCtaBanner />
      </div>
    </div>
  );
}
