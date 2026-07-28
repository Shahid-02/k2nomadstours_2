import { Reveal } from "@/components/shared/reveal";
import { TourCard } from "@/components/shared/tour-card";
import { getAllTours } from "@/data/tours";

export function FeaturedJourneys() {
  const tours = getAllTours();

  return (
    <section id="popular-journeys" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Popular Journeys</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">Treks, Tours & Cycling Across Pakistan</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          From high-altitude Karakoram treks to slow, cultural journeys through Pakistan&apos;s deserts and heritage sites.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => (
          <Reveal key={tour.slug} delay={Math.min(i * 0.08, 0.4)}>
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
