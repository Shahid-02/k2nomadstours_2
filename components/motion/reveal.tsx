"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Pre-created at module scope: `motion.create()` in render remounts on every pass. */
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  figure: motion.figure,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  blockquote: motion.blockquote,
} as const;

export type MotionTag = keyof typeof TAGS;
export type RevealDirection = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  /** A short defocus on entry — reads as depth rather than a slide. */
  blur?: boolean;
  once?: boolean;
  as?: MotionTag;
}

/**
 * The house reveal. Everything entering the viewport uses this, so the whole
 * site breathes at one tempo instead of each section inventing its own.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  blur = true,
  once = true,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = TAGS[as];
  const offset = OFFSET[direction];

  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: {
          opacity: 0,
          x: offset.x,
          y: offset.y,
          filter: blur ? "blur(6px)" : "blur(0px)",
        },
        visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
      };

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      variants={variants}
      transition={{
        duration: reduced ? 0.3 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Stagger container. Pair with `<RevealItem>` so a grid arrives as one wave
 * instead of every child running its own independent timer.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: MotionTag;
}) {
  const reduced = useReducedMotion();
  const Tag = TAGS[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -6% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  as?: MotionTag;
}) {
  const reduced = useReducedMotion();
  const Tag = TAGS[as];
  const offset = OFFSET[direction];

  return (
    <Tag
      className={className}
      variants={
        reduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, x: offset.x, y: offset.y, filter: "blur(5px)" },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
              },
            }
      }
    >
      {children}
    </Tag>
  );
}
