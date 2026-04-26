'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || mobileOpen
            ? 'bg-white/95 backdrop-blur-xl shadow-sm py-3 sm:py-4 border-b border-slate-100'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 cursor-pointer group z-50 font-heading">
            <span
              className={`text-4xl sm:text-5xl font-black tracking-tighter leading-none -mt-1 group-hover:scale-110 transition-transform ${
                !isScrolled && !mobileOpen ? 'text-emerald-400 drop-shadow-md' : 'text-emerald-600'
              }`}
            >
              5
            </span>
            <div
              className={`flex flex-col leading-none font-black tracking-widest ${
                !isScrolled && !mobileOpen ? 'text-white drop-shadow-md' : 'text-emerald-800'
              }`}
            >
              <span className="text-sm sm:text-base">COSMO</span>
              <span className="text-sm sm:text-base">DENTAL</span>
            </div>
          </Link>

          {/* Desktop nav pill */}
          <div
            className={`hidden lg:flex items-center gap-6 xl:gap-8 px-8 py-3.5 rounded-full transition-all duration-300 ${
              !isScrolled
                ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-sm'
                : 'bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-xl shadow-slate-900/10'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-bold text-sm xl:text-base transition-colors tracking-wide ${
                  isActive(link.href) ? 'text-white drop-shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4 z-50">
            <Link
              href="/booking"
              className="hidden sm:flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white shadow-lg shadow-emerald-300/50 transition-all duration-300"
            >
              Book Now
            </Link>
            <button
              className={`lg:hidden p-2.5 rounded-xl border transition-colors ${
                !isScrolled && !mobileOpen
                  ? 'border-white/30 text-white bg-white/10 backdrop-blur-sm'
                  : 'border-slate-200 text-slate-600 bg-white'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-3xl pt-28 px-6 lg:hidden overflow-y-auto pb-10">
          <div className="flex flex-col gap-3 sm:gap-4 text-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-heading text-xl sm:text-2xl font-bold text-left py-3 border-b border-slate-800 tracking-wide ${
                  isActive(link.href) ? 'text-emerald-400' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center py-4 text-sm sm:text-base rounded-2xl tracking-widest uppercase font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
