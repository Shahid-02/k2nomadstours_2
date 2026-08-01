import type { Metadata } from "next";
import { CategoryListing } from "@/sections/shared/category-listing";

export const metadata: Metadata = {
  title: "Treks",
  description:
    "High-altitude treks in the Karakoram and Himalaya — K2 Base Camp, Gondogoro La, Snow Lake, Rakaposhi Base Camp and Nanga Parbat, led by local guides.",
  alternates: { canonical: "/treks" },
};

export default function TreksPage() {
  return (
    <CategoryListing
      category="trek"
      eyebrow="On foot"
      title="Treks into the high Karakoram"
      description="Glacier crossings, 5,000-metre passes and base camps beneath the world's hardest mountains. Every route runs with licensed high-altitude guides, a full kitchen crew and real acclimatisation days built in."
      image={{
        src: "/images/optimized/k2-base-camp-concordia.jpg",
        alt: "Trekkers crossing the Baltoro Glacier with K2 visible ahead",
      }}
    />
  );
}
