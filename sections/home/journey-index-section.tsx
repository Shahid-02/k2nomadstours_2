"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { TourCard } from "@/components/shared/tour-card";
import { getAllTours } from "@/data/tours";

const INITIAL_COUNT = 9;

/**
 * JOURNEY GRID — the full catalogue as browsable cards.
 *
 * Shows the first 9 tours (3×3 on desktop) then reveals the rest when
 * the visitor clicks "More Tours". The expand animates per-card with a
 * stagger so it feels like one choreographed motion rather than a sudden
 * pop. Once expanded the button disappears — there is nothing left to show.
 */
export function JourneyIndexSection() {
  const allTours = getAllTours();
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const hasMore = allTours.length > INITIAL_COUNT;

  return (
    <section className="bg-background pb-section">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b pb-5 hairline">
            <Eyebrow>All journeys</Eyebrow>
            <p className="font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
              {allTours.length} journeys across three ranges
            </p>
          </div>
        </Reveal>

        {/* Card grid: 1 col mobile → 2 col tablet → 3 col desktop */}
        <div ref={gridRef} className="mt-8">
          <RevealGroup
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {/* Initial 9 cards — always rendered, animated by RevealGroup */}
            {allTours.slice(0, INITIAL_COUNT).map((tour) => (
              <RevealItem key={tour.slug}>
                <TourCard tour={tour} />
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Expanded cards — revealed with AnimatePresence */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                      delayChildren: 0.05,
                    },
                  },
                }}
              >
                {allTours.slice(INITIAL_COUNT).map((tour) => (
                  <motion.div
                    key={tour.slug}
                    variants={{
                      hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.65,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                  >
                    <TourCard tour={tour} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* "More Tours" button — hidden once all cards are shown */}
        {hasMore && !expanded && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group inline-flex items-center gap-2.5 rounded-full bg-alpenglow px-7 py-3.5 font-mono text-micro uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-alpenglow-bright hover:shadow-glow active:scale-[0.97]"
            >
              More tours
              <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
