"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { TextReveal } from "@/components/motion/text-reveal";
import { ElevationProfile } from "@/sections/tour-detail/elevation-profile";
import { DayCard } from "@/sections/tour-detail/day-card";
import { getDayMetrics, getTripSummary } from "@/lib/itinerary";
import type { ItineraryDay } from "@/types/tour";

/**
 * ITINERARY — the day ledger.
 *
 * Every figure on this screen is lifted out of the itinerary copy the company
 * already wrote: distances from "10.5km, 6–7 hours", altitudes from
 * "Trek to Amin Broq Base Camp at 4,500m", legs from "Askole to Jhola".
 * Nothing is estimated, so a rest day shows three metrics where a glacier
 * stage shows four, and neither pretends otherwise.
 *
 * The rail on the left fills as you scroll: on a 21-day route the list is
 * longer than three viewports, and a plain spine gives no sense of how much
 * expedition is left.
 */
export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.65", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  // Height rather than scaleY: the marker riding the leading edge would be
  // squashed by a vertical scale transform.
  const fillHeight = useTransform(
    progress,
    (value) => `${Math.min(1, Math.max(0, value)) * 100}%`
  );

  const summary = getTripSummary(days);

  // Altitude range across the trip, so each day's tile bar is drawn on one scale.
  const altitudes = days
    .map((day) => getDayMetrics(day).elevationM)
    .filter((value): value is number => value !== null);
  const lo = altitudes.length ? Math.min(...altitudes) : 0;
  const hi = altitudes.length ? Math.max(...altitudes) : 0;
  const span = hi - lo;

  const facts = [
    { value: String(summary.days), label: "Days" },
    summary.statedDistanceKm !== null && {
      value: `${summary.statedDistanceKm.toLocaleString("en-US")} km`,
      label: `Logged over ${summary.distanceDays} ${summary.distanceDays === 1 ? "day" : "days"}`,
    },
    summary.highPointM !== null && {
      value: `${summary.highPointM.toLocaleString("en-US")} m`,
      label: "High point",
    },
    summary.nightsCamping > 0 && {
      value: String(summary.nightsCamping),
      label: "Under canvas",
    },
    summary.restDays > 0 && {
      value: String(summary.restDays),
      label: "Rest days",
    },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <section id="itinerary" className="scroll-mt-32 bg-muted py-section">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Day by day</Eyebrow>
            </Reveal>
            <TextReveal
              text="Every day, from arrival to departure"
              className="mt-6 text-title display-tight"
            />
            <Reveal delay={0.12}>
              <p className="mt-5 text-body text-muted-foreground">
                Distances, altitudes and overnight stops are taken straight from the
                itinerary — where a day doesn&apos;t state one, we don&apos;t invent it.
                Open any day for the full detail.
              </p>
            </Reveal>
          </div>

          {/* Trip summary. Every figure here is a sum of the days below. */}
          <Reveal delay={0.18} direction="left" className="shrink-0">
            {/* Two by two. Four facts in three columns orphans the last one. */}
            <dl className="plate grid w-full grid-cols-2 gap-x-10 gap-y-6 border bg-card p-6 hairline sm:p-7 lg:w-[19rem]">
              {facts.slice(0, 4).map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[1.375rem] leading-none tracking-[-0.02em]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} blur={false} className="mx-auto mt-16 max-w-4xl">
          <ElevationProfile days={days} />
        </Reveal>

        <div ref={listRef} className="relative mt-16 pl-10 sm:pl-14">
          {/* Spine + scroll-linked fill. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-3 w-px bg-border sm:left-4"
          />
          <motion.span
            aria-hidden="true"
            style={reduced ? { height: "100%" } : { height: fillHeight }}
            className="absolute left-3 top-0 w-[2px] -translate-x-[0.5px] bg-alpenglow sm:left-4"
          >
            {/* The head of the line — shows where you are in the expedition. */}
            <span className="absolute -bottom-[3px] left-1/2 size-[7px] -translate-x-1/2 rounded-full bg-alpenglow ring-4 ring-muted" />
          </motion.span>

          <Accordion multiple defaultValue={[days[0]?.day]} className="gap-3">
            {days.map((day, index) => {
              const elevation = getDayMetrics(day).elevationM;
              const ratio =
                elevation !== null && span > 0
                  ? (elevation - lo) / span
                  : elevation !== null
                    ? 1
                    : null;

              return (
                <motion.div
                  key={day.day}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px -6% 0px" }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(index, 5) * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <DayCard day={day} altitudeRatio={ratio} index={index} />
                </motion.div>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
