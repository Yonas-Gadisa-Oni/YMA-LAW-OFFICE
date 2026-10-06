import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Medal, Globe, FileText, Heart, Bank, Users, Gavel, Trophy, CurrencyDollar, Handshake, Notepad, Buildings, HouseLine } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRACTICE_AREAS } from "@/constants";

const PRACTICE_ICONS: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-6 h-6" />,
  Bank: <Bank className="w-6 h-6" />,
  CurrencyDollar: <CurrencyDollar className="w-6 h-6" />,
  Handshake: <Handshake className="w-6 h-6" />,
  Notepad: <Notepad className="w-6 h-6" />,
  Buildings: <Buildings className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Medal: <Medal className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Gavel: <Gavel className="w-6 h-6" />,
  HouseLine: <HouseLine className="w-6 h-6" />,
};

export default function PracticeAreasSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="practice-areas" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mb-12">
          <span className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Practice Areas</span>
          <h2 className="max-w-2xl text-3xl font-bold text-[#081b2d] md:text-4xl">Comprehensive Legal Expertise</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRACTICE_AREAS.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card
                className={`group h-full cursor-pointer border-slate-200 bg-white transition-all duration-300 hover:border-blue-500/50 hover:shadow-md ${
                  expanded === area.id ? "border-blue-500/70" : ""
                }`}
                onClick={() => setExpanded(expanded === area.id ? null : area.id)}
              >
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition-transform group-hover:scale-110">
                    {PRACTICE_ICONS[area.icon] || <Shield className="w-6 h-6" />}
                  </div>
                  <CardTitle className="text-lg text-[#081b2d]">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-700">{area.description}</p>
                  <AnimatePresence>
                    {expanded === area.id && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-4 space-y-2 overflow-hidden"
                      >
                        {area.highlights.map((h, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                            {h}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}