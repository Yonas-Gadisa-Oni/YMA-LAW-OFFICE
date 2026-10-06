import { PracticeArea, CasPrecedent, StatMetric, FAQItem, InsightItem, Testimonial, NewsletterArticle, TeamMember, FeeStructureItem, EngagementItem } from "./types";
import { PRACTICE_AREAS as _PA, CAS_PRECEDENTS as _CP, TESTIMONIALS as _T, TESTIMONIAL_CATEGORIES as _TC, NEWSLETTER_ARTICLES as _NA, NEWSLETTER_ARCHIVE as _NAR, TEAM_MEMBERS as _TM, FEE_STRUCTURE as _FS } from "./data";

/* ─── Brand Identity ─── */
export const BRAND_NAME = "Yigermal Melkam and Advocates Law Office";
export const BRAND_SHORT = "YMA Law Office";
export const BRAND_TAGLINE = "Ethiopia's Premium Law Office - Sports Law, Anti-Doping & Corporate Litigation";
export const SLOGAN = "Excellence in Advocacy. Integrity in Practice.";
export const CONTACT_EMAIL = "Info@YMsport@gmail.com";
export const CONTACT_EMAIL_ALT = "info@ymalawoffice.com";
export const CONTACT_PHONE = "+251945926477";
export const CONTACT_ADDRESS = "Addis Ababa, Ethiopia";
export const LOCATION_NOTE = "Headquartered in Addis Ababa, Ethiopia | International Legal Representation";
export const FOUNDER_NAME = "Yigermal Melkam";
export const FOUNDER_TITLE = "Founder & Lead Counsel - International Sports Law, CAS Arbitration";
export const FOUNDER_CREDENTIALS = ["LLB", "CAS Practitioner"];

/* ─── Social / Channels ─── */
export const WHATSAPP_NUMBER = "251945926477";
export const TELEGRAM_LINK = "https://t.me/+251945926477";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

/* ─── Generated Assets ─── */
export const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/b2bbbfe7-e416-47b4-b177-29812d529eb0/1787086058602_image-c813976c-c7e8-4cd7-b1ab-0156261701c2.png";
export const HERO_IMAGE = "/hero-legal-bg.png";
export const HERO_IMAGE_2 = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80";
export const TRACK_HERO_IMAGE = "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=1200&q=80";
export const FOUNDER_PHOTO_URL = "https://lh3.googleusercontent.com/d/1dnDwrgDvM0QzMR0MzvSEqNssuqwC7d5m";
export const TEAM_PLACEHOLDER = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";

/* ─── Firm Overview ─── */
export const FIRM_OVERVIEW = `YMA Law Office (Yigermal Melkam & Advocates) is a premium Ethiopian law office delivering full-service legal counsel across corporate, commercial, and sports law. Founded by Lawyer Yigermal Melkam, a seasoned advocate with direct experience at the Court of Arbitration for Sport (CAS), our office combines international expertise with deep local insight.

We represent athletes, financial institutions, corporations, construction firms, and individuals in all regulatory, contractual, and disciplinary matters. Our team includes highly experienced advocates who have successfully handled complex cases before CAS, ETH-ADA, national courts, and international tribunals.

At YMA Law Office, we are committed to protecting your rights and advancing your interests with precision, integrity, and unwavering dedication.`;

export const FOUNDER_BIO = `Lawyer Yigermal Melkam is the founder of YMA Law Office and one of Ethiopia's most accomplished sports law practitioners. With direct experience at the Court of Arbitration for Sport (CAS), he has represented Ethiopian athletes in some of the most significant anti-doping cases in recent history.

His practice spans international sports law, corporate litigation, capital markets, and banking regulation. Lawyer Yigermal holds an LLB degree and is a certified CAS practitioner. He has successfully secured full clearances, significant sanction reductions, and landmark rulings that have shaped Ethiopian sports jurisprudence.

Beyond individual athlete representation, Lawyer Yigermal advises sports federations, financial institutions, and corporations on regulatory compliance, governance, and strategic legal matters.`;

/* ─── Why Choose YMA ─── */
export const WHY_US = [
  { title: "CAS-Proven Track Record", desc: "Direct experience representing athletes before the Court of Arbitration for Sport with landmark victories." },
  { title: "Deep Local Expertise", desc: "Decades of practice within Ethiopian courts, regulatory bodies, and international tribunals." },
  { title: "Boutique Attention", desc: "Every client receives direct access to senior counsel — no junior associates handling your case." },
  { title: "Multi-Disciplinary Edge", desc: "Unique intersection of sports law, corporate law, and banking regulation gives us an unmatched perspective." },
  { title: "Rapid Response", desc: "Time-sensitive sporting matters require immediate action. We respond within hours, not days." },
  { title: "Ethical Foundation", desc: "Unwavering commitment to integrity, confidentiality, and putting our clients' interests first." },
];

