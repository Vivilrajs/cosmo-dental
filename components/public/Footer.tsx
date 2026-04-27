import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ChevronRight, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden mt-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900 -z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="text-white cursor-pointer group w-max block">
            <Image
              src="/logo.png"
              alt="Cosmo Dental"
              width={176}
              height={115}
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>
          <p className="text-slate-400 max-w-sm leading-relaxed text-sm sm:text-base font-medium">
            As the best dental clinic in Sarjapur road, near Kodathi gate, we combine state-of-the-art medical
            technology with expert clinical care to help you maintain perfect oral health.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-white font-bold text-lg mb-4 sm:mb-6 tracking-wide">Contact Information</h4>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base font-medium">
            <p className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>063620 40923</span>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>fivesdental@gmail.com</span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <span className="leading-relaxed">
                1st floor, Shop no.40 & 41,
                <br />
                Above HDFC Bank Sarjapur Main Road,
                <br />
                Ambedkar Nagar, Chikkabellandur, Mullur,
                <br />
                Bengaluru, Karnataka 560035
              </span>
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-heading text-white font-bold text-lg mb-4 sm:mb-6 tracking-wide">Navigation</h4>
          <div className="flex flex-col gap-3 text-sm sm:text-base font-medium">
            {['Home', 'About', 'Services', 'Doctors', 'Gallery', 'News', 'Contact'].map((label) => (
              <Link
                key={label}
                href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                className="hover:text-emerald-300 transition-colors w-fit flex items-center gap-2 text-left tracking-wide"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Timings */}
        <div>
          <h4 className="font-heading text-white font-bold text-lg mb-4 sm:mb-6 tracking-wide flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" /> Clinic Timings
          </h4>
          <ul className="space-y-3 text-sm sm:text-base font-medium">
            <li className="flex justify-between border-b border-slate-800 pb-2 sm:pb-3">
              <span className="tracking-wide">Mon - Sat</span>
              <span className="text-white font-bold">9:00 AM - 9:00 PM</span>
            </li>
            <li className="flex justify-between pb-2">
              <span className="tracking-wide">Sunday</span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] sm:text-xs">Closed</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-10 sm:mt-16 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 font-bold tracking-widest uppercase">
        <p className="text-center md:text-left">&copy; 2026 COSMO DENTAL. All rights reserved.</p>
      </div>
    </footer>
  );
}
