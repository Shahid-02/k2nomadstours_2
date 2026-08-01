"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

/**
 * Counts up to a figure once it enters the viewport.
 *
 * State is seeded with the final value, so the correct number is what the
 * server renders and what no-JS and reduced-motion readers keep. The animation
 * only ever runs from zero back to a figure that was already right.
 */
export function Counter({
  value,
  duration = 1.6,
  prefix = "",
  suffix = "",
  format = true,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format ? display.toLocaleString("en-US") : display}
      {suffix}
    </span>
  );
}
