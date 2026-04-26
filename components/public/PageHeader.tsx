import Link from 'next/link';
import { ChevronRight, Home, LucideIcon } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
}

export default function PageHeader({ title, subtitle, icon: Icon, breadcrumbs, bgImage }: PageHeaderProps) {
  return (
    <div className="relative pt-36 sm:pt-44 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-12 w-full mx-auto text-center bg-slate-900 text-white overflow-hidden">
      {bgImage && (
        <img
          src={bgImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto">
        {breadcrumbs && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-slate-300 mb-6 font-medium tracking-wide">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors break-words">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-bold break-words">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        {Icon && (
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl shadow-emerald-900/50 mb-6 sm:mb-8">
            <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-300" />
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight drop-shadow-lg leading-tight font-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
