import { Reveal } from "@/components/shared/reveal";
import { TourCard } from "@/components/shared/tour-card";
import type { Tour } from "@/types/tour";

export function RelatedTours({ tours }: { tours: Tour[] }) {
  if (tours.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">You Might Also Like</h2>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => (
          <Reveal key={tour.slug} delay={i * 0.08}>
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
