import type { Metadata } from "next";
import { FaqAccordion } from "@/sections/shared/faq-accordion";
import { globalFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about traveling with K2 Nomads Tours — safety, visas, fitness, booking, and what's included.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="pt-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-3 text-muted-foreground">Everything you need to know before booking a trip with us.</p>
      </div>
      <FaqAccordion faqs={globalFaqs} title="" />
    </div>
  );
}
