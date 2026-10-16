import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Buildings, Lightbulb, ShieldCheck, GoogleLogo, Quotes } from "@phosphor-icons/react";
import { TESTIMONIALS } from "@/constants";

const why = [
  { icon: Buildings, title: "National Legal Leadership", desc: "Deep knowledge of Ethiopian law, institutions, and the commercial environment, with advice grounded in local practice." },
  { icon: Lightbulb, title: "Practical Legal Solutions", desc: "Clear, commercially focused counsel designed to help clients make confident decisions and move matters forward." },
  { icon: ShieldCheck, title: "Proactive Dispute Resolution", desc: "We focus on early risk identification and strategic dispute resolution to protect continuity and reduce cost." },
];

export default function TestimonialsAndWhyUs() {
  const [showAdditionalReviews, setShowAdditionalReviews] = useState(false);

  return (
    <>
      <section className="bg-[#f5f7f9] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-4xl font-bold text-[#27425d] sm:text-5xl">Why Choose Our Law Office?</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {why.map(({ icon: Icon, title, desc }, index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="text-center">
                <Icon size={47} weight="fill" className="mx-auto text-[#1d4ed8]" />
                <h3 className="mt-7 font-serif text-2xl font-bold text-[#27425d]">{title}</h3>
                <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-[#60758a]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-[#27425d] sm:text-5xl">Client Testimonials</h2>
            <p className="mt-5 text-base text-[#60758a] sm:text-lg">What clients say about working with our legal team in Ethiopia.</p>
          </div>

          {/* First 3 Testimonials */}
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t, index) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col justify-between min-h-[420px] rounded-lg border border-slate-100 border-t-4 border-t-[#30455b] bg-white p-8 text-center shadow-[0_5px_18px_rgba(30,50,70,0.10)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(30,50,70,0.14)]"
              >
                <div>
                  <Quotes size={30} weight="fill" className="mx-auto text-[#1d4ed8]/30 mb-3" />
                  {/* 1. Testimonial Title */}
                  <h3 className="font-serif text-lg font-bold text-[#27425d] leading-snug mb-4">
                    {t.title || t.headline}
                  </h3>
                  {/* 2. Main Testimonial */}
                  <p className="text-[14.5px] italic leading-7 text-[#60758a]">
                    “{t.quote}”
                  </p>
                </div>
                {/* 3. Person & 4. Role */}
                <div className="mt-8 border-t border-slate-100 pt-5">
                  <p className="font-bold text-[#1f354b] text-base">{t.name}</p>
                  <p className="mt-1 text-sm font-semibold text-[#1d4ed8]">{t.role}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Remaining 3 Testimonials (Expandable) */}
          <AnimatePresence>
            {showAdditionalReviews && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 gap-7 overflow-hidden pt-7 md:grid-cols-3"
              >
                {TESTIMONIALS.slice(3).map((t, index) => (
                  <motion.article
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="flex flex-col justify-between min-h-[420px] rounded-lg border border-slate-100 border-t-4 border-t-[#30455b] bg-white p-8 text-center shadow-[0_5px_18px_rgba(30,50,70,0.10)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(30,50,70,0.14)]"
                  >
                    <div>
                      <Quotes size={30} weight="fill" className="mx-auto text-[#1d4ed8]/30 mb-3" />
                      {/* 1. Testimonial Title */}
                      <h3 className="font-serif text-lg font-bold text-[#27425d] leading-snug mb-4">
                        {t.title || t.headline}
                      </h3>
                      {/* 2. Main Testimonial */}
                      <p className="text-[14.5px] italic leading-7 text-[#60758a]">
                        “{t.quote}”
                      </p>
                    </div>
                    {/* 3. Person & 4. Role */}
                    <div className="mt-8 border-t border-slate-100 pt-5">
                      <p className="font-bold text-[#1f354b] text-base">{t.name}</p>
                      <p className="mt-1 text-sm font-semibold text-[#1d4ed8]">{t.role}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 text-center">
            <button
              aria-expanded={showAdditionalReviews}
              onClick={() => setShowAdditionalReviews((shown) => !shown)}
              className="inline-flex items-center gap-2 rounded-md bg-[#1d4ed8] px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#173fb1]"
            >
              <GoogleLogo size={18} weight="bold" />
              {showAdditionalReviews ? "Show Fewer Client Reviews" : "Read More Client Reviews"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
