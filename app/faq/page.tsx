import type { Metadata } from "next";
import { PageMasthead } from "@/components/layout/page-masthead";
import { FaqAccordion } from "@/sections/shared/faq-accordion";
import { globalFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Safety, visas, fitness, altitude, permits, booking and what's included — the questions we're asked most before a trek or tour in northern Pakistan.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Before you book"
        title="Everything people ask us first"
        lede="Safety, visas, fitness, altitude and money. If your question isn't here, WhatsApp is the fastest way to get a straight answer."
        size="compact"
        image={{
          src: "/images/optimized/k2-base-camp-rest-stop.jpg",
          alt: "Trekkers resting on the Baltoro Glacier with Karakoram peaks behind",
        }}
      />
      <FaqAccordion
        faqs={globalFaqs}
        eyebrow="All questions"
        title="Straight answers, no small print"
      />
    </>
  );
}
