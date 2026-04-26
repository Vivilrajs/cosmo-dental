import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { Info } from 'lucide-react';

export const metadata = {
  title: 'About Us — COSMO DENTAL',
  description: 'Learn about COSMO DENTAL, the best dental clinic in Sarjapur Road, Bengaluru.',
};

export default function AboutPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="Our Clinical Excellence"
        subtitle="Pioneering the future of dentistry with compassion, advanced medical technology, and a commitment to your complete oral health."
        icon={Info}
        breadcrumbs={[{ label: 'About Us' }]}
        bgImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-16 mb-24">
        <div className="relative px-4 sm:px-0 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 to-emerald-100 rounded-[2rem] sm:rounded-[3rem] transform -rotate-3 scale-105 -z-10 group-hover:-rotate-6 transition-transform duration-700" />
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Clinic Interior"
            className="rounded-[2rem] sm:rounded-[3rem] shadow-xl w-full object-cover h-[400px] sm:h-[500px] group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            The Best Dental Clinic in Sarjapur Road!
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Located conveniently near Kodathi gate, COSMO DENTAL represents a new era in advanced healthcare. We
            combine state-of-the-art medical technology with specialized clinical care to help you achieve optimum
            oral hygiene. Whether you&apos;re looking to maintain your dental health or require complex surgical
            intervention, we provide comprehensive treatments under one roof.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Our multidisciplinary team includes endodontists, orthodontists, and oral surgeons who collaborate to
            deliver a full spectrum of dental services. From early pediatric interventions to full-mouth
            rehabilitations, our clinical protocols are designed to ensure your lasting health and comfort.
          </p>
          <p className="font-heading text-base sm:text-lg leading-relaxed font-bold text-emerald-700 tracking-wide">
            Trust your smile to the leading medical professionals on Sarjapur Road.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-2">15k+</div>
              <div className="text-emerald-900 font-bold text-sm sm:text-base uppercase tracking-wider">Happy Patients</div>
            </div>
            <div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-teal-600 mb-2">20+</div>
              <div className="text-emerald-900 font-bold text-sm sm:text-base uppercase tracking-wider">Clinical Awards</div>
            </div>
          </div>
        </div>
      </section>

      <BookingCtaBanner />
    </div>
  );
}
