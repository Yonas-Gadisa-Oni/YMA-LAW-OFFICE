export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  details: string[];
  gradient: string;
}

export interface CasPrecedent {
  year: string;
  title: string;
  outcome: string;
  category: string;
  link?: string;
  chargeType?: string;
}

export interface StatMetric {
  value: string;
  label: string;
  suffix?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  sport: string;
  nationality: string;
  imageUrl?: string;
  quote: string;
  caseType: string;
  outcome: string;
  year: string;
  highlights: string[];
  fullStory: string;
  category: string;
  headline?: string;
  role?: string;
}

export interface FeeStructureItem {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface NewsletterArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
  author: string;
  readTime: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InsightItem {
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface EngagementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}

export type PageView = "home" | "about" | "team" | "practice-areas" | "engagements" | "cas-precedents" | "testimonials" | "newsletter" | "fee-structure" | "faq" | "contact";