import { Star } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import type { Review } from "@/types/tour";

export function Testimonials({ reviews, title = "What Travelers Say" }: { reviews: Review[]; title?: string }) {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">{title}</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={`${review.name}-${review.date}`} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm text-foreground/90">&ldquo;{review.quote}&rdquo;</blockquote>
                <figcaption className="text-sm font-medium">
                  {review.name}
                  {review.country && <span className="text-muted-foreground"> · {review.country}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
