'use client';

import PageHeader from '@/components/public/PageHeader';
import BookingCtaBanner from '@/components/public/BookingCtaBanner';
import { useStore } from '@/lib/store';
import { ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const { galleryImages } = useStore();

  return (
    <div className="pb-20">
      <PageHeader
        title="Clinic Gallery"
        subtitle="Take a tour through our state-of-the-art medical facility near Kodathi gate and see the smiles we've crafted."
        icon={ImageIcon}
        breadcrumbs={[{ label: 'Gallery' }]}
        bgImage="https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryImages.map((src, idx) => (
          <div key={idx} className="break-inside-avoid relative group rounded-[1.5rem] sm:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/20 transition-colors duration-300 z-10" />
            <img
              src={src}
              alt={`Clinical Facility Image ${idx + 1}`}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-full text-white shadow-lg">
                <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <BookingCtaBanner />
      </div>
    </div>
  );
}
