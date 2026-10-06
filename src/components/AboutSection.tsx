import { motion } from "framer-motion";
import { SealCheck } from "@phosphor-icons/react";
import { FIRM_OVERVIEW, FOUNDER_NAME, FOUNDER_TITLE, FOUNDER_PHOTO_URL } from "@/constants";

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex flex-col items-start mb-12">
      <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-2">{label}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">{title}</h2>
      <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-4" />
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl" />
              <div className="relative rounded-2xl w-full aspect-[3/4] overflow-hidden shadow-2xl bg-slate-900 flex items-center justify-center">
                <img
                  src={FOUNDER_PHOTO_URL}
                  alt={FOUNDER_NAME}
                  loading="lazy"
                  className="relative w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.style.display = "none";
                    const fallback = target.previousElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="hidden pointer-events-none absolute inset-0 items-center justify-center text-7xl font-bold text-amber-400/90 tracking-tight">
                  YM
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionHeading label="About" title="Ethiopia's Premium Law Office" />
            <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">{FIRM_OVERVIEW}</p>
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <SealCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-white font-semibold">{FOUNDER_NAME}</p>
                <p className="text-slate-400 text-sm">{FOUNDER_TITLE}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}