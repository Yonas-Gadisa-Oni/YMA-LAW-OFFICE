import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes, Star, CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TESTIMONIALS, TESTIMONIAL_CATEGORIES } from "@/constants";

export default function TestimonialsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === activeCategory);

  const current = filtered[activeIndex] || filtered[0];
  const isFilteredEmpty = filtered.length === 0;
  const safeIndex = isFilteredEmpty ? 0 : activeIndex;

  const next = () => {
    if (filtered.length > 0) setActiveIndex((prev) => (prev + 1) % filtered.length);
  };
  const prev = () => {
    if (filtered.length > 0) setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mb-12">
          <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-2">Client Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">Stories of Victory</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TESTIMONIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setActiveIndex(0); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:border-slate-600/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonial Carousel */}
        {isFilteredEmpty ? (
          <div className="text-center py-16">
            <Quotes className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No testimonials in this category yet.</p>
          </div>
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.id || "empty"}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="grid md:grid-cols-5 gap-8">
                  {/* Athlete Info */}
                  <div className="md:col-span-2">
                    <div className="sticky top-24">
                      <div className="relative w-48 h-48 rounded-2xl overflow-hidden mb-6 border-2 border-amber-500/20 bg-gradient-to-br from-amber-900/40 via-slate-900 to-slate-950">
                        {current?.imageUrl ? (
                          <img
                            src={current.imageUrl}
                            alt={current.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null;
                              target.style.display = "none";
                              const fallback = target.nextElementSibling as HTMLElement | null;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`absolute inset-0 items-center justify-center bg-gradient-to-br from-amber-800/50 via-slate-900 to-slate-950 ${
                            current?.imageUrl ? "hidden" : "flex"
                          }`}
                        >
                          <span className="text-5xl font-bold text-amber-400/90 tracking-tight">
                            {current?.name?.split(/\s+/).slice(0, 2).map((w) => w[0]).join("") || "YM"}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                      </div>
                      <h3 className="text-white text-xl font-bold">{current?.name}</h3>
                      {current?.role && <p className="text-amber-400 text-sm mt-1">{current.role}</p>}
                      <p className="text-slate-400 text-sm mt-1">{current?.sport}</p>
                      <div className="flex items-center gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} weight="fill" className="w-4 h-4 text-amber-400" />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="outline" className="text-amber-400 border-amber-500/30">
                          {current?.caseType}
                        </Badge>
                        <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                          {current?.outcome}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Quote & Story */}
                  <div className="md:col-span-3">
                    <Quotes className="w-8 h-8 text-amber-400/40 mb-4" weight="fill" />
                    <blockquote className="text-white text-lg md:text-xl leading-relaxed mb-6 italic">
                      &ldquo;{current?.quote}&rdquo;
                    </blockquote>
                    <p className="text-slate-400 text-sm mb-4">- {current?.name}, {current?.year}</p>

                    {current && (
                      <>
                        <Button
                          variant="ghost"
                          className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 p-0 mb-4"
                          onClick={() => setExpanded(expanded === current.id ? null : current.id)}
                        >
                          <span className="text-sm">{expanded === current.id ? "Hide full story" : "Read full story"}</span>
                          <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${expanded === current.id ? "rotate-90" : ""}`} />
                        </Button>
                        <AnimatePresence>
                          {expanded === current.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-slate-300 text-sm leading-relaxed mb-4">{current.fullStory}</p>
                              <ul className="space-y-2">
                                {current.highlights.map((h, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {filtered.length > 1 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>{safeIndex + 1}</span>
                  <span className="text-slate-600">/</span>
                  <span>{filtered.length}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="rounded-full border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500/30"
                  >
                    <CaretLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="rounded-full border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500/30"
                  >
                    <CaretRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}