import { testimonials } from "@/data/testimonials";

/* ==========================================================================
   COMPANY CREDENTIALS

   Everything a page states as a number about this business lives here, so
   there is exactly one place to check whether a claim is true.

   The rule: if it can't be derived from the catalogue or pointed at a source,
   it stays `null` and simply doesn't render. Trust figures are the easiest
   thing in the world to inflate and the most expensive thing to be caught on.
   ========================================================================== */

export const credentials = {
  /**
   * Published in the company's own mission statement: "every guide is locally
   * rooted and professionally trained". Restating their commitment, not
   * inventing a metric.
   */
  localCrewPercent: 100,

  /**
   * TODO — confirm with the business before setting these. Until then the
   * section falls back to figures derived from the tour itself, which are
   * always true. Set a number here and the stat appears automatically.
   */
  yearsOperating: null as number | null,
  travelersHosted: null as number | null,
};

/** Mean of the published traveler accounts, to one decimal place. */
export function getRating(): { average: string; count: number } | null {
  if (testimonials.length === 0) return null;
  const total = testimonials.reduce((sum, review) => sum + review.rating, 0);
  return {
    average: (Math.round((total / testimonials.length) * 10) / 10).toFixed(1),
    count: testimonials.length,
  };
}
