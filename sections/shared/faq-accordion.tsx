import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { TextReveal } from "@/components/motion/text-reveal";
import { TextLink } from "@/components/shared/cta";
import { siteConfig } from "@/data/site";
import type { FAQ } from "@/types/tour";

/**
 * QUESTIONS — a reading chapter, so it sits on the snowfield surface.
 *
 * Split column: the heading and the escape hatch stay pinned on the left while
 * the answers scroll on the right. Anyone who does not find their question can
 * reach a human without scrolling back up, which is the actual job of a FAQ.
 *
 * FAQPage structured data ships with it so these answers can surface directly
 * in search results.
 */
export function FaqAccordion({
  faqs,
  title = "Questions people ask before booking",
  eyebrow = "Before you commit",
}: {
  faqs: FAQ[];
  title?: string;
  eyebrow?: string;
}) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="bg-background py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="shell grid gap-12 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal
            text={title}
            className="mt-5 text-title display-tight"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-body text-muted-foreground">
              Not covered here? Message us on WhatsApp — you&apos;ll usually get an
              answer the same day, from someone who has walked the route.
            </p>
            <TextLink href={siteConfig.whatsappHref} external className="mt-6 text-alpenglow">
              Ask a question
            </TextLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} blur={false}>
          <Accordion multiple className="border-t hairline">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={i}
                className="border-b hairline not-last:border-b"
              >
                <AccordionTrigger className="items-center gap-6 rounded-none py-6 text-heading font-normal leading-snug tracking-[-0.025em] hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-alpenglow">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-7 text-body text-muted-foreground">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
