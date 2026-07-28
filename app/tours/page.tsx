import type { Metadata } from "next";
import { CategoryListing } from "@/sections/shared/category-listing";

export const metadata: Metadata = {
  title: "Tours",
  description: "Cultural and scenic tours across Pakistan, from the Nomadic Experience of Pakistan to the Hunza Valley.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <CategoryListing
      category="tour"
      title="Tours"
      description="Cultural, nomadic, and scenic journeys — from ancient civilizations and Sufi shrines to alpine valleys and mountain festivals."
    />
  );
}
