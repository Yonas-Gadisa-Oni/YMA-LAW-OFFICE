/* ──────────────────────────────────────────────
   Re-exports from @/constants — single source of truth
   Any new types / interfaces unique to firmData go here.
   ────────────────────────────────────────────── */

import {
  BRAND_NAME,
  BRAND_SHORT,
  BRAND_TAGLINE,
  SLOGAN,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  WHATSAPP_NUMBER,
  WHATSAPP_LINK,
  LOCATION_NOTE,
  LOGO_URL,
  FOUNDER_PHOTO_URL,
  NAV_LINKS,
  OFFICE_ADDRESS,
  GOOGLE_MAPS_URL,
  LINKEDIN_URL,
  FEE_STRUCTURE,
  FAQS,
  FIRM_OVERVIEW,
  FOUNDER_BIO,
  FOUNDER_CREDENTIALS,
  WHY_US,
} from "@/constants";

/* ─── Practice Area interface (used by components) ─── */
export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  details: string[];
}

/* ─── CAS Precedent interface ─── */
export interface CasPrecedent {
  year: string;
  title: string;
  outcome: string;
  category: string;
  chargeType?: string;
  link?: string;
}

/* ─── Testimonial interface ─── */
export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  caseType: string;
  outcome: string;
  year: string;
  imageUrl: string;
}

/* ─── Fee Item interface ─── */
export interface FeeItem {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

/* ─── FAQ Item interface ─── */
export interface FAQItem {
  question: string;
  answer: string;
}