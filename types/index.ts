export interface Doctor {
  id: string;
  name: string;
  role: string;
  img_url: string;
  bio: string;
  credentials: string[];
  specializations: string[];
  rating: string;
  reviews: number;
  quote: string;
  specialty: string;
}

export interface Testimonial {
  id: string | number;
  text: string;
  author: string;
  role: string;
  rating: number;
  avatar_url: string;
}

export interface Faq {
  id: string | number;
  question: string;
  answer: string;
}

export interface Appointment {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  status: 'pending' | 'confirmed' | 'Pending' | 'Confirmed';
}

export interface GalleryImage {
  id?: string;
  url: string;
}

export interface NewsArticle {
  id: string | number;
  title: string;
  date: string;
  author: string;
  category: string;
  img_url: string;
  excerpt: string;
  content: string;
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  fullDesc: string;
  price: string;
  process: string[];
  iconName: string;
  cardBg: string;
  btnBg: string;
  shadow: string;
  color: string;
  bg: string;
}
