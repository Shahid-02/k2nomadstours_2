"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RouteLine } from "@/components/shared/route-line";
import { DifficultyMeter } from "@/components/shared/difficulty-meter";
import { categoryLabel, durationFigure, fromPrice } from "@/lib/format";
import { getOutboundRoute } from "@/lib/route";
import { tourHref } from "@/data/tours";
import { cn } from "@/lib/utils";
import type { Tour } from "@/types/tour";

/* --------------------------------------------------------------------------
   Three card forms, deliberately unalike, so a page never repeats itself:

     TourCard     — the standard plate. Portrait image, facts below the fold.
     TourCardLead — the lead story. Full-bleed, type set into the photograph.
     TourRow      — an index line. Type-only, with the image on hover.

   All three carry the route line, so the family reads as one system even
   though no two of them share a silhouette.
   -------------------------------------------------------------------------- */

/** Shared corner tag: category on the left, duration as a mono figure right. */
function PlateMeta({ tour, tone = "light" }: { tour: Tour; tone?: "light" | "dark" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4",
        tone === "light" ? "text-white" : "text-foreground"
      )}
    >
      <span className="rounded-full bg-black/35 px-3 py-1 font-mono text-micro uppercase tracking-[0.18em] backdrop-blur-sm">
        {categoryLabel[tour.category]}
      </span>
      <span className="text-right font-mono text-micro uppercase leading-tight tracking-[0.14em]">
        <span className="block text-[1.375rem] leading-none tracking-[-0.02em]">
          {durationFigure(tour.durationDays)}
        </span>
        <span className="opacity-70">days</span>
      </span>
    </div>
  );
}

export function TourCard({ tour, className }: { tour: Tour; className?: string }) {
  const price = fromPrice(tour);

  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={cn("group h-full", className)}
    >
      {/* One frame around the whole plate. The image used to float free of the
          text block's side borders, which read as two objects stacked rather
          than one card. */}
      <Link
        href={tourHref(tour)}
        className="plate flex h-full flex-col border bg-card outline-offset-4 transition-[box-shadow,border-color] duration-500 hairline hover:border-foreground/20 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <motion.div
            className="absolute inset-0"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={tour.heroImage.src}
              alt={tour.heroImage.alt}
              fill
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
              className="object-cover"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />
          <PlateMeta tour={tour} />
        </div>

        <div className="flex flex-1 flex-col p-5">
          {/* Name and price share a baseline: the two things a visitor is
              actually comparing across a grid of these. */}
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-heading leading-[1.1] tracking-[-0.03em]">{tour.title}</h3>
            {price && (
              <span className="shrink-0 text-right">
                <span className="block font-mono text-body-sm leading-none">
                  {price.label}
                </span>
                <span className="mt-1 block font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
                  from
                </span>
              </span>
            )}
          </div>

          <p className="mt-3 line-clamp-2 text-body-sm text-muted-foreground">
            {tour.tagline}
          </p>

          {/* Three nodes only — start, how many in between, far point. Any more
              and the strip wraps to a second line and starts outweighing the
              title it sits under. */}
          <RouteLine route={tour.route} limit={2} className="mt-5" />

          <div className="mt-auto flex items-center justify-between gap-4 border-t pt-4 hairline">
            <DifficultyMeter difficulty={tour.difficulty} className="text-muted-foreground" />
            <span className="font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
              {tour.bestSeason}
            </span>
          </div>

          {/* Alpenglow wipes across the foot on hover — the only moving colour. */}
          <motion.span
            aria-hidden="true"
            className="mt-4 block h-px origin-left bg-alpenglow"
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </Link>
    </motion.article>
  );
}

/** The lead story: one journey given the whole width of the grid. */
export function TourCardLead({ tour, className }: { tour: Tour; className?: string }) {
  const price = fromPrice(tour);
  const { farPoint } = getOutboundRoute(tour.route);

  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={cn("plate group dark relative isolate text-snow-50", className)}
    >
      <Link href={tourHref(tour)} className="block h-full outline-offset-4">
        <motion.div
          className="absolute inset-0 -z-10"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={tour.heroImage.src}
            alt={tour.heroImage.alt}
            fill
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="scrim absolute inset-0 -z-10" />

        <div className="flex h-full min-h-[26rem] flex-col justify-between p-6 sm:p-9 lg:min-h-[34rem]">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full border border-white/25 px-3.5 py-1.5 font-mono text-micro uppercase tracking-[0.18em] backdrop-blur-sm">
              Lead journey · {categoryLabel[tour.category]}
            </span>
            <span className="flex size-11 items-center justify-center rounded-full border border-white/25 backdrop-blur-sm transition-colors duration-300 group-hover:border-alpenglow-bright group-hover:bg-alpenglow-bright group-hover:text-granite-950">
              <ArrowUpRight className="size-4" />
            </span>
          </div>

          <div>
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-alpenglow-bright">
              {farPoint}
            </p>
            <h3 className="mt-3 max-w-2xl text-display display-tight">{tour.title}</h3>
            <p className="mt-4 max-w-lg text-body text-snow-50/75">{tour.tagline}</p>

            <dl className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-5 font-mono text-micro uppercase tracking-[0.16em]">
              <div>
                <dt className="text-snow-50/50">Duration</dt>
                <dd className="mt-1 text-body-sm tracking-normal">
                  {durationFigure(tour.durationDays)} days
                </dd>
              </div>
              <div>
                <dt className="text-snow-50/50">Difficulty</dt>
                <dd className="mt-1">
                  <DifficultyMeter difficulty={tour.difficulty} className="text-snow-50" />
                </dd>
              </div>
              <div>
                <dt className="text-snow-50/50">Season</dt>
                <dd className="mt-1 text-body-sm tracking-normal">{tour.bestSeason}</dd>
              </div>
              {price && (
                <div>
                  <dt className="text-snow-50/50">From</dt>
                  <dd className="mt-1 text-body-sm tracking-normal">{price.label} pp</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
