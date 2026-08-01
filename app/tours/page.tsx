import type { Metadata } from "next";
import { CategoryListing } from "@/sections/shared/category-listing";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Cultural and scenic tours across Pakistan — Hunza, Kalash valleys, Shandur polo, Sufi shrines and the heritage corridor, run at a pace that leaves room for the people you meet.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <CategoryListing
      category="tour"
      eyebrow="At valley level"
      title="Tours through the valleys and the past"
      description="Forts, festivals, apricot orchards and Sufi shrines — journeys built around the people who live in these mountains rather than the peaks above them. Little walking, long conversations."
      image={{
        src: "/images/optimized/hunza-fort-blossoms.jpg",
        alt: "Baltit Fort above Hunza valley surrounded by apricot blossom",
      }}
    />
  );
}
