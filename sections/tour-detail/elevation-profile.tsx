"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ItineraryDay } from "@/types/tour";
import { extractAltitude } from "@/lib/route";

interface Point {
  day: string;
  index: number;
  metres: number;
}

/**
 * ELEVATION PROFILE.
 *
 * Built entirely from altitudes already written into the itinerary copy
 * ("Altitude: 3,040m", "Trek to K2 Base Camp at 5,150m"). Nothing is invented
 * or interpolated — only the days that actually state a height are plotted,
 * and the caption says so.
 *
 * It renders only when the itinerary gives us at least three fixes, which is
 * the point at which a line starts telling the truth about a route's shape.
 */
export function ElevationProfile({ days }: { days: ItineraryDay[] }) {
  const reduced = useReducedMotion();

  const points: Point[] = days
    .map((day, index) => {
      const source = [day.title, ...day.activities].join(" ");
      const metres = extractAltitude(source);
      return metres ? { day: String(day.day), index, metres } : null;
    })
    .filter((p): p is Point => p !== null);

  if (points.length < 3) return null;

  const width = 1000;
  const height = 190;
  const padTop = 26;
  const padBottom = 30;

  const maxDay = days.length - 1 || 1;
  const lo = Math.min(...points.map((p) => p.metres));
  const hi = Math.max(...points.map((p) => p.metres));
  const span = Math.max(hi - lo, 1);

  const x = (index: number) => (index / maxDay) * width;
  const y = (metres: number) =>
    padTop + (1 - (metres - lo) / span) * (height - padTop - padBottom);

  const line = points.map((p) => `${x(p.index).toFixed(1)},${y(p.metres).toFixed(1)}`).join(" ");
  const area = `${x(points[0].index).toFixed(1)},${height - padBottom} ${line} ${x(
    points[points.length - 1].index
  ).toFixed(1)},${height - padBottom}`;

  const peak = points.reduce((best, p) => (p.metres > best.metres ? p : best));

  return (
    <figure className="mt-10 border-t pt-8 hairline">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="font-mono text-micro uppercase tracking-[0.22em] text-muted-foreground">
          Elevation, as stated in the itinerary
        </span>
        <span className="font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground">
          High point{" "}
          <span className="text-body-sm text-alpenglow">
            {peak.metres.toLocaleString("en-US")} m
          </span>{" "}
          · day {peak.day}
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Elevation profile: ${points
          .map((p) => `day ${p.day} at ${p.metres.toLocaleString("en-US")} metres`)
          .join(", ")}`}
        className="mt-5 h-[190px] w-full"
      >
        <defs>
          <linearGradient id="elevation-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--alpenglow)" stopOpacity="0.24" />
            <stop offset="100%" stopColor="var(--alpenglow)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line
          x1="0"
          y1={height - padBottom}
          x2={width}
          y2={height - padBottom}
          stroke="var(--hairline)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        <motion.polygon
          points={area}
          fill="url(#elevation-fill)"
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
        />

        <motion.polyline
          points={line}
          fill="none"
          stroke="var(--alpenglow)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduced ? undefined : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {points.map((p) => (
          <g key={`${p.day}-${p.metres}`}>
            <circle
              cx={x(p.index)}
              cy={y(p.metres)}
              r={p === peak ? 5 : 3}
              fill={p === peak ? "var(--alpenglow)" : "var(--background)"}
              stroke="var(--alpenglow)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      {/* Figures live in HTML, not SVG text, so they stay crisp and selectable. */}
      <ul className="-mt-2 flex flex-wrap gap-x-6 gap-y-2 font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
        {points.map((p) => (
          <li key={`label-${p.day}-${p.metres}`}>
            <span className="text-foreground/70">D{p.day}</span>{" "}
            {p.metres.toLocaleString("en-US")} m
          </li>
        ))}
      </ul>
    </figure>
  );
}
