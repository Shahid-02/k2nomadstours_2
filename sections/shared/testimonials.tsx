"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Eyebrow } from "@/components/shared/section-heading";
import { useTabListKeys } from "@/hooks/use-tab-list-keys";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/tour";

/**
 * TESTIMONY — one voice at a time.
 *
 * A three-up grid of review cards reads as marketing furniture; nobody
 * finishes the third one. Giving a single quote the full width, at display
 * size, makes it behave like a pull quote in a magazine — which is what it is.
 *
 * The names below double as the control: they are the tab list, so choosing
 * whose account to read is the same gesture as navigating.
 */
export function Testimonials({
  reviews,
  title = "From people who went",
  eyebrow = "Traveler accounts",
}: {
  reviews: Review[];
  title?: string;
  eyebrow?: string;
}) {
  const [index, setIndex] = useState(0);
  const tabsId = useId();
  const onTabKeys = useTabListKeys(reviews.length, index, setIndex);
  if (reviews.length === 0) return null;

  const review = reviews[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + reviews.length) % reviews.length);

  return (
    <section className="dark grain relative overflow-hidden bg-granite-900 py-section text-snow-50">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-snow-50/55">{eyebrow}</Eyebrow>
            <h2 className="mt-5 text-heading tracking-[-0.03em]">{title}</h2>
          </div>

          {reviews.length > 1 && (
            <div className="flex items-center gap-3">
              <span className="font-mono text-micro uppercase tracking-[0.2em] text-snow-50/60">
                {String(index + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous account"
                className="flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-alpenglow-bright hover:text-alpenglow-bright"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next account"
                className="flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-alpenglow-bright hover:text-alpenglow-bright"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        <div
          id={`${tabsId}-panel`}
          role={reviews.length > 1 ? "tabpanel" : undefined}
          aria-labelledby={reviews.length > 1 ? `${tabsId}-tab-${index}` : undefined}
          tabIndex={reviews.length > 1 ? 0 : undefined}
          className="mt-12 min-h-[16rem] border-t border-white/10 pt-10 sm:min-h-[18rem]"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={`${review.name}-${review.date}`}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="flex gap-1 text-alpenglow-bright"
                aria-label={`Rated ${review.rating} out of 5`}
              >
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="mt-7 max-w-4xl font-display text-[clamp(1.375rem,3.2vw,2.5rem)] font-normal leading-[1.22] tracking-[-0.03em]">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-8 font-mono text-micro uppercase tracking-[0.2em] text-snow-50/55">
                {review.name}
                {review.country && ` · ${review.country}`}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {reviews.length > 1 && (
          <div
            role="tablist"
            aria-label="Traveler accounts"
            onKeyDown={onTabKeys}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6"
          >
            {reviews.map((item, i) => (
              <button
                key={`${item.name}-${item.date}`}
                type="button"
                role="tab"
                id={`${tabsId}-tab-${i}`}
                aria-controls={`${tabsId}-panel`}
                aria-selected={i === index}
                tabIndex={i === index ? 0 : -1}
                onClick={() => setIndex(i)}
                className={cn(
                  "font-mono text-micro uppercase tracking-[0.18em] transition-colors duration-300",
                  i === index
                    ? "text-alpenglow-bright"
                    : "text-snow-50/60 hover:text-snow-50/75"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
