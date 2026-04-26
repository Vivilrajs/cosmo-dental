import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'COSMO DENTAL — Best Dental Clinic in Sarjapur Road',
  description:
    'COSMO DENTAL is the best dental clinic in Sarjapur Road, near Kodathi Gate, Bengaluru. Expert dental care including implants, Invisalign, smile makeovers, and more.',
  keywords: 'dental clinic sarjapur road, best dentist bengaluru, dental implants, invisalign, smile makeover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-[#FAFAFC] text-slate-900 overflow-x-hidden" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
