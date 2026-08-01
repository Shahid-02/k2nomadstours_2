"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PageMasthead } from "@/components/layout/page-masthead";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { TourCard } from "@/components/shared/tour-card";
import { getToursByCategory } from "@/data/tours";
import { categoryLabel } from "@/lib/format";
import type { TourCategory } from "@/types/tour";

const INITIAL_COUNT = 9;

/**
 * CATEGORY PAGES — responsive card grid layout with 9 initial cards and "More" button.
 *
 * Removes the old table/list layout completely and presents tours in a clean
 * responsive 3×3 card grid.
 */
export function CategoryListing({
  category,
  eyebrow,
  title,
  description,
  image,
}: {
  category: TourCategory;
  eyebrow: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
}) {
  const tours = getToursByCategory(category);
  const [expanded, setExpanded] = useState(false);

  const hasMore = tours.length > INITIAL_COUNT;

  const durations = tours.map((t) => t.durationDays.min);
  const facts = [
    { label: "Journeys", value: String(tours.length) },
    {
      label: "Duration",
      value: tours.length
        ? `${Math.min(...durations)}–${Math.max(...tours.map((t) => t.durationDays.max))} days`
        : "—",
    },
    { label: "Group size", value: "4–10 travelers" },
    { label: "Season", value: "April – October" },
  ];

  return (
    <>
      <PageMasthead
        eyebrow={eyebrow}
        title={title}
        lede={description}
        image={image ?? tours[0]?.heroImage}
        facts={facts}
      />

      <section className="bg-background py-section">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b pb-5 hairline">
              <Eyebrow>All {categoryLabel[category].toLowerCase()}s</Eyebrow>
              <p className="font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
                {tours.length} {tours.length === 1 ? "journey" : "journeys"} available
              </p>
            </div>
          </Reveal>

          {/* Card grid: 1 col mobile → 2 col tablet → 3 col desktop */}
          <div className="mt-8">
            <RevealGroup
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.06}
            >
              {tours.slice(0, INITIAL_COUNT).map((tour) => (
                <RevealItem key={tour.slug}>
                  <TourCard tour={tour} />
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Remaining cards revealed smoothly when expanded */}
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
                  {tours.slice(INITIAL_COUNT).map((tour) => (
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

          {/* Centered "More Tours" / "More Treks" / "More Cycling" Button */}
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
                More {categoryLabel[category].toLowerCase()}s
                <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
