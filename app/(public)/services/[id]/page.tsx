import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { servicesData } from '@/lib/data';
import { CheckCircle2, ArrowLeft, ShieldCheck, Star, Sparkles, Smile, Activity, Zap, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { ShieldCheck, Star, Sparkles, Smile, Activity, Zap };

export function generateStaticParams() {
  return servicesData.map((s) => ({ id: s.id }));
}

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = servicesData.find((s) => s.id === id);
  if (!service) notFound();

  const Icon = iconMap[service.iconName] || ShieldCheck;

  return (
    <div className="pb-20">
      <PageHeader
        title={service.title}
        subtitle={service.desc}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]}
      />

      <div className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto mt-10 sm:mt-16">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-xl border border-slate-100">

          {/* Icon + Price */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}
            >
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Starting From</p>
              <p className="font-heading text-xl sm:text-2xl font-black text-emerald-600">{service.price}</p>
            </div>
          </div>

          {/* Full Description */}
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">About This Treatment</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mb-10">{service.fullDesc}</p>

          {/* Process */}
          <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-5 tracking-tight">Treatment Process</h3>
          <div className="space-y-3 mb-10">
            {service.process.map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-heading font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm sm:text-base">{step}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
            <Link
              href="/booking"
              className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm sm:text-base bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all tracking-widest uppercase"
            >
              Book Appointment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full font-semibold text-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all tracking-widest uppercase"
            >
              <ArrowLeft className="w-4 h-4" /> All Services
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
