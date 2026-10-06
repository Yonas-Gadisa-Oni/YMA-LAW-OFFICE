import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, WhatsappLogo, TelegramLogo, PhoneCall, Envelope, PaperPlaneTilt } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { WHATSAPP_LINK, TELEGRAM_LINK, CONTACT_PHONE, CONTACT_EMAIL, CONTACT_EMAIL_ALT } from "@/constants";

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

const CHANNELS = [
  { icon: WhatsappLogo, label: "WhatsApp", href: WHATSAPP_LINK, color: "bg-emerald-600 hover:bg-emerald-500", desc: "Chat instantly" },
  { icon: TelegramLogo, label: "Telegram", href: TELEGRAM_LINK, color: "bg-sky-600 hover:bg-sky-500", desc: "Message us" },
  { icon: PhoneCall, label: "Phone Call", href: `tel:${CONTACT_PHONE}`, color: "bg-amber-600 hover:bg-amber-500", desc: "Call now" },
  { icon: Envelope, label: "Email", href: `mailto:${CONTACT_EMAIL}`, color: "bg-slate-600 hover:bg-slate-500", desc: "Write to us" },
];

export default function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in your name, email, and message");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Consultation request sent! We will contact you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-2xl shadow-2xl shadow-amber-900/10 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-amber-900/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-amber-900/20">
              <div>
                <h2 className="text-xl font-bold text-white">Book a Consultation</h2>
                <p className="text-sm text-slate-400 mt-1">Reach us on your preferred channel</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-amber-900/20 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Contact Channels */}
              <div className="grid grid-cols-2 gap-3">
                {CHANNELS.map((channel) => (
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

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-amber-900/20" />
                <span className="text-xs text-slate-500 font-medium">or send a message</span>
                <div className="flex-1 h-px bg-amber-900/20" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-800/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-800/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-slate-800/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50"
                />
                <Textarea
                  placeholder="Tell us about your legal matter..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-slate-800/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-amber-500/50 resize-none"
                />
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-6 rounded-xl gap-2"
                >
                  <PaperPlaneTilt className="w-4 h-4" />
                  {sending ? "Sending..." : "Send Consultation Request"}
                </Button>
              </form>

              <p className="text-xs text-slate-500 text-center">
                Also reach us at{" "}
                <a href={`tel:${CONTACT_PHONE}`} className="text-amber-400 hover:underline">
                  {CONTACT_PHONE}
                </a>{" "}
                or{" "}
                <a href={`mailto:${CONTACT_EMAIL_ALT}`} className="text-amber-400 hover:underline">
                  {CONTACT_EMAIL_ALT}
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}