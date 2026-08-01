import {
  Backpack,
  BedDouble,
  Bike,
  Bus,
  Compass,
  FileCheck2,
  HandCoins,
  HeartPulse,
  LifeBuoy,
  Music2,
  PlaneLanding,
  PlaneTakeoff,
  ShieldCheck,
  Tent,
  Truck,
  UtensilsCrossed,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* ==========================================================================
   INCLUSION / EXCLUSION PRESENTATION

   The catalogue stores these as plain strings — "All camping equipment
   (tents, mess, toilet)", "Meals during trek (3x daily)". Two things are
   derived from that, and nothing else:

     1. An icon, by keyword.
     2. A category label, so every card has a second line without anyone
        inventing marketing copy for a real business.

   Where a string already carries a parenthetical, that becomes the second
   line instead — the data was always the better description.
   ========================================================================== */

export type InclusionCategory =
  | "Transport"
  | "Crew"
  | "Shelter"
  | "Food"
  | "Permits"
  | "Safety"
  | "Equipment"
  | "Experience"
  | "Personal";

interface Rule {
  match: RegExp;
  icon: LucideIcon;
  category: InclusionCategory;
}

/** Order matters — first match wins, so specific rules sit above general ones. */
const RULES: Rule[] = [
  // Above the crew rule: "Tips for staff" is money, not people.
  { match: /\btips?\b/i, icon: HandCoins, category: "Personal" },

  { match: /airport transfer/i, icon: PlaneLanding, category: "Transport" },
  { match: /international flight/i, icon: PlaneTakeoff, category: "Transport" },
  { match: /domestic flight|flight/i, icon: PlaneTakeoff, category: "Transport" },
  { match: /4x4|jeep|overland/i, icon: Truck, category: "Transport" },
  { match: /bike mechanic|mechanic/i, icon: Wrench, category: "Crew" },
  { match: /bike rental|bike|cycl/i, icon: Bike, category: "Equipment" },
  { match: /transport|bus|coaster|private car|vehicle/i, icon: Bus, category: "Transport" },

  { match: /porter|cook|kitchen|staff/i, icon: Users, category: "Crew" },
  { match: /guide/i, icon: Compass, category: "Crew" },

  { match: /camping equipment|tent|mess/i, icon: Tent, category: "Equipment" },
  { match: /personal.*(gear|equipment)|trekking gear/i, icon: Backpack, category: "Personal" },
  { match: /camping|camp/i, icon: Tent, category: "Shelter" },
  { match: /hotel|guesthouse|homestay|accommodation|cabin|lodging/i, icon: BedDouble, category: "Shelter" },

  { match: /meal|breakfast|dinner|lunch|menu|food/i, icon: UtensilsCrossed, category: "Food" },

  { match: /permit|park fee|entrance fee|entry fee|noc/i, icon: FileCheck2, category: "Permits" },

  { match: /oxygen|first[- ]aid|medical/i, icon: HeartPulse, category: "Safety" },
  { match: /rescue|evacuation/i, icon: LifeBuoy, category: "Safety" },
  { match: /insurance/i, icon: ShieldCheck, category: "Safety" },
  { match: /communication|radio|satellite/i, icon: ShieldCheck, category: "Safety" },

  { match: /festival|cultural|interaction|polo/i, icon: Music2, category: "Experience" },

  { match: /tip/i, icon: HandCoins, category: "Personal" },
  { match: /personal expense|expense/i, icon: Wallet, category: "Personal" },
  { match: /logistics/i, icon: Compass, category: "Crew" },
];

export interface PresentedItem {
  /** The item with any parenthetical stripped off. */
  title: string;
  /** The parenthetical if there was one, otherwise the derived category. */
  detail: string;
  icon: LucideIcon;
  category: InclusionCategory;
}

export function presentItem(raw: string): PresentedItem {
  const rule = RULES.find((r) => r.match.test(raw));
  const parenthetical = raw.match(/\(([^)]+)\)/);
  const title = raw.replace(/\s*\([^)]*\)\s*/, " ").trim();

  const detail = parenthetical
    ? // "3x daily" reads better as "3× daily", and a lone word wants a capital.
      parenthetical[1].replace(/(\d)\s?x\b/gi, "$1×").replace(/^./, (c) => c.toUpperCase())
    : (rule?.category ?? "Included");

  return {
    title,
    detail,
    icon: rule?.icon ?? Compass,
    category: rule?.category ?? "Experience",
  };
}
