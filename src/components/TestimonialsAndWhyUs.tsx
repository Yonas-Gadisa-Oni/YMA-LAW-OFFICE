import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Buildings, Lightbulb, ShieldCheck, GoogleLogo } from "@phosphor-icons/react";
import { TESTIMONIALS } from "@/constants";

const why = [
  { icon: Buildings, title: "National Legal Leadership", desc: "Deep knowledge of Ethiopian law, institutions, and the commercial environment, with advice grounded in local practice." },
  { icon: Lightbulb, title: "Practical Legal Solutions", desc: "Clear, commercially focused counsel designed to help clients make confident decisions and move matters forward." },
  { icon: ShieldCheck, title: "Proactive Dispute Resolution", desc: "We focus on early risk identification and strategic dispute resolution to protect continuity and reduce cost." },
];

const additionalReviews = [
  {
    name: "Tigist Girma",
    role: "Marathon Medalist",
    quote: "I will forever be grateful to Lawyer Yigermal for his unwavering dedication and strategic expertise in handling my case before international anti-doping bodies. His meticulous approach and deep understanding of global anti-doping rules were instrumental in clearing my name and restoring my reputation. Throughout this challenging ordeal, he stood by me with professionalism and compassion that crossed borders. Thanks to his efforts, I can now move forward with my career and focus on what I love most—competing on the international stage. I highly recommend Lawyer Yigermal to any athlete in need of trusted and effective international legal representation.",
  },
  {
    name: "Dirbie Welteji",
    role: "Olympian",
    quote: "Yigermal and his team at Yigermal Melkam Law Office are the hardest working lawyers I have ever met. Their deep understanding of sports law and unwavering dedication carried me through the darkest time of my career. They won my case nationally and cleared me of all charges, allowing me to compete again while we continued to fight. When the case moved to the international level, they stood by me and worked tirelessly alongside international counsels. Their strategic skill and dedication helped significantly reduce my sanction on appeal, giving me hope and a path forward. They treated me with dignity, fought with everything they had, and never stopped believing in me. I owe them my career and my peace of mind.",
  },
  {
    name: "Gemene Mamite",
    role: "Athlete",
    quote: "I was only 21 years old when I faced a positive test result that threatened to end my career before it truly began. Yigermal and his team at Yigermal Melkam Law Office took my case when I had almost lost hope and fought tirelessly on my behalf. They successfully appealed and reduced my sanction from 6 years to 3 years, giving me a real chance to return to the sport I love. They treated me with kindness and believed in me when others had given up. I will forever be grateful to them for giving me my future back.",
  },
  {
    name: "Eskinder Assefa",
    role: "Managing Director, Abisinya Real Estate",
    quote: "We have had the privilege of working with Mr. Yigermal as our legal counsel for several years. His professionalism, deep understanding of Ethiopian real estate law, and commitment to protecting our interests have been invaluable to our business operations.",
  },
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
          <div className="text-center"><h2 className="font-serif text-4xl font-bold text-[#27425d] sm:text-5xl">Client Testimonials</h2><p className="mt-5 text-base text-[#60758a] sm:text-lg">What clients say about working with our legal team in Ethiopia.</p></div>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t, index) => (
              <motion.article key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="min-h-[395px] rounded-lg border border-slate-100 border-t-4 border-t-[#30455b] bg-white p-8 text-center shadow-[0_5px_18px_rgba(30,50,70,0.10)]">
                <p className="text-[15px] italic leading-7 text-[#60758a]">“{t.quote}”</p>
                <div className="mt-9"><p className="font-bold text-[#1f354b]">{t.name}</p><p className="mt-1 text-sm font-semibold text-[#1f354b]">{t.role}</p></div>
              </motion.article>
            ))}
          </div>
          <AnimatePresence>
            {showAdditionalReviews && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 gap-7 overflow-hidden pt-7 md:grid-cols-2"
              >
                {additionalReviews.map((review, index) => (
                  <motion.article
                    key={review.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-lg border border-slate-100 border-t-4 border-t-[#30455b] bg-white p-8 text-center shadow-[0_5px_18px_rgba(30,50,70,0.10)]"
                  >
                    <p className="text-[15px] italic leading-7 text-[#60758a]">“{review.quote}”</p>
                    <div className="mt-6">
                      <p className="font-bold text-[#1f354b]">{review.name}</p>
                      <p className="mt-1 text-sm font-semibold text-[#1f354b]">{review.role}</p>
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
