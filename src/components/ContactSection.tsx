import { useState } from "react";
import { BRAND_SHORT, BRAND_NAME } from "@/constants";
import { motion } from "framer-motion";
import { PhoneCall, Envelope, MapPin, WhatsappLogo, LinkedinLogo, Clock, CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  WHATSAPP_LINK,
  OFFICE_ADDRESS,
  GOOGLE_MAPS_URL,
  LINKEDIN_URL,
  FEE_STRUCTURE,
} from "@/constants";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Consultation request sent! We will contact you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <Badge className="bg-amber-900/40 text-amber-300 border border-amber-800/50 px-3 py-1 text-xs font-medium mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Book a Consultation</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Reach us on your preferred channel. We respond within 24 hours.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <Card className="bg-slate-800/40 border-amber-900/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-900/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-900/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50"
                    />
                  </div>
                  <Input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-900/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50"
                  />
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50 text-sm appearance-none"
                  >
                    <option value="" className="bg-slate-900">Select Practice Area</option>
                    {FEE_STRUCTURE.map((f) => (
                      <option key={f.id} value={f.title} className="bg-slate-900">{f.title}</option>
                    ))}
                  </select>
                  <Textarea
                    placeholder="Tell us about your legal matter..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-slate-900/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50 resize-none"
                  />
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-6 rounded-xl gap-2"
                  >
                    <CheckCircle className="w-4 h-4" weight="bold" />
                    {sending ? "Sending..." : "Send Consultation Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Channels */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: WhatsappLogo, label: "WhatsApp", href: WHATSAPP_LINK, color: "bg-emerald-600 hover:bg-emerald-500", desc: "Chat instantly" },
                { icon: PhoneCall, label: "Phone", href: `tel:${CONTACT_PHONE}`, color: "bg-amber-600 hover:bg-amber-500", desc: "Call now" },
                { icon: Envelope, label: "Email", href: `mailto:${CONTACT_EMAIL}`, color: "bg-slate-600 hover:bg-slate-500", desc: "Write to us" },
                { icon: LinkedinLogo, label: "LinkedIn", href: LINKEDIN_URL, color: "bg-blue-600 hover:bg-blue-500", desc: "Connect" },
              ].map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-xl text-white transition-all ${channel.color}`}
                >
                  <channel.icon className="w-5 h-5 flex-shrink-0" weight="fill" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{channel.label}</p>
                    <p className="text-xs text-white/80">{channel.desc}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Office Info */}
            <Card className="bg-slate-800/40 border-amber-900/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" weight="fill" />
                  <div>
                    <p className="text-white font-semibold text-sm">Office Location</p>
                    <p className="text-slate-400 text-sm">{OFFICE_ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" weight="fill" />
                  <div>
                    <p className="text-white font-semibold text-sm">Business Hours</p>
                    <p className="text-slate-400 text-sm">Mon - Fri: 8:30 AM - 5:30 PM EAT</p>
                    <p className="text-slate-400 text-sm">Sat: 9:00 AM - 1:00 PM EAT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" weight="fill" />
                  <div>
                    <p className="text-white font-semibold text-sm">Direct Line</p>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-amber-400 hover:underline text-sm">{CONTACT_PHONE}</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Map Embed */}
            <Card className="bg-slate-800/40 border-amber-900/20 overflow-hidden">
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.76!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b15cef9c5db4b%3A0x1234567890abcdef!2sIsaq+Tower%2C+Bole!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="{BRAND_NAME} Office Location"
                  className="w-full"
                />
                <div className="p-3">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-400 hover:underline block text-center"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}