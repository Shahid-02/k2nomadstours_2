"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DifficultyMeter } from "@/components/shared/difficulty-meter";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types/tour";

export interface IndexEntry {
  slug: string;
  title: string;
  href: string;
  category: string;
  days: string;
  sortDays: number;
  farPoint: string;
  difficulty: Difficulty;
  image: string;
  imageAlt: string;
}

/**
 * THE INDEX — the full catalogue as a typographic table.
 *
 * Rows are ordered by length, shortest first, so the mono column on the left
 * climbs as you read down. That turns the numerals into a scale: a visitor
 * scanning for "something under a fortnight" finds the cut-off by eye without
 * a filter control.
 *
 * A plate follows the cursor because a route name means nothing to someone who
 * has never been. On touch and for keyboard users the plate never appears —
 * the row still carries days, region and difficulty in text.
 */
export function JourneyIndex({
  entries,
  className,
}: {
  entries: IndexEntry[];
  className?: string;
}) {
  const [active, setActive] = useState<IndexEntry | null>(null);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.5 });

  const rows = [...entries].sort((a, b) => a.sortDays - b.sortDays);

  function trackPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={trackPointer}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {active && !reduced && (
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: sx, y: sy }}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
          >
            <div className="plate relative -ml-[9rem] -mt-[6rem] h-[13rem] w-[18rem] shadow-lift-hover">
              <Image
                src={active.image}
                alt=""
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ol className="border-t hairline">
        {rows.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={entry.href}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(entry)}
              onPointerLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              className={cn(
                "group/row relative grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b py-5 transition-colors duration-500 hairline",
                "lg:grid-cols-[5rem_minmax(0,1fr)_10rem_10rem_2.5rem] lg:items-center lg:gap-x-8",
                "hover:text-alpenglow"
              )}
            >
              <span className="font-mono text-[1.375rem] leading-none tracking-[-0.02em] tabular-nums">
                {entry.days}
                <span className="ml-1 text-micro tracking-[0.14em] text-muted-foreground transition-colors group-hover/row:text-alpenglow">
                  d
                </span>
              </span>

              <span className="min-w-0">
                <span className="block truncate text-heading leading-tight tracking-[-0.03em]">
                  {entry.title}
                </span>
                <span className="mt-1 block font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground lg:hidden">
                  {entry.category} · {entry.farPoint} · {entry.difficulty}
                </span>
              </span>

              <span className="hidden font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground lg:block">
                {entry.farPoint}
              </span>

              <span className="hidden text-muted-foreground lg:block">
                <DifficultyMeter difficulty={entry.difficulty} />
              </span>

              <span
                aria-hidden="true"
                className="justify-self-end text-muted-foreground transition-all duration-500 group-hover/row:translate-x-1 group-hover/row:text-alpenglow"
              >
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
