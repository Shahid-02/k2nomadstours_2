import { HeaderShell } from "@/components/layout/header-shell";
import { getToursByCategory, tourHref } from "@/data/tours";
import { getOutboundRoute } from "@/lib/route";
import { durationLabel } from "@/lib/format";
import type { NavGroup } from "@/types/nav";
import type { TourCategory } from "@/types/tour";

const GROUP_COPY: Record<TourCategory, { label: string; href: string; blurb: string }> = {
  trek: {
    label: "Treks",
    href: "/treks",
    blurb: "Glacier crossings, high passes and base camps under 8,000m peaks.",
  },
  tour: {
    label: "Tours",
    href: "/tours",
    blurb: "Valleys, forts, festivals and the people who have always lived here.",
  },
  cycling: {
    label: "Cycling",
    href: "/cycling",
    blurb: "The Karakoram Highway and the passes that branch off it, by bike.",
  },
};

function buildGroup(category: TourCategory): NavGroup {
  const copy = GROUP_COPY[category];
  return {
    key: category,
    label: copy.label,
    href: copy.href,
    blurb: copy.blurb,
    items: getToursByCategory(category).map((tour) => ({
      label: tour.title,
      href: tourHref(tour),
      duration: durationLabel(tour.durationDays),
      farPoint: getOutboundRoute(tour.route).farPoint,
      difficulty: tour.difficulty,
      image: tour.heroImage.src,
      imageAlt: tour.heroImage.alt,
    })),
  };
}

/**
 * Server component: resolves the catalogue, then hands plain data to the
 * interactive shell. Nothing from `@/data/tours` reaches the browser bundle.
 */
export function Header() {
  const groups = [buildGroup("trek"), buildGroup("tour"), buildGroup("cycling")];
  return <HeaderShell groups={groups} />;
}
