import { Marquee } from "@/components/motion/marquee";
import { getAllTours } from "@/data/tours";

/**
 * Every place the catalogue actually goes, drifting past on a single rule.
 *
 * Not decoration: it is the full set of waypoints across all twenty-one
 * itineraries, deduplicated. It tells a first-time visitor the shape of the
 * territory faster than a map would, and it separates the hero from the
 * catalogue with something quiet.
 */
export function PlaceTicker() {
  const places = Array.from(
    new Set(getAllTours().flatMap((tour) => tour.route))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <section
      aria-label="Places we travel"
      className="dark border-y border-white/10 bg-granite-950 py-4 text-snow-50"
    >
      <Marquee duration={90}>
        {places.map((place) => (
          <span
            key={place}
            className="flex items-center gap-6 whitespace-nowrap px-6 font-mono text-micro uppercase tracking-[0.28em] text-snow-50/60"
          >
            {place}
            <span aria-hidden="true" className="size-1 rotate-45 bg-alpenglow-bright/70" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
