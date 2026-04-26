import Link from 'next/link';

export default function BookingCtaBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-10 pb-16">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 text-center text-white shadow-2xl shadow-emerald-200 relative overflow-hidden border border-emerald-400">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay pointer-events-none" />
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 relative z-10 drop-shadow-md leading-tight tracking-tight">
          Experience the Best Dental Care on Sarjapur Road
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-emerald-100 mb-8 sm:mb-10 max-w-2xl mx-auto relative z-10 drop-shadow-sm leading-relaxed font-medium">
          Join thousands of happy patients who have discovered the clinical excellence of COSMO DENTAL. Your
          comprehensive oral health transformation awaits.
        </p>
        <Link
          href="/booking"
          className="relative z-10 inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-base sm:text-lg bg-white text-emerald-600 hover:bg-slate-50 border border-white transition-all duration-300 tracking-wide w-full sm:w-auto"
        >
          Book Your Consultation
        </Link>
      </div>
    </section>
  );
}
