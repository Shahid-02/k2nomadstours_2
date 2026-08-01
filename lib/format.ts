import type { Tour } from "@/types/tour";

/** "21 days" / "12–14 days". En dash, because this is a range, not a subtraction. */
export function durationLabel(duration: Tour["durationDays"]): string {
  return duration.min === duration.max
    ? `${duration.min} days`
    : `${duration.min}–${duration.max} days`;
}

/** Just the numeral, for the oversized mono figures on cards. */
export function durationFigure(duration: Tour["durationDays"]): string {
  return duration.min === duration.max
    ? String(duration.min)
    : `${duration.min}–${duration.max}`;
}

export function groupSizeLabel(size: Tour["groupSize"]): string {
  return `${size.min}–${size.max}`;
}

export function priceLabel(amount: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : `${currency} `;
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

/** Lowest advertised per-person rate, used as the "from" figure on cards. */
export function fromPrice(tour: Tour): { label: string; value: number } | null {
  if (tour.pricing.length === 0) return null;
  const cheapest = tour.pricing.reduce((min, tier) =>
    tier.pricePerPerson < min.pricePerPerson ? tier : min
  );
  return {
    label: priceLabel(cheapest.pricePerPerson, cheapest.currency),
    value: cheapest.pricePerPerson,
  };
}

export const categoryLabel: Record<Tour["category"], string> = {
  tour: "Tour",
  trek: "Trek",
  cycling: "Cycling",
};

/** Five steps, so a difficulty can be drawn as a meter instead of a word. */
export const difficultyRank: Record<Tour["difficulty"], number> = {
  Easy: 1,
  "Easy to Moderate": 2,
  Moderate: 3,
  Challenging: 4,
  Strenuous: 5,
};
