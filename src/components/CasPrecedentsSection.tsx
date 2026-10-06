import { motion } from "framer-motion";
import { Scales, SealCheck, ShieldCheck } from "@phosphor-icons/react";
import { CAS_PRECEDENTS } from "@/constants";

const CATEGORY_BADGES: Record<string, { label: string; color: string }> = {
  "CAS": { label: "CAS", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  "ETH-ADA": { label: "ETH-ADA", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  "National": { label: "National", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
};

export default function CasPrecedentsSection() {
  return (
    <section id="cas-precedents" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mb-12">
          <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-2">Notable Precedents</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">CAS & ETH-ADA Case Law</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-4" />
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-3 px-2">Year</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-3 px-2">Case</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-3 px-2 hidden md:table-cell">Type</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-3 px-2">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {CAS_PRECEDENTS.map((precedent, i) => {
                const badge = CATEGORY_BADGES[precedent.category] || { label: precedent.category, color: "bg-slate-500/20 text-slate-400 border-slate-500/30" };
                return (
                  <motion.tr
                    key={precedent.title + precedent.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="py-4 px-2">
                      <span className="text-amber-400 font-bold text-sm">{precedent.year}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <SealCheck className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                        <span className="text-white text-sm font-medium">{precedent.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden md:table-cell">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-slate-300 text-sm">{precedent.outcome}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}