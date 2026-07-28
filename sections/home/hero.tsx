"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export function HomeHero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <Image
        src="/images/photos/IMG_9802.JPG"
        alt="Snow-capped Karakoram peaks rising above a valley in northern Pakistan"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp} className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
          Nomadic & Cultural Tours of Pakistan
        </motion.p>
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-4 max-w-3xl font-heading text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Welcome to K2 Land
        </motion.h1>
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mt-5 max-w-xl text-lg text-white/85">
          From towering snow-clad peaks to serene lakes and valleys, from golden deserts to vibrant cities — Pakistan offers a
          stunning blend of natural wonders, cultural treasures, and unforgettable adventures.
        </motion.p>
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="#popular-journeys" />}>
            Explore Journeys
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/5 text-white hover:bg-white/15"
            render={<Link href="/tours/nomadic-experience-of-pakistan" />}
          >
            Featured: Nomadic Experience of Pakistan
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 flex justify-center text-white/70"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </motion.div>
    </section>
  );
}
