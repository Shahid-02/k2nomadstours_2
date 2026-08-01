"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal drift. The track is duplicated and translated -50%, so
 * the loop is seamless; the copy is `aria-hidden` so nothing is read twice.
 * Halts on hover and under `prefers-reduced-motion` (handled globally in CSS).
 */
export function Marquee({
  children,
  duration = 44,
  reverse = false,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("group/marquee relative flex overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className={cn(
          "animate-marquee flex w-max shrink-0 items-center group-hover/marquee:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
