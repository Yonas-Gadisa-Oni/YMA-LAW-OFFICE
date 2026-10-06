import { motion } from "framer-motion";
import { CheckCircle, Star, Buildings, Scales, Briefcase } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIRM_OVERVIEW, FOUNDER_BIO, FOUNDER_CREDENTIALS, FOUNDER_PHOTO_URL, WHY_US, FOUNDER_NAME, BRAND_SHORT, BRAND_NAME } from "@/constants";

export default function AboutAndFounder() {
  return (
    <section id="about" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Firm Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
            <Badge className="bg-amber-900/40 text-amber-300 border border-amber-800/50 px-3 py-1 text-xs font-medium mb-4">
              About {BRAND_NAME}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Ethiopia's Premium Law Office</h2>
          </div>
          <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto text-base">{FIRM_OVERVIEW}</p>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Scales, title: "Sports Law", desc: "CAS-proven athlete advocacy with landmark clearances and sanction reductions." },
              { icon: Briefcase, title: "Corporate Practice", desc: "Full-service corporate, commercial, and investment law for Ethiopian and international clients." },
              { icon: Buildings, title: "Banking & Capital Markets", desc: "ESX listing advisory, banking regulation, insurance disputes, and financial transactions." },
            ].map((pillar) => (
              <Card key={pillar.title} className="bg-slate-800/40 border-amber-900/20 hover:border-amber-500/30 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="w-6 h-6 text-amber-400" weight="fill" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
            <Badge className="bg-amber-900/40 text-amber-300 border border-amber-800/50 px-3 py-1 text-xs font-medium mb-4">
              Meet Our Founder
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Lawyer {FOUNDER_NAME}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Photo */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-amber-900/30 shadow-2xl shadow-amber-900/20">
                <img
                  src={FOUNDER_PHOTO_URL}
                  alt={`Lawyer ${FOUNDER_NAME}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">{FOUNDER_NAME}</p>
                  <p className="text-amber-400 text-sm">Founder & Lead Counsel</p>
                </div>
              </div>
            </div>

            {/* Bio & Credentials */}
            <div className="lg:col-span-3 space-y-6">
              <p className="text-slate-300 leading-relaxed text-base">{FOUNDER_BIO}</p>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Credentials & Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FOUNDER_CREDENTIALS.map((cred) => (
                    <div key={cred} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/30">
                      <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" weight="fill" />
                      <span className="text-sm text-slate-300">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CAS Achievements */}
              <div className="p-4 rounded-xl bg-amber-900/10 border border-amber-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-amber-400" weight="fill" />
                  <h4 className="text-amber-300 font-semibold">Notable CAS Achievements</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Secured full clearance for Olympian Diribe Welteji at CAS (2025)</li>
                  <li>• Reduced 6-year doping ban to 2 years for marathon medalist Gaddisa Tajebe (2023)</li>
                  <li>• Successfully argued mitigation for multiple ETH-ADA appeals</li>
                  <li>• Expedited Olympic eligibility reinstatement ruling (2022)</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Choose YMA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Why Clients Choose {BRAND_NAME}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Six pillars that set us apart from every other law office in Ethiopia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <Card className="bg-slate-800/40 border-amber-900/20 hover:border-amber-500/30 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                      <span className="text-amber-400 font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}