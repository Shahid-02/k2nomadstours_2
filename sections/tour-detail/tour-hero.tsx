"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Gauge, CalendarRange, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/types/tour";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function TourHero({ tour }: { tour: Tour }) {
  const start = tour.route[0];
  const end = tour.route[tour.route.length - 1];
  const routeLabel = start === end ? `Round trip from ${start}` : `${start} → ${end}`;
  const durationLabel =
    tour.durationDays.min === tour.durationDays.max
      ? `${tour.durationDays.min} days`
      : `${tour.durationDays.min}–${tour.durationDays.max} days`;

  const facts = [
    { icon: MapPin, label: routeLabel },
    { icon: Clock, label: durationLabel },
    { icon: Gauge, label: tour.difficulty },
    { icon: CalendarRange, label: tour.bestSeason },
    { icon: Users, label: `${tour.groupSize.min}–${tour.groupSize.max} travelers` },
  ];

  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden">
      <Image
        src={tour.heroImage.src}
        alt={tour.heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-32 text-white sm:px-6 lg:px-8">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-sm font-medium uppercase tracking-wider text-white/80"
        >
          {tour.style}
        </motion.p>
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {tour.title}
        </motion.h1>
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mt-3 max-w-2xl text-white/85">
          {tour.tagline}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90"
        >
          {facts.map((fact) => (
            <span key={fact.label} className="flex items-center gap-1.5">
              <fact.icon className="size-4" />
              {fact.label}
            </span>
          ))}
        </motion.div>

        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" nativeButton={false} render={<a href="#booking" />}>
            Book This Tour
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} className="border-white/40 bg-white/5 text-white hover:bg-white/15" render={<a href="#itinerary" />}>
            View Itinerary
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
