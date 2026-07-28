"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tour } from "@/types/tour";
import { tourHref } from "@/data/tours";

const categoryLabel: Record<Tour["category"], string> = {
  tour: "Tour",
  trek: "Trek",
  cycling: "Cycling",
};

export function TourCard({ tour }: { tour: Tour }) {
  const durationLabel =
    tour.durationDays.min === tour.durationDays.max
      ? `${tour.durationDays.min} days`
      : `${tour.durationDays.min}–${tour.durationDays.max} days`;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={tourHref(tour)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={tour.heroImage.src}
            alt={tour.heroImage.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute left-3 top-3" variant="secondary">
            {categoryLabel[tour.category]}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-heading text-lg font-semibold leading-snug">{tour.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{tour.tagline}</p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {durationLabel}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="size-3.5" />
              {tour.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3.5" />
              {tour.groupSize.min}–{tour.groupSize.max}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