/* ─── Office / Contact ─── */
export const OFFICE_ADDRESS = "Isaq Tower, Bole (in front of Ramada Hotel), Addis Ababa, Ethiopia";
export const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/Isaq+Tower+Bole+Addis+Ababa";
export const LINKEDIN_URL = "https://linkedin.com/company/yma-law-office";

/* ─── Stats (Removed per plan — pure client testimonials retained) ─── */

/* ─── FAQS ─── */
export const FAQS: FAQItem[] = [
  { question: "What types of legal matters does YMA Law Office handle?", answer: "YMA Law Office handles a comprehensive range of legal matters including sports law (CAS arbitration, anti-doping defense), banking and insurance law, investment practice, employment law, contract law, and construction law. We represent athletes, financial institutions, corporations, and individuals before Ethiopian courts, CAS, and international tribunals." },
  { question: "How do I book a consultation?", answer: "You can book a consultation through our website by clicking 'Book a Consultation', calling us directly at +251945926477, sending a WhatsApp message, or reaching out via Telegram. We offer both in-person and virtual consultations." },
  { question: "What is the CAS arbitration process like?", answer: "CAS arbitration typically involves filing an appeal, exchanging written submissions, attending a hearing before a panel of arbitrators, and receiving a final award. Standard procedures take 6-12 months, while expedited procedures (often required for Olympic eligibility) can be resolved in 4-6 weeks." },
  { question: "Does YMA Law Office handle matters outside of sports law?", answer: "Absolutely. While sports law is a core practice, YMA Law Office also provides comprehensive legal services in banking and insurance, investment, employment law, contract law, and construction law. We serve a diverse client base across multiple sectors." },
  { question: "What makes YMA Law Office different from other law firms?", answer: "YMA Law Office combines deep international legal expertise with a boutique, client-first approach. As a premier Ethiopian law firm, we bring a proven track record at CAS, extensive corporate law experience, and a genuine commitment to protecting our clients' rights and interests." },
];

export const INSIGHTS: InsightItem[] = [
  { title: "Key Developments in CAS Anti-Doping Jurisprudence 2024", excerpt: "An analysis of recent CAS awards and their implications for the World Anti-Doping Code, with specific relevance to Ethiopian athletes.", date: "Dec 2024", category: "Commentary" },
  { title: "Navigating ETH-ADA Regulations: A Guide for Ethiopian Athletes", excerpt: "Understanding the regulatory landscape for anti-doping compliance in Ethiopia and the appeals process.", date: "Nov 2024", category: "Guide" },
  { title: "Investment Law in Ethiopia: A Primer for Foreign Investors", excerpt: "Key legal considerations for foreign investors entering the Ethiopian market, including regulatory requirements and dispute resolution mechanisms.", date: "Oct 2024", category: "Analysis" },
  { title: "Employment Law Update: Recent Changes to Ethiopian Labor Law", excerpt: "Examining recent amendments to Ethiopian labor law and their implications for employers and employees.", date: "Sep 2024", category: "Commentary" },
];

/* ─── Engagements (Service Models) ─── */
export const ENGAGEMENTS: EngagementItem[] = [
  {
    id: "consulting",
    title: "Legal Consulting & Advisory",
    description: "Strategic legal advice for athletes, federations, and corporations navigating the complex regulatory landscape of sport, anti-doping, and commercial law.",
    icon: "Handshake",
    highlights: ["Anti-doping compliance & risk assessment", "Contract negotiation & review", "Regulatory strategy & advisory opinions", "Corporate governance & compliance"],
  },
  {
    id: "representation",
    title: "Litigation & Representation",
    description: "Full-spectrum representation before CAS, ETH-ADA, national courts, and international tribunals — from initial hearing through final appeal.",
    icon: "Gavel",
    highlights: ["CAS arbitration & appeals", "ETH-ADA disciplinary proceedings", "National court litigation", "International tribunal advocacy"],
  },
  {
    id: "advisory",
    title: "Institutional Advisory",
    description: "Retained counsel services for sports federations, financial institutions, and corporations requiring ongoing legal oversight and risk management.",
    icon: "Buildings",
    highlights: ["Policy development & regulatory compliance", "Board & governance advisory", "Contract lifecycle management", "Dispute prevention & strategy"],
  },
];

/* ─── Navigation ─── */
export { _PA as PRACTICE_AREAS, _CP as CAS_PRECEDENTS, _T as TESTIMONIALS, _TC as TESTIMONIAL_CATEGORIES, _NA as NEWSLETTER_ARTICLES, _NAR as NEWSLETTER_ARCHIVE, _TM as TEAM_MEMBERS, _FS as FEE_STRUCTURE };

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "team", label: "Our Team" },
  { id: "practice-areas", label: "Practice Areas" },
  { id: "cas-precedents", label: "Precedents" },
  { id: "engagements", label: "Engagements" },
  { id: "testimonials", label: "Testimonials" },
  { id: "newsletter", label: "Legal Updates" },
  { id: "fee-structure", label: "Fee Structure" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];