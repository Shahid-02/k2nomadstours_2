import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { TextReveal } from "@/components/motion/text-reveal";
import { TourCard } from "@/components/shared/tour-card";
import type { Tour } from "@/types/tour";

export function RelatedTours({ tours }: { tours: Tour[] }) {
  if (tours.length === 0) return null;

  return (
    <section className="bg-background py-section">
      <div className="shell">
        <Reveal>
          <Eyebrow>Nearby routes</Eyebrow>
        </Reveal>
        <TextReveal
          text="Others who looked at this one also considered"
          className="mt-6 max-w-2xl text-title display-tight"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.slice(0, 3).map((tour, i) => (
            <Reveal key={tour.slug} delay={i * 0.08} duration={0.75}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
