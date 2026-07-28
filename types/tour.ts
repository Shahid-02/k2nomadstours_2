export type TourCategory = "trek" | "tour" | "cycling";
export type Difficulty = "Easy" | "Easy to Moderate" | "Moderate" | "Challenging" | "Strenuous";

export interface TourImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ItineraryDay {
  /** A single day number, or a range like "14-20" for condensed return-journey entries. */
  day: number | string;
  title: string;
  theme?: string;
  activities: string[];
  accommodation?: string;
  meals?: ("Breakfast" | "Lunch" | "Dinner")[];
}

export interface PricingTier {
  label: string;
  pricePerPerson: number;
  currency: string;
  groupSizeRange?: { min: number; max: number };
  notes?: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  ogImage: string;
  canonicalPath: string;
}

export interface Tour {
  slug: string;
  title: string;
  tagline: string;
  category: TourCategory;
  route: string[];
  durationDays: { min: number; max: number };
  style: string;
  difficulty: Difficulty;
  bestSeason: string;
  groupSize: { min: number; max: number };
  heroImage: TourImage;
  gallery: TourImage[];
  highlights: { icon: string; text: string }[];
  itinerary: ItineraryDay[];
  experiencesIncluded: string[];
  inclusions: string[];
  exclusions: string[];
  idealFor: string[];
  pricing: PricingTier[];
  relatedTourSlugs: string[];
  seo: SeoMeta;
  summary: string;
}

export interface Booking {
  tourSlug: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDateStart: string;
  preferredDateEnd?: string;
  groupSize: number;
  message?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  tourSlug?: string;
}

export interface Review {
  name: string;
  country?: string;
  tourSlug?: string;
  rating: number;
  quote: string;
  date: string;
}

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "tiktok"
  | "youtube"
  | "x";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}
