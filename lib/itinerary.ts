import type { ItineraryDay } from "@/types/tour";
import { extractAltitude } from "@/lib/route";

/* ==========================================================================
   ITINERARY METRICS

   The day-by-day copy already carries the numbers a planner wants — they are
   just buried in prose: "Trek to Amin Broq Base Camp at 4,500m",
   "10.5km, 6–7 hours", "3-hour drive via picturesque Baltistan villages".

   These parsers lift them out so the timeline can show distance, duration,
   altitude and where you sleep as structured data, without anyone rewriting
   twenty-one itineraries by hand.

   Nothing is invented. A field that isn't stated comes back null and the UI
   simply doesn't render that metric — a rest day never claims "0 km".
   ========================================================================== */

export type StayKind = "hotel" | "guesthouse" | "camp" | "homestay" | "other";
export type TravelMode = "trek" | "drive" | "fly" | "ride" | null;

export interface DayMetrics {
  distanceKm: number | null;
  /** Normalised, e.g. "6–7 hrs". */
  duration: string | null;
  mode: TravelMode;
  elevationM: number | null;
  stay: { label: string; kind: StayKind } | null;
  meals: string | null;
  /** Only set when the title genuinely names both ends of a leg. */
  leg: { from: string; to: string } | null;
}

const NUM = "[0-9]+(?:\\.[0-9]+)?";
const RANGE = `${NUM}(?:\\s?[–—-]\\s?${NUM})?`;

/** Titles that begin with a verb describe an action, not a starting point. */
const LEADING_VERB =
  /^(drive|trek|fly|flight|travel|return|transfer|arrive|arrival|optional|hike|ride|cycle|journey|back|explore|rest|free|day|departure|depart|visit|continue|onward|acclimat)/i;

/**
 * A leg's origin has to be a place. "Jeep Journey to Askole" passes the
 * leading-verb test because it starts with "Jeep", so the origin is also
 * checked for travel nouns anywhere in it.
 */
const TRAVEL_NOUN =
  /\b(journey|drive|trek|flight|transfer|ride|hike|tour|walk|crossing|day|visit|return|arrival|departure|excursion|safari|expedition|traverse)\b/i;

function normaliseDash(value: string) {
  return value.replace(/\s*[-—]\s*/g, "–").replace(/\s+/g, "");
}

export function parseDistanceKm(text: string): number | null {
  const match = text.match(new RegExp(`(${NUM})\\s?km\\b`, "i"));
  if (!match) return null;
  const value = Number(match[1]);
  // Anything past a few hundred km in a single day is a typo or a flight leg.
  return Number.isFinite(value) && value > 0 && value <= 600 ? value : null;
}

export function parseMode(text: string): TravelMode {
  if (/\btrek|hike|walk\b/i.test(text)) return "trek";
  if (/\bdrive|jeep|road|transfer\b/i.test(text)) return "drive";
  if (/\bcycl|ride|bike\b/i.test(text)) return "ride";
  if (/\bfly|flight\b/i.test(text)) return "fly";
  return null;
}

export function parseDuration(text: string): string | null {
  const patterns = [
    // "Trek: 6–7 hours"
    new RegExp(`(?:trek|drive|ride|cycle|walk|hike)[:\\s]+(${RANGE})\\s?(?:hours|hrs|hour)\\b`, "i"),
    // "3-hour drive", "10–12 hour drive"
    new RegExp(`(${RANGE})[\\s-]?hour\\s+(?:trek|drive|ride|hike|walk|journey)`, "i"),
    // "10.5km, 6–7 hours"
    new RegExp(`(${RANGE})\\s?(?:hours|hrs)\\b`, "i"),
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const value = normaliseDash(match[1]);
    const first = Number(value.split("–")[0]);
    if (!Number.isFinite(first) || first <= 0 || first > 24) continue;
    return `${value} hrs`;
  }
  return null;
}

export function classifyStay(accommodation: string): StayKind {
  const value = accommodation.toLowerCase();
  if (/camp|tent/.test(value)) return "camp";
  if (/hotel/.test(value)) return "hotel";
  if (/guesthouse|hostel|cabin|hut|lodge/.test(value)) return "guesthouse";
  if (/homestay|villa|village/.test(value)) return "homestay";
  return "other";
}

/**
 * "Askole to Jhola | Entering the Wild" → Askole → Jhola.
 * "Drive to Khaplu" → null, because "Drive" is not a place.
 */
export function parseLeg(title: string): { from: string; to: string } | null {
  const head = title.split(/[|—–]/)[0].trim();
  const match = head.match(/^(.+?)\s+to\s+(.+)$/i);
  if (!match) return null;

  const from = match[1].trim();
  const to = match[2].trim();
  if (!from || !to) return null;
  if (LEADING_VERB.test(from) || TRAVEL_NOUN.test(from)) return null;
  if (/\bto\b/i.test(to)) return null;
  if (from.length > 34 || to.length > 34) return null;
  return { from, to };
}

export function getDayMetrics(day: ItineraryDay): DayMetrics {
  const prose = [day.title, ...day.activities].join(" · ");

  return {
    distanceKm: day.distanceKm ?? parseDistanceKm(prose),
    duration: parseDuration(prose),
    mode: parseMode(prose),
    elevationM: day.elevationM ?? extractAltitude(prose),
    stay: day.accommodation
      ? { label: day.accommodation, kind: classifyStay(day.accommodation) }
      : null,
    meals: day.meals && day.meals.length > 0 ? day.meals.map((m) => m[0]).join(" · ") : null,
    leg: parseLeg(day.title),
  };
}

export interface TripSummary {
  days: number;
  /** Nights the itinerary explicitly puts under canvas. */
  nightsCamping: number;
  highPointM: number | null;
  /** Only counts days that actually state a distance — see `distanceDays`. */
  statedDistanceKm: number | null;
  distanceDays: number;
  restDays: number;
}

export function getTripSummary(days: ItineraryDay[]): TripSummary {
  let nightsCamping = 0;
  let highPointM: number | null = null;
  let distance = 0;
  let distanceDays = 0;
  let restDays = 0;

  for (const day of days) {
    const metrics = getDayMetrics(day);
    if (metrics.stay?.kind === "camp") nightsCamping += 1;
    if (metrics.elevationM && (!highPointM || metrics.elevationM > highPointM)) {
      highPointM = metrics.elevationM;
    }
    if (metrics.distanceKm) {
      distance += metrics.distanceKm;
      distanceDays += 1;
    }
    if (/\brest\b|free day|acclimat/i.test(day.title)) restDays += 1;
  }

  return {
    days: days.length,
    nightsCamping,
    highPointM,
    statedDistanceKm: distanceDays > 0 ? Math.round(distance) : null,
    distanceDays,
    restDays,
  };
}
