import { HomeHero } from "@/sections/home/hero";
import { PlaceTicker } from "@/sections/home/place-ticker";
import { Statement } from "@/sections/home/statement";
import { FeaturedJourneys } from "@/sections/home/featured-journeys";
import { JourneyIndexSection } from "@/sections/home/journey-index-section";
import { WhyK2 } from "@/sections/home/why-k2";
import { Ranges } from "@/sections/home/ranges";
import { Testimonials } from "@/sections/shared/testimonials";
import { FaqAccordion } from "@/sections/shared/faq-accordion";
import { testimonials } from "@/data/testimonials";
import { globalFaqs } from "@/data/faqs";
import { siteConfig } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.whatsapp,
  description: siteConfig.description,
  areaServed: ["Karakoram", "Himalaya", "Hindukush", "Pakistan"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
};

/**
 * Home reads as one continuous descent: cinematic granite at the top, then a
 * long snowfield stretch for the catalogue, back to granite for the argument
 * and the testimony, and out through the questions. Surface temperature is the
 * pacing device — no two adjacent chapters share a background.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHero />
      <PlaceTicker />
      <Statement />
      <FeaturedJourneys />
      <JourneyIndexSection />
      <WhyK2 />
      <Ranges />
      <Testimonials reviews={testimonials} />
      <FaqAccordion faqs={globalFaqs.slice(0, 5)} />
    </>
  );
}
