import type { Metadata } from "next";
import { CategoryListing } from "@/sections/shared/category-listing";

export const metadata: Metadata = {
  title: "Treks",
  description: "High-altitude treks in the Karakoram, including K2 Base Camp and Rakaposhi Base Camp & Rush Lake.",
  alternates: { canonical: "/treks" },
};

export default function TreksPage() {
  return (
    <CategoryListing
      category="trek"
      title="Treks"
      description="High-altitude expeditions through the Karakoram — glacier crossings, alpine lakes, and base camps beneath the world's highest peaks."
    />
  );
}
