import type { Metadata } from "next";
import { CategoryListing } from "@/sections/shared/category-listing";

export const metadata: Metadata = {
  title: "Cycling",
  description:
    "Cycling the Karakoram Highway — the world's highest paved international road — from Gilgit to the Khunjerab Pass at 4,693 m, with full support vehicles.",
  alternates: { canonical: "/cycling" },
};

export default function CyclingPage() {
  return (
    <CategoryListing
      category="cycling"
      eyebrow="Two wheels"
      title="The Karakoram Highway, ridden"
      description="The highest paved international border crossing on earth, climbing from apricot orchards to 4,693 m at Khunjerab. Supported throughout, so you carry a jacket and nothing else."
      image={{
        src: "/images/optimized/khunjerab-pass-group.jpg",
        alt: "Riders at the Khunjerab Pass on the Pakistan–China border",
      }}
    />
  );
}
