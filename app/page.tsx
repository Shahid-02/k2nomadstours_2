import { HomeHero } from "@/sections/home/hero";
import { FeaturedJourneys } from "@/sections/home/featured-journeys";
import { WhyK2 } from "@/sections/home/why-k2";
import { Testimonials } from "@/sections/shared/testimonials";
import { FaqAccordion } from "@/sections/shared/faq-accordion";
import { testimonials } from "@/data/testimonials";
import { globalFaqs } from "@/data/faqs";

export default function Home() {
  return (
    <>
      <HomeHero />
      <FeaturedJourneys />
      <WhyK2 />
      <Testimonials reviews={testimonials} />
      <FaqAccordion faqs={globalFaqs.slice(0, 4)} title="Common Questions" />
    </>
  );
}
