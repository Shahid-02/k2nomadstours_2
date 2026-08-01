import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TourCard, TourCardLead } from "@/components/shared/tour-card";
import { getAllTours, getToursByCategory, getTourBySlug } from "@/data/tours";
import type { Tour } from "@/types/tour";

const CATEGORY_RAIL = [
  { label: "Treks", href: "/treks", category: "trek" as const },
  { label: "Tours", href: "/tours", category: "tour" as const },
  { label: "Cycling", href: "/cycling", category: "cycling" as const },
];

/**
 * FEATURED — a lead story and three supporting plates, not a uniform grid.
 *
 * One journey gets the photograph and the full width; the rest get equal
 * standing beneath it. That hierarchy is the whole point of an editorial
 * layout: a visitor who reads nothing else still leaves knowing what the
 * flagship trip is.
 */
export function FeaturedJourneys() {
  const lead =
    getTourBySlug("trek", "k2-base-camp-trek") ?? getAllTours()[0];

  const supporting: Tour[] = [
    getTourBySlug("tour", "discover-hunza-valley"),
    getTourBySlug("trek", "snow-lake-trek"),
    getTourBySlug("cycling", "nomadic-cycling-tour"),
  ].filter((t): t is Tour => Boolean(t));

  return (
    <section id="journeys" className="scroll-mt-24 bg-background py-section">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The catalogue"
            title="Twenty-one ways into the mountains"
            lede="Every route below runs with local guides, small groups and a fixed per-person price. Start with the flagship, or scan the full index further down."
          />

          <Reveal delay={0.2} className="shrink-0">
            <ul className="flex flex-wrap gap-2">
              {CATEGORY_RAIL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-baseline gap-2 rounded-full border px-4 py-2.5 text-body-sm transition-colors duration-300 hairline hover:border-alpenglow hover:text-alpenglow"
                  >
                    {item.label}
                    <span className="font-mono text-micro tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-alpenglow">
                      {String(getToursByCategory(item.category).length).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-3" duration={0.9}>
            <TourCardLead tour={lead} className="h-full" />
          </Reveal>

          {supporting.map((tour, i) => (
            <Reveal key={tour.slug} delay={0.08 * i} duration={0.75}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
