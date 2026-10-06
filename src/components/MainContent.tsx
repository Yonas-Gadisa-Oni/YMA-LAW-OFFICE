import type { PageView } from "@/types";
import HeroSection from "./Hero";
import AboutSection from "./AboutSection";
import TeamSection from "./TeamSection";
import PracticeAreasSection from "./PracticeAreasSection";
import EngagementsSection from "./EngagementsSection";
import CasPrecedentsSection from "./CasPrecedentsSection";
import TestimonialsSection from "./TestimonialsSection";
import NewsletterSection from "./NewsletterSection";
import FAQSection from "./FAQSection";
import FeeStructureSection from "./FeeStructureSection";
import ContactSection from "./ContactSection";

/* ── Main Content ── */
interface MainContentProps {
  activeTab: PageView;
  onNav: (v: PageView) => void;
  onBookConsultation?: () => void;
}

export default function MainContent({ activeTab, onNav, onBookConsultation }: MainContentProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <HeroSection onBookConsultation={onBookConsultation || (() => {})} />
      <AboutSection />
      <TeamSection />
      <PracticeAreasSection />
      <EngagementsSection onNav={onNav} />
      <CasPrecedentsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FeeStructureSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}