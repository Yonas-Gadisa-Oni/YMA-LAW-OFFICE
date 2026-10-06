import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FAQS } from "@/constants";

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-slate-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-2">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-4" />
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-slate-800/40 border border-slate-700/30 rounded-xl px-6 data-[state=open]:border-amber-500/20"
            >
              <AccordionTrigger className="text-white hover:text-amber-400 text-left font-medium py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}