"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked parallax for a full-bleed photograph.
 *
 * The inner layer is oversized by `1 + strength` so the frame never reveals an
 * empty edge at either end of travel. Motion is spring-smoothed so it tracks
 * Lenis's easing instead of ticking against it.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  strength = 0.18,
  priority = false,
  sizes = "100vw",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  strength?: number;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shift = `${strength * 100}%`;
  const raw = useTransform(scrollYProgress, [0, 1], [`-${shift}`, shift]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={
          reduced
            ? undefined
            : { y, height: `${100 + strength * 200}%`, top: `-${strength * 100}%` }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
      {children}
    </div>
  );
}

/** Generic scroll-linked drift for non-image layers (type, cards, rules). */
export function Drift({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 110, damping: 28, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
