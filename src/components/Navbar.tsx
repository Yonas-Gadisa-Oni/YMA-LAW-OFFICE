import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaretDown,
  Envelope,
  FacebookLogo,
  LinkedinLogo,
  MagnifyingGlass,
  List,
  Phone,
  X,
  TwitterLogo,
} from "@phosphor-icons/react";
import { BRAND_SHORT, CONTACT_EMAIL_ALT, CONTACT_PHONE, LOGO_URL } from "@/constants";

interface NavbarProps {
  activeTab: string;
  onNav: (v: string) => void;
  onBookConsultation: () => void;
  onOpenPublishGuide?: () => void;
}

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "team", label: "Our Team" },
  { id: "practice-areas", label: "Practice Areas" },
  { id: "engagements", label: "Engagements" },
  { id: "newsletter", label: "Legal Updates" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact Us" },
];

export default function Navbar({ activeTab, onNav }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feeOpen, setFeeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: string) => {
    onNav(id);
    setMobileOpen(false);
    setFeeOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`hidden md:block bg-[#0a1f3a] text-white transition-all duration-300 ${scrolled ? "-translate-y-full h-0 overflow-hidden" : "h-11"}`}>
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 text-[13px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-2 opacity-90 transition hover:opacity-100">
              <Phone size={15} weight="fill" className="text-sky-400" />
              {CONTACT_PHONE}
            </a>
            <a href={`mailto:${CONTACT_EMAIL_ALT}`} className="flex items-center gap-2 opacity-90 transition hover:opacity-100">
              <Envelope size={15} weight="fill" className="text-sky-400" />
              {CONTACT_EMAIL_ALT}
            </a>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <a href="#" aria-label="Facebook" className="hover:text-white"><FacebookLogo size={16} weight="fill" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><LinkedinLogo size={16} weight="fill" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><TwitterLogo size={16} weight="fill" /></a>
          </div>
        </div>
      </div>

      <nav className={`bg-white transition-all duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate("home")} className="flex shrink-0 items-center gap-3" aria-label={`${BRAND_SHORT} home`}>
            <img src={LOGO_URL} alt={BRAND_SHORT} className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12" />
            <span className="whitespace-nowrap text-base font-bold text-[#081b2d] sm:text-lg">YMA Law Office</span>
          </button>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`relative px-3 py-3 text-[15px] font-semibold text-[#0f172a] transition hover:text-[#1d4ed8] ${activeTab === link.id || (link.id === "blog" && activeTab.startsWith("blog")) ? "text-[#1d4ed8]" : ""}`}
              >
                {link.label}
                {(activeTab === link.id || (link.id === "blog" && activeTab.startsWith("blog"))) && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#1d4ed8]" />}
              </button>
            ))}

            <div className="relative">
              <button
                onClick={() => setFeeOpen((v) => !v)}
                className={`flex items-center gap-1 px-3 py-3 text-[15px] font-semibold text-[#0f172a] transition hover:text-[#1d4ed8] ${activeTab === "fee-structure" ? "text-[#1d4ed8]" : ""}`}
              >
                Fee Structure <CaretDown size={13} weight="bold" className={feeOpen ? "rotate-180" : ""} />
              </button>
              <AnimatePresence>
                {feeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-full mt-1 w-64 rounded-md border border-slate-200 bg-white p-2 shadow-xl"
                  >
                    {["Our Fee Structure", "Court Fee Calculator", "Arbitration Fee Calculator", "Interest Calculator", "VAT Calculator"].map((label) => (
                      <button key={label} onClick={() => navigate("fee-structure")} className="block w-full rounded px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1d4ed8]">
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setSearchOpen(true)} className="ml-2 p-3 text-[#263a4f] transition hover:text-[#1d4ed8]" aria-label="Search">
              <MagnifyingGlass size={23} weight="regular" />
            </button>
          </div>

          <button onClick={() => setMobileOpen((v) => !v)} className="rounded-md p-2 text-[#263a4f] lg:hidden" aria-label="Open menu">
            {mobileOpen ? <X size={27} /> : <List size={27} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-slate-200 bg-white shadow-lg lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-3">
              {[...links, { id: "fee-structure", label: "Fee Structure" }].map((link) => (
                <button key={link.id} onClick={() => navigate(link.id)} className="block w-full border-b border-slate-100 px-2 py-3 text-left text-sm font-semibold text-[#0f172a] last:border-0">
                  {link.label}
                </button>
              ))}
              <button onClick={() => { setSearchOpen(true); setMobileOpen(false); }} className="flex w-full items-center gap-2 px-2 py-3 text-left text-sm font-semibold text-[#2b3d52]"><MagnifyingGlass size={18} /> Search</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-start justify-center bg-[#172636]/80 px-4 pt-28 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-[#243b53]">Search Legal Services</h2>
                <button onClick={() => setSearchOpen(false)} className="text-slate-500 hover:text-slate-900"><X size={24} /></button>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3 focus-within:border-[#1d4ed8]">
                <MagnifyingGlass size={21} className="text-slate-400" />
                <input autoFocus placeholder="Search legal services, practice areas, or legal updates..." className="w-full bg-transparent text-slate-800 outline-none" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
