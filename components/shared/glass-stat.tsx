"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlassStatProps {
  icon: LucideIcon;
  value: string;
  /** Rendered smaller and dimmer beside the value — "%", "★", "m". */
  unit?: string;
  label: string;
  note?: string;
  index?: number;
  className?: string;
}

/**
 * Floating glass panel for a single figure.
 *
 * The depth is real rather than painted on: the card tilts toward the cursor
 * on two axes inside a perspective container, and the icon and figure sit on
 * their own Z planes so they part slightly as it turns. Two shadows do the
 * rest — a tight contact shadow and a long soft one, which is what separates
 * a floating object from a rectangle with a blur behind it.
 *
 * Pointer-driven only. Keyboard and touch users get the card flat, and
 * `prefers-reduced-motion` disables the tilt entirely.
 */
export function GlassStat({
  icon: Icon,
  value,
  unit,
  label,
  note,
  index = 0,
  className,
}: GlassStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);
  const glareX = useTransform(px, [-0.5, 0.5], ["18%", "82%"]);

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 0.75,
        delay: 0.12 + index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        "group/stat relative isolate overflow-hidden rounded-[var(--radius-plate)]",
        // Tinted dark rather than light. A white-tinted panel is the prettier
        // glass right up until it drifts over sunlit snow, at which point the
        // white type on it disappears. Dark tint reads on any photograph.
        "border border-white/15 bg-granite-950/55 backdrop-blur-2xl backdrop-saturate-150",
        "shadow-[0_2px_6px_-2px_rgba(0,0,0,0.5),0_28px_60px_-28px_rgba(0,0,0,0.9)]",
        "px-5 py-4 text-snow-50 will-change-transform",
        className
      )}
    >
      {/* Top-edge highlight: the tell that a glass panel is lit from above. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
      />
      {/* Specular sweep that tracks the cursor. */}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          style={{ left: glareX }}
          className="pointer-events-none absolute -top-1/2 h-[200%] w-40 -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.16),transparent)] opacity-0 transition-opacity duration-500 group-hover/stat:opacity-100"
        />
      )}

      <div className="flex items-start gap-4" style={{ transform: "translateZ(24px)" }}>
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-alpenglow-bright">
          <Icon aria-hidden="true" className="size-4" />
        </span>

        <div className="min-w-0">
          <p className="font-mono text-[1.75rem] leading-none tracking-[-0.03em]">
            {value}
            {unit && <span className="ml-0.5 text-body text-snow-50/60">{unit}</span>}
          </p>
          <p className="mt-2 text-body-sm font-medium leading-tight">{label}</p>
          {note && (
            <p className="mt-1 text-body-sm leading-snug text-snow-50/60">{note}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
