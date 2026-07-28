import type { Tour, TourCategory } from "@/types/tour";

// Tours
import { nomadicExperienceOfPakistan } from "./nomadic-experience-of-pakistan";
import { discoverHunzaValley } from "./discover-hunza-valley";
import { himalayaKingdomNomadicTour } from "./himalaya-kingdom-nomadic-tour";
import { kalashNomadicPassage } from "./kalash-nomadic-passage";
import { nomadicPoloExperience } from "./nomadic-polo-experience";
import { nomadsWildFrontierOverland } from "./nomads-wild-frontier-overland";
import { nomadsOfTheKarakoramSpring } from "./nomads-of-the-karakoram-spring";

// Treks
import { k2BaseCampTrek } from "./k2-base-camp-trek";
import { rakaposhiBaseCampAndRushLakeTrek } from "./rakaposhi-base-camp-and-rush-lake-trek";
import { baldiyatMeadowAndPatundasTrek } from "./baldiyat-meadow-and-patundas-trek";
import { aroundNangaParbatNomadicTrek } from "./around-nanga-parbat-nomadic-trek";
import { snowLakeTrek } from "./snow-lake-trek";
import { gondogoroLaTrek } from "./gondogoro-la-trek";
import { fairyMeadowsAndK2BaseCampTrek } from "./fairy-meadows-and-k2-base-camp-trek";
import { shimshalNomadicPassage } from "./shimshal-nomadic-passage";
import { thalleLaPassTrek } from "./thalle-la-pass-trek";
import { nomadsOfNagmahValleyTrek } from "./nomads-of-nagmah-valley-trek";
import { nomadsOfTheKarakoramTrek } from "./nomads-of-the-karakoram-trek";
import { nomadBikeAndTrek } from "./nomad-bike-and-trek";

// Cycling
import { nomadicCyclingTour } from "./nomadic-cycling-tour";
import { nomadsCyclingExpedition } from "./nomads-cycling-expedition";

export const allTours: Tour[] = [
  // Tours
  nomadicExperienceOfPakistan,
  discoverHunzaValley,
  himalayaKingdomNomadicTour,
  kalashNomadicPassage,
  nomadicPoloExperience,
  nomadsWildFrontierOverland,
  nomadsOfTheKarakoramSpring,

  // Treks
  k2BaseCampTrek,
  rakaposhiBaseCampAndRushLakeTrek,
  baldiyatMeadowAndPatundasTrek,
  aroundNangaParbatNomadicTrek,
  snowLakeTrek,
  gondogoroLaTrek,
  fairyMeadowsAndK2BaseCampTrek,
  shimshalNomadicPassage,
  thalleLaPassTrek,
  nomadsOfNagmahValleyTrek,
  nomadsOfTheKarakoramTrek,
  nomadBikeAndTrek,

  // Cycling
  nomadicCyclingTour,
  nomadsCyclingExpedition,
];

const categoryBasePath: Record<TourCategory, string> = {
  tour: "/tours",
  trek: "/treks",
  cycling: "/cycling",
};

export function tourHref(tour: Pick<Tour, "category" | "slug">): string {
  return `${categoryBasePath[tour.category]}/${tour.slug}`;
}

export function getAllTours(): Tour[] {
  return allTours;
}

export function getToursByCategory(category: TourCategory): Tour[] {
  return allTours.filter((t) => t.category === category);
}

export function getTourBySlug(category: TourCategory, slug: string): Tour | undefined {
  return allTours.find((t) => t.category === category && t.slug === slug);
}

export function getRelatedTours(tour: Tour): Tour[] {
  return tour.relatedTourSlugs
    .map((slug) => allTours.find((t) => t.slug === slug))
    .filter((t): t is Tour => Boolean(t));
}
