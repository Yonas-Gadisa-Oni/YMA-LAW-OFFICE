import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import { FEE_STRUCTURE } from "../constants";

/* ── Fee Structure Section ── */
export default function FeeStructureSection() {
  return (
    <section id="fee-structure" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-400/80 text-sm tracking-[0.2em] uppercase font-medium mb-4">
            Fee Structure
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Transparent, <span className="text-amber-400">Value-Driven</span> Legal Fees
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Clear, competitive pricing tailored to your legal needs. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Fee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEE_STRUCTURE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className={`relative group rounded-xl border transition-all duration-300 ${
                item.popular
                  ? "border-amber-400/50 bg-slate-800/80 shadow-lg shadow-amber-400/5"
                  : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600/80"
              }`}
            >
              {/* Popular badge */}
              {item.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 pt-8">
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4 min-h-[48px]">
                  {item.description}
                </p>

                {/* Price */}
                <div className="mb-5">
                  <span className="text-2xl font-bold text-amber-400">{item.price}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mb-4" />

                {/* Features */}
                <ul className="space-y-2.5">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle
                        size={16}
                        weight="fill"
                        className="text-amber-400/80 mt-0.5 shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          All fees are quoted in USD. Contact us for a personalized quote tailored to your specific case requirements.
        </motion.p>
      </div>
    </section>
  );
}