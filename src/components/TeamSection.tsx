import { motion } from "framer-motion";
import { Users, Gavel, Globe, Handshake } from "@phosphor-icons/react";
import { TEAM_MEMBERS } from "@/constants";

const TEAM_ICONS = [Users, Gavel, Globe];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mb-12">
          <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-2">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">Meet the Advocates</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 place-items-center gap-8">
          {TEAM_MEMBERS.map((member, i) => {
            const Icon = TEAM_ICONS[i] || Handshake;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-full max-w-md"
              >
                <div className="group relative bg-slate-900/80 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 overflow-hidden">
                  {/* Image Area */}
                  <div className="relative h-64 overflow-hidden">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = "none";
                          const placeholder = img.nextElementSibling as HTMLElement | null;
                          if (placeholder) placeholder.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full items-center justify-center bg-gradient-to-br from-amber-900/40 via-slate-900 to-slate-950 ${
                        member.imageUrl ? "hidden" : "flex"
                      }`}
                    >
                      <span className="text-6xl font-bold text-amber-400/90 tracking-tight">
                        {member.name
                          .replace(/—.*/, "")
                          .trim()
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400 text-xs font-medium tracking-wider uppercase">{member.title}</span>
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">{member.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{member.bio}</p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}