import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { BRAND_NAME, BRAND_TAGLINE, HERO_IMAGE } from "@/constants";

interface HeroProps { onBookConsultation: () => void; }

export default function Hero({ onBookConsultation }: HeroProps) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <img src={HERO_IMAGE} alt="Legal advocacy" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,20,40,0.4) 0%, rgba(5,20,40,0.25) 50%, rgba(5,20,40,0.15) 100%)" }} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-36">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-4xl">
          <h1 className="font-serif text-4xl font-bold leading-[1.15] text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-[58px]">
            Your Trusted Legal Partner<br />
            <span className="text-white">in Ethiopia</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-white/95 sm:text-xl">{BRAND_TAGLINE}</p>
          <p className="mt-2 text-sm font-medium text-white/80">{BRAND_NAME}</p>
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookConsultation}
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-[#1d4ed8] px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-[#173fb1]"
          >
            Book a Consultation <ArrowRight size={18} weight="bold" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
