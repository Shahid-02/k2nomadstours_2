import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/reveal";
import type { FAQ } from "@/types/tour";

export function FaqAccordion({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) {
  if (faqs.length === 0) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {title && (
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">{title}</h2>
        </Reveal>
      )}
      <Reveal delay={0.1} className="mt-6">
        <Accordion multiple>
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={i}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
