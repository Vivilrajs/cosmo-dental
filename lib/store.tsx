'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Doctor, Testimonial, Faq, Appointment, NewsArticle } from '@/types';
import {
  initialDoctors,
  initialTestimonials,
  initialFaqs,
  initialAppointments,
  initialGalleryImages,
  initialNews,
} from '@/lib/data';
import { createClient } from '@/lib/supabase';

interface StoreState {
  doctors: Doctor[];
  setDoctors: (d: Doctor[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (t: Testimonial[]) => void;
  faqs: Faq[];
  setFaqs: (f: Faq[]) => void;
  appointments: Appointment[];
  setAppointments: (a: Appointment[]) => void;
  galleryImages: string[];
  setGalleryImages: (g: string[]) => void;
  news: NewsArticle[];
  setNews: (n: NewsArticle[]) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (v: boolean) => void;
  isLoading: boolean;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  // Start with hardcoded data so the page renders immediately,
  // then replace with Supabase data once fetched.
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [galleryImages, setGalleryImages] = useState<string[]>(initialGalleryImages);
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFromSupabase() {
      try {
        const sb = createClient();

        const [
          { data: doctorsData },
          { data: testimonialsData },
          { data: faqsData },
          { data: galleryData },
          { data: newsData },
        ] = await Promise.all([
          sb.from('doctors').select('*').order('created_at', { ascending: true }),
          sb.from('testimonials').select('*').order('created_at', { ascending: true }),
          sb.from('faqs').select('*').order('created_at', { ascending: true }),
          sb.from('gallery_images').select('*').order('created_at', { ascending: true }),
          sb.from('news_articles').select('*').order('created_at', { ascending: false }),
        ]);

        // Only replace if Supabase returned data (non-empty)
        if (doctorsData && doctorsData.length > 0) {
          setDoctors(doctorsData as Doctor[]);
        }
        if (testimonialsData && testimonialsData.length > 0) {
          setTestimonials(
            testimonialsData.map((t: any) => ({
              ...t,
              avatar_url: t.avatar_url || 'https://via.placeholder.com/150',
            })) as Testimonial[]
          );
        }
        if (faqsData && faqsData.length > 0) {
          setFaqs(faqsData as Faq[]);
        }
        if (galleryData && galleryData.length > 0) {
          setGalleryImages(galleryData.map((g: any) => g.url));
        }
        if (newsData && newsData.length > 0) {
          setNews(
            newsData.map((n: any) => ({
              ...n,
              img_url: n.img_url || '',
            })) as NewsArticle[]
          );
        }
      } catch (err) {
        // Supabase unavailable — hardcoded fallback stays in place
        console.warn('Supabase fetch failed, using fallback data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFromSupabase();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        doctors, setDoctors,
        testimonials, setTestimonials,
        faqs, setFaqs,
        appointments, setAppointments,
        galleryImages, setGalleryImages,
        news, setNews,
        isAdminLoggedIn, setIsAdminLoggedIn,
        isLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
