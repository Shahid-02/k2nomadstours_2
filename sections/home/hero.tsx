"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cta } from "@/components/shared/cta";
import { TextRevealOnLoad } from "@/components/motion/text-reveal";
import { Magnetic } from "@/components/motion/magnetic";

/**
 * HERO — the thesis.
 *
 * The headline is lifted straight out of the company's own K2 itinerary:
 * Askole is described there as "End of the Road", and it genuinely is — the
 * last permanent village before fourteen days of glacier. That single fact
 * says more about what this company sells than any superlative could, so it
 * gets the largest type on the site.
 *
 * The stat rail beside it is all real catalogue data: how many journeys exist,
 * how high the highest point in view is, how small the groups are.
 */
const FACTS = [
  { value: "21", label: "Journeys" },
  { value: "8,611", label: "Highest peak in view", unit: "m" },
  { value: "3", label: "Ranges" },
  { value: "4–10", label: "Per group" },
];

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="dark grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-granite-950 text-snow-50"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
        initial={{ scale: 1.14, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/photos/IMG_9802.JPG"
          alt="Snow-capped Karakoram peaks rising above a glacial valley in northern Pakistan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="scrim absolute inset-0" />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="shell-wide relative pb-16 pt-32 sm:pb-20 lg:pb-24"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="eyebrow flex items-center gap-3 text-snow-50/70"
            >
              <span aria-hidden="true" className="h-px w-10 bg-alpenglow-bright" />
              Karakoram · Himalaya · Hindukush
            </motion.p>

            <TextRevealOnLoad
              as="h1"
              text="The road ends at Askole."
              delay={0.26}
              stagger={0.06}
              className="mt-6 max-w-[16ch] text-hero display-tight font-semibold"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.52 }}
              className="mt-7 max-w-xl text-lede text-snow-50/78"
            >
              Everything past it — the Baltoro, Concordia, the foot of K2 — you walk.
              Twenty-one journeys through northern Pakistan, led by guides from the valleys
              they cross.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.66 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Cta href="#journeys" size="xl">
                See the journeys
              </Cta>
              <Magnetic strength={0.2}>
                <Button
                  nativeButton={false}
                  variant="glass"
                  size="xl"
                  render={<Link href="/treks/k2-base-camp-trek" />}
                >
                  K2 Base Camp · 21 days
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Survey rail: the numbers that decide whether this trip is for you. */}
          <motion.dl
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.74 } },
            }}
            className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-7 sm:grid-cols-4 lg:w-[19rem] lg:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            {FACTS.map((fact) => (
              <motion.div
                key={fact.label}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <dt className="font-mono text-micro uppercase tracking-[0.18em] text-snow-50/50">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-mono text-[1.5rem] leading-none tracking-[-0.02em]">
                  {fact.value}
                  {fact.unit && (
                    <span className="ml-0.5 text-body-sm text-snow-50/50">{fact.unit}</span>
                  )}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.a
        href="#journeys"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.7 }}
        className="group absolute bottom-7 right-[var(--spacing-gutter)] hidden items-center gap-3 font-mono text-micro uppercase tracking-[0.22em] text-snow-50/55 lg:flex"
      >
        Scroll
        <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-white/25">
          <span className="absolute inset-x-0 top-0 h-4 animate-bounce bg-alpenglow-bright" />
        </span>
      </motion.a>
    </section>
  );
}
