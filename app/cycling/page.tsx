import type { Metadata } from "next";
import { CategoryListing } from "@/sections/shared/category-listing";

export const metadata: Metadata = {
  title: "Cycling",
  description: "Road cycling adventures on the Karakoram Highway, the world's highest paved international road.",
  alternates: { canonical: "/cycling" },
};

export default function CyclingPage() {
  return (
    <CategoryListing
      category="cycling"
      title="Cycling"
      description="Ride the world's highest paved international road, past glacial lakes and the Karakoram's towering peaks."
    />
  );
}
