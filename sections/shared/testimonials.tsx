"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/tour";

const INITIAL_COUNT = 3;

/**
 * TESTIMONY — a wall of accounts.
 *
 * Three cards to start, because three fit one row on a desktop and still read
 * as a set rather than a carousel someone has to operate. The rest arrive on
 * request with the same staggered reveal the catalogue grids use, so the whole
 * site expands lists the same way.
 *
 * Each card is a real <figure>/<blockquote>/<figcaption>, so a screen reader
 * announces a quotation and its attribution together.
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
  const [expanded, setExpanded] = useState(false);
  if (reviews.length === 0) return null;

  const hasMore = reviews.length > INITIAL_COUNT;

  return (
    <section className="dark grain relative overflow-hidden bg-granite-900 py-section text-snow-50">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow tone="bright" className="text-snow-50/55">
              {eyebrow}
            </Eyebrow>
            <h2 className="mt-5 text-heading tracking-[-0.03em]">{title}</h2>
          </div>

          <p className="font-mono text-micro uppercase tracking-[0.2em] text-snow-50/60">
            {String(reviews.length).padStart(2, "0")}{" "}
            {reviews.length === 1 ? "account" : "accounts"}
          </p>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <RevealGroup
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {reviews.slice(0, INITIAL_COUNT).map((review) => (
              <RevealItem key={`${review.name}-${review.date}`} className="h-full">
                <ReviewCard review={review} />
              </RevealItem>
            ))}
          </RevealGroup>

          <AnimatePresence>
            {expanded && (
              <motion.div
                className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                  },
                }}
              >
                {reviews.slice(INITIAL_COUNT).map((review) => (
                  <motion.div
                    key={`${review.name}-${review.date}`}
                    className="h-full"
                    variants={{
                      hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    <ReviewCard review={review} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hasMore && !expanded && (
          <Reveal delay={0.1} duration={0.6}>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="group inline-flex items-center gap-2.5 rounded-full bg-alpenglow px-7 py-3.5 font-mono text-micro uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-alpenglow-bright hover:shadow-glow active:scale-[0.97]"
              >
                Read {reviews.length - INITIAL_COUNT} more
                <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure
      className={cn(
        "plate group flex h-full flex-col border border-white/12 bg-granite-950/55 p-6 sm:p-7",
        "transition-[border-color,box-shadow] duration-500 hover:border-white/25 hover:shadow-lift",
        className
      )}
    >
      <div
        className="flex gap-1 text-alpenglow-bright"
        role="img"
        aria-label={`Rated ${review.rating} out of 5`}
      >
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-current" aria-hidden="true" />
        ))}
      </div>

      <blockquote className="mt-6 font-display text-[1.0625rem] leading-[1.45] tracking-[-0.015em] text-snow-50/90 sm:text-[1.125rem]">
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-auto pt-7 font-mono text-micro uppercase tracking-[0.18em] text-snow-50/55">
        {review.name}
        {review.country && ` · ${review.country}`}
      </figcaption>

      {/* Alpenglow wipes across the foot on hover — matches the tour cards. */}
      <span
        aria-hidden="true"
        className="mt-5 block h-px origin-left scale-x-0 bg-alpenglow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </figure>
  );
}
