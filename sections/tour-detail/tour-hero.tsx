"use client";

import { motion } from "framer-motion";
import { ParallaxImage } from "@/components/motion/parallax";
import { TextRevealOnLoad } from "@/components/motion/text-reveal";
import { RouteLine } from "@/components/shared/route-line";
import { DifficultyMeter } from "@/components/shared/difficulty-meter";
import { Cta } from "@/components/shared/cta";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { durationLabel, groupSizeLabel, fromPrice } from "@/lib/format";
import type { Tour } from "@/types/tour";

/**
 * TOUR HERO.
 *
 * The route line runs full width beneath the title, so the first thing anyone
 * learns about a trip is its actual shape — where it starts, how far out it
 * goes, whether it comes back the same way. Duration, difficulty, season and
 * price sit underneath as a survey block, because those four facts decide
 * almost every enquiry we get.
 */
export function TourHero({ tour }: { tour: Tour }) {
  const price = fromPrice(tour);

  const facts = [
    { label: "Duration", value: durationLabel(tour.durationDays) },
    { label: "Best season", value: tour.bestSeason },
    { label: "Group size", value: `${groupSizeLabel(tour.groupSize)} travelers` },
    { label: "From", value: price ? `${price.label} per person` : "On request" },
  ];

  return (
    <section className="dark grain relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-granite-950 text-snow-50">
      <ParallaxImage
        src={tour.heroImage.src}
        alt={tour.heroImage.alt}
        priority
        strength={0.16}
        className="absolute inset-0"
        sizes="100vw"
      >
        <div className="scrim absolute inset-0" />
      </ParallaxImage>

      <div className="shell relative pb-14 pt-32 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="eyebrow flex items-center gap-3 text-snow-50/65"
        >
          <span aria-hidden="true" className="h-px w-8 bg-alpenglow-bright" />
          {tour.style}
        </motion.p>

        <TextRevealOnLoad
          as="h1"
          text={tour.title}
          delay={0.3}
          className="mt-6 max-w-[16ch] text-display display-tight font-semibold"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-5 max-w-xl text-lede text-snow-50/78"
        >
          {tour.tagline}
        </motion.p>

        <RouteLine
          route={tour.route}
          variant="full"
          className="mt-12 hidden text-snow-50 sm:block"
        />
        <RouteLine route={tour.route} className="mt-8 text-snow-50/70 sm:hidden" />

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-7 lg:grid-cols-5">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-micro uppercase tracking-[0.18em] text-snow-50/50">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-body-sm">{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-micro uppercase tracking-[0.18em] text-snow-50/50">
              Difficulty
            </dt>
            <dd className="mt-2">
              <DifficultyMeter difficulty={tour.difficulty} />
            </dd>
          </div>
        </dl>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Cta href="#reserve" size="xl">
            Check dates
          </Cta>
          <Magnetic strength={0.2}>
            <Button nativeButton={false} variant="glass" size="xl" render={<a href="#itinerary" />}>
              Read the itinerary
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
