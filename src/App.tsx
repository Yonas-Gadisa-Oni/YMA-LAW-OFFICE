import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { ArrowUp, TelegramLogo, WhatsappLogo } from "@phosphor-icons/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PracticeAreas from "./components/PracticeAreas";
import TestimonialsAndWhyUs from "./components/TestimonialsAndWhyUs";
import SiteFooter from "./components/SiteFooter";
import AboutAndFounder from "./components/AboutAndFounder";
import TeamSection from "./components/TeamSection";
import PracticeAreasSection from "./components/PracticeAreasSection";
import EngagementsSection from "./components/EngagementsSection";
import NewsletterSection from "./components/NewsletterSection";
import FeeStructureSection from "./components/FeeStructureSection";
import ContactSection from "./components/ContactSection";
import ConsultModal from "./components/ConsultationModal";
import ErrorBoundary from "./components/ErrorBoundary";
import BlogSection from "./components/BlogSection";
import { TELEGRAM_LINK, WHATSAPP_LINK } from "@/constants";

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "");
  return hash || "home";
}

function App() {
  const [activeTab, setActiveTab] = useState(getPageFromHash);
  const [consultOpen, setConsultOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onHash = () => setActiveTab(getPageFromHash());
    const onScroll = () => setShowScrollTop(window.scrollY > 550);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigate = (id: string) => {
    if (id === "home") {
      window.history.pushState({}, "", window.location.pathname);
      setActiveTab("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = id;
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activeTab) {
      case "about":
        return <AboutAndFounder />;
      case "team":
        return <TeamSection />;
      case "practice-areas":
        return <PracticeAreasSection />;
      case "engagements":
        return <EngagementsSection onNav={navigate} />;
      case "newsletter":
        return <NewsletterSection />;
      case "blog":
      case "blog-admin":
        return <BlogSection route={activeTab} onNav={navigate} />;
      case "fee-structure":
        return <FeeStructureSection />;
      case "contact":
        return <ContactSection />;
      default:
        if (activeTab.startsWith("blog/")) {
          return <BlogSection route={activeTab} onNav={navigate} />;
        }
        if (activeTab.startsWith("blog-admin/")) {
          return <BlogSection route={activeTab} onNav={navigate} />;
        }
        return (
          <>
            <Hero onBookConsultation={() => setConsultOpen(true)} />
            <PracticeAreas />
            <TestimonialsAndWhyUs />
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-[#2b3d52]">
        <Navbar activeTab={activeTab} onNav={navigate} onBookConsultation={() => setConsultOpen(true)} />
        <main className="pt-[78px] md:pt-[122px]">{renderPage()}</main>
        <SiteFooter onNav={navigate} />

        <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22c86a] text-white shadow-lg transition hover:scale-105">
            <WhatsappLogo size={25} weight="fill" />
          </a>
          <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" aria-label="Telegram" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#139bd8] text-white shadow-lg transition hover:scale-105">
            <TelegramLogo size={24} weight="fill" />
          </a>
          {showScrollTop && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2b3d52] text-white shadow-lg transition hover:scale-105"><ArrowUp size={22} weight="bold" /></button>}
        </div>

        <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
        <Toaster position="top-right" />
      </div>
    </ErrorBoundary>
  );
}

export default App;
