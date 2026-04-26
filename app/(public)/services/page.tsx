import Link from 'next/link';
import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { servicesData, comprehensiveCategories } from '@/lib/data';
import { CheckCircle2, ShieldCheck, Star, Sparkles, Smile, Activity, Zap } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { ShieldCheck, Star, Sparkles, Smile, Activity, Zap };

export const metadata = {
  title: 'Our Services — COSMO DENTAL',
  description: 'Explore all dental services at COSMO DENTAL including implants, Invisalign, smile makeovers, and more.',
};

export default function ServicesPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="Our Dental Services"
        subtitle="Comprehensive dental care for every need — from routine check-ups to advanced cosmetic and restorative treatments."
        breadcrumbs={[{ label: 'Services' }]}
        bgImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* Featured Services */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mt-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-8 tracking-tight">Featured Treatments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName] || ShieldCheck;
            return (
              <div key={service.id} className={`group relative rounded-[2.5rem] p-8 sm:p-10 border shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 ${service.cardBg} ${service.shadow}`}>
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none bg-white" />
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner mb-6 border border-white/20 ${service.bg}`}>
                  <Icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3 leading-tight drop-shadow-md">{service.title}</h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8 flex-grow font-medium">{service.desc}</p>
                <Link href={`/services/${service.id}`} className={`w-full py-4 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 font-heading tracking-wide ${service.btnBg}`}>
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comprehensive Categories */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mt-20">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-8 tracking-tight">All Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {comprehensiveCategories.map((cat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${cat.bgClass} rounded-[2rem] p-8 border shadow-lg hover:shadow-xl transition-all duration-300`}>
              <h3 className={`font-heading text-xl font-bold mb-6 pb-4 border-b ${cat.titleClass}`}>{cat.title}</h3>
              <ul className="space-y-3">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${cat.iconClass}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <BookingCtaBanner />
      </div>
    </div>
  );
}
