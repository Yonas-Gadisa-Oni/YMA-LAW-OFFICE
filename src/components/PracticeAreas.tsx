import { motion } from "framer-motion";
import { Bank, Buildings, ChartLineUp, FileText, Gavel, HardHat, Medal, Scales, Trophy } from "@phosphor-icons/react";
import { PRACTICE_AREAS } from "@/constants";

const icons = [Trophy, Bank, ChartLineUp, Gavel, FileText, HardHat];

export default function PracticeAreas() {
  const areas = PRACTICE_AREAS.slice(0, 6);
  return (
    <section id="practice-areas" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="font-serif text-4xl font-bold text-[#27425d] sm:text-5xl">Our Core Legal Services</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#5d7185] sm:text-lg">We provide expert legal counsel across corporate, commercial, investment, dispute resolution, and regulatory matters for businesses and individuals in Ethiopia.</p>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => {
            const Icon = icons[index] ?? Scales;
            return (
              <motion.article key={area.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group min-h-[395px] rounded-lg border border-slate-100 border-t-4 border-t-[#1d4ed8] bg-white px-8 py-9 text-center shadow-[0_5px_18px_rgba(30,50,70,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(30,50,70,0.14)]">
                <div className="flex justify-center text-[#1d4ed8]"><Icon size={54} weight="fill" /></div>
                <h3 className="mx-auto mt-9 max-w-[290px] font-serif text-2xl font-bold leading-snug text-[#0f172a]">{area.title}</h3>
                <p className="mx-auto mt-7 max-w-[300px] text-[15px] leading-7 text-[#60758a]">{area.description.length > 210 ? `${area.description.slice(0, 210)}...` : area.description}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 text-center"><button onClick={() => window.location.hash = "#practice-areas"} className="rounded-md bg-[#1d4ed8] px-7 py-3.5 text-[15px] font-bold text-white shadow-sm transition hover:bg-[#173fb1]">View all Legal Services</button></div>
      </div>
    </section>
  );
}
