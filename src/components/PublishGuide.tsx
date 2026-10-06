import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShareNetwork, Rocket, LinkSimple, CopySimple } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface PublishGuideProps {
  open: boolean;
  onClose: () => void;
}

const PUBLISH_STEPS = [
  {
    icon: <Rocket className="w-6 h-6 text-amber-400" weight="fill" />,
    title: "Platform Publish",
    desc: "Click the Publish / Deploy button in the top-right toolbar of this hosting platform to push your site live.",
  },
  {
    icon: <LinkSimple className="w-6 h-6 text-amber-400" weight="fill" />,
    title: "Custom Domain",
    desc: "After publishing, link your custom domain through the platform's domain settings panel.",
  },
  {
    icon: <CopySimple className="w-6 h-6 text-amber-400" weight="fill" />,
    title: "Share Preview",
    desc: "Copy the live preview URL from the deploy dashboard and share it with your team or clients.",
  },
];

export default function PublishGuide({ open, onClose }: PublishGuideProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-lg rounded-2xl border border-amber-900/30 bg-slate-900 shadow-2xl shadow-amber-900/20">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <ShareNetwork className="w-5 h-5 text-amber-400" weight="fill" />
                  </div>
                  <h2 className="text-lg font-bold text-white">Site Ready &amp; Publish Guide</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                >
                  <X className="w-5 h-5" weight="bold" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-4 space-y-4">
                {PUBLISH_STEPS.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-0.5 shrink-0">{step.icon}</div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1 border-amber-900/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/40"
                >
                  {copied ? "URL Copied!" : "Copy Current URL"}
                  <CopySimple className="w-4 h-4 ml-2" weight="bold" />
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium"
                >
                  Got It
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
