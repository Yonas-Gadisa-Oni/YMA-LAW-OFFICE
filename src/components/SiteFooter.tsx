import { Envelope, MapPin, Phone, WhatsappLogo, Clock, MapTrifold } from "@phosphor-icons/react";
import { BRAND_NAME, BRAND_SHORT, CONTACT_EMAIL_ALT, CONTACT_PHONE, OFFICE_ADDRESS, WHATSAPP_LINK } from "@/constants";

export default function SiteFooter({ onNav }: { onNav: (id: string) => void }) {
  const links = ["home", "about", "team", "practice-areas", "engagements", "newsletter", "blog", "fee-structure", "contact"];
  return (
    <footer className="bg-[#192936] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1.5fr]">
          <div>
            <h3 className="font-serif text-xl font-bold">About Our Law Office</h3><div className="mt-2 h-0.5 w-9 bg-[#1d4ed8]" />
            <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-300">{BRAND_NAME} provides trusted legal counsel across corporate, commercial, investment, litigation, and regulatory matters. We combine practical advice with committed advocacy for every client.</p>
            <button onClick={() => onNav("about")} className="mt-6 text-sm font-medium text-[#60a5fa] hover:text-white">Learn more about us →</button>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold">Quick Links</h3><div className="mt-2 h-0.5 w-9 bg-[#1d4ed8]" />
            <div className="mt-5 space-y-3 text-[15px] text-slate-300">{links.map((id) => <button key={id} onClick={() => onNav(id)} className="block capitalize hover:text-white">{id.replace("-", " ")}</button>)}</div>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold">Contact Our Office</h3><div className="mt-2 h-0.5 w-9 bg-[#1d4ed8]" />
            <div className="mt-6 space-y-5 text-[15px] text-slate-300">
              <div className="flex gap-3"><MapPin size={20} weight="fill" className="mt-0.5 shrink-0 text-[#60a5fa]" /><span>{OFFICE_ADDRESS}</span></div>
              <a href={`tel:${CONTACT_PHONE}`} className="flex gap-3 hover:text-white"><Phone size={19} weight="fill" className="text-[#60a5fa]" />{CONTACT_PHONE}</a>
              <a href={`mailto:${CONTACT_EMAIL_ALT}`} className="flex gap-3 break-all hover:text-white"><Envelope size={19} weight="fill" className="text-[#60a5fa]" />{CONTACT_EMAIL_ALT}</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white"><WhatsappLogo size={19} weight="fill" className="text-[#60a5fa]" />Chat on WhatsApp</a>
              <div className="flex gap-3"><Clock size={19} weight="fill" className="text-[#60a5fa]" />Mon–Fri, 08:30–17:30</div>
              <a href="#contact" className="flex gap-3 hover:text-white"><MapTrifold size={19} weight="fill" className="text-[#60a5fa]" />Open in Google Maps</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p><span className="text-[#60a5fa]">Privacy Policy</span> | <span className="text-[#60a5fa]">Terms</span> | <span className="text-[#60a5fa]">Disclaimer</span> · © {new Date().getFullYear()} {BRAND_SHORT}. All Rights Reserved.</p>
          <div className="flex gap-4 text-white"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="LinkedIn">in</a><a href="#" aria-label="Twitter">X</a></div>
        </div>
      </div>
    </footer>
  );
}
