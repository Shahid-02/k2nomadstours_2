"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/shared/section-heading";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

/**
 * THE WAY WE TRAVEL — sticky storytelling.
 *
 * Four principles, four photographs, one pinned frame. The plate on the left
 * changes as each principle takes the viewport, so a claim and its evidence
 * are never more than a glance apart.
 *
 * The labels are keywords, not 01/02/03 — these four things happen at once on
 * every trip, so numbering them would imply a sequence that does not exist.
 */
const PILLARS = [
  {
    tag: "Guides",
    title: "Led by people from the valley, not flown in for the season",
    body: "Our guides grew up in Shimshal, Hushe and Chitral. They know which bridge washed out last spring, whose kitchen to stop at, and when the weather is lying to you. Nobody reads from a script.",
    image: {
      src: "/images/optimized/wakhi-elder-shimshal.jpg",
      alt: "A Wakhi elder from Shimshal village in the upper Hunza valley",
    },
  },
  {
    tag: "Group size",
    title: "Four to ten people, so the mountain stays bigger than the group",
    body: "Small parties move faster, camp lighter and are actually welcome in a village of forty households. It also means your guide knows your name and your pace by day two.",
    image: {
      src: "/images/optimized/khunjerab-pass-group.jpg",
      alt: "A small group of travelers at the Khunjerab Pass on the Pakistan–China border",
    },
  },
  {
    tag: "Pricing",
    title: "One per-person price, and a list of what it does not cover",
    body: "Permits, porters, kitchen crew, transfers and domestic flights are itemised before you pay anything. The exclusions list is published on every trip page — we would rather lose a booking than surprise you in Skardu.",
    image: {
      src: "/images/optimized/nanga-parbat-camp.jpg",
      alt: "An expedition camp pitched beneath Nanga Parbat",
    },
  },
  {
    tag: "Pace",
    title: "Fewer stops, longer stays, real acclimatisation days",
    body: "Rest days at Paiju and Concordia are not padding — they are what gets you to 5,150 m safely and awake enough to remember it. Depth over distance, on every itinerary.",
    image: {
      src: "/images/optimized/borith-lake.jpg",
      alt: "Still morning light on Borith Lake in upper Hunza",
    },
  },
];

export function WhyK2() {
  const [active, setActive] = useState(0);

  return (
    <section className="dark grain relative bg-granite-950 py-section text-snow-50">
      <div className="shell">
        <Eyebrow className="text-snow-50/55">The way we travel</Eyebrow>
        <TextReveal
          as="h2"
          text="Four things we refuse to compromise on"
          className="mt-6 max-w-3xl text-title display-tight"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Pinned plate. Hidden on small screens, where each block carries its own. */}
          <div className="hidden lg:block">
            <div className="plate sticky top-28 aspect-[4/5] bg-granite-900">
              <AnimatePresence mode="sync">
                <motion.div
                  key={PILLARS[active].image.src}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={PILLARS[active].image.src}
                    alt={PILLARS[active].image.alt}
                    fill
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 flex gap-1.5 p-5">
                {PILLARS.map((pillar, i) => (
                  <span
                    key={pillar.tag}
                    aria-hidden="true"
                    className={cn(
                      "h-px flex-1 origin-left transition-colors duration-500",
                      i === active ? "bg-alpenglow-bright" : "bg-white/25"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol className="lg:-mt-24">
            {PILLARS.map((pillar, i) => (
              <motion.li
                key={pillar.tag}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="border-b border-white/10 py-10 last:border-b-0 lg:min-h-[62vh] lg:py-24"
              >
                <div className="plate relative mb-6 aspect-[16/10] bg-granite-900 lg:hidden">
                  <Image
                    src={pillar.image.src}
                    alt={pillar.image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    className={cn(
                      "font-mono text-micro uppercase tracking-[0.24em] transition-colors duration-500",
                      i === active ? "text-alpenglow-bright" : "text-snow-50/60"
                    )}
                  >
                    {pillar.tag}
                  </p>
                  <h3 className="mt-4 max-w-lg text-heading leading-[1.15] tracking-[-0.03em]">
                    {pillar.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-body text-snow-50/70">{pillar.body}</p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
