import { motion } from "framer-motion";
import { Handshake, Gavel, Buildings, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ENGAGEMENTS } from "@/constants";

const ENGAGEMENT_ICONS: Record<string, React.ReactNode> = {
  Handshake: <Handshake className="w-8 h-8" />,
  Gavel: <Gavel className="w-8 h-8" />,
  Buildings: <Buildings className="w-8 h-8" />,
};

interface EngagementsSectionProps {
  onNav: (page: string) => void;
}

export default function EngagementsSection({ onNav }: EngagementsSectionProps) {
  return (
    <section id="engagements" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mb-12">
          <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-2">Engagements</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">How We Work With You</h2>
          <p className="text-slate-400 mt-3 max-w-xl">Flexible engagement models tailored to your legal needs - from one-time consultations to full retainer partnerships.</p>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ENGAGEMENTS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group relative bg-slate-900/80 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 p-8 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                  {ENGAGEMENT_ICONS[item.icon] || <Gavel className="w-8 h-8" />}
                </div>

                {/* Number */}
                <span className="text-6xl font-bold text-slate-800/40 absolute top-6 right-6 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>

                <ul className="space-y-2.5 mb-6">
                  {item.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Button onClick={() => onNav("contact")} variant="ghost" className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 p-0 group/btn">
                  <span className="text-sm">Contact Us</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}