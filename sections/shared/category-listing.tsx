import { Reveal } from "@/components/shared/reveal";
import { TourCard } from "@/components/shared/tour-card";
import { getToursByCategory } from "@/data/tours";
import type { TourCategory } from "@/types/tour";

export function CategoryListing({
  category,
  title,
  description,
}: {
  category: TourCategory;
  title: string;
  description: string;
}) {
  const tours = getToursByCategory(category);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
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
