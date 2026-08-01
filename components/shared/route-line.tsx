"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getOutboundRoute, condenseRoute } from "@/lib/route";

/* ==========================================================================
   THE ROUTE LINE — the signature device of this site.

   Every journey in the catalogue is already stored as an ordered list of
   places. That sequence *is* the product: where you meet the team, what you
   cross, how far out you get. So instead of decorating cards with generic
   duration/difficulty chips, we draw the actual line.

   The same device scales across three contexts:
     strip — a folded one-line summary on cards and listings
     full  — a measured survey rule with ticks and labels, on tour heroes
     spine — the vertical form, used as the itinerary's backbone

   The last node on the outbound leg carries the alpenglow mark. On an
   out-and-back that really is the furthest point reached; on a traverse it is
   simply where the line stops before the drive home. The mark says "end of the
   line" and claims nothing more, which is why no label calls it a summit.
   ========================================================================== */

const draw = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const nodeIn = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

interface RouteLineProps {
  route: string[];
  variant?: "strip" | "full";
  /** Max nodes before the middle is folded away. */
  limit?: number;
  className?: string;
}

export function RouteLine({
  route,
  variant = "strip",
  limit = variant === "strip" ? 4 : 8,
  className,
}: RouteLineProps) {
  const reduced = useReducedMotion();
  const { nodes, returnsToStart, farPoint, start } = getOutboundRoute(route);
  if (nodes.length === 0) return null;

  const { head, hidden, tail } = condenseRoute(nodes, limit);
  const shown = [
    ...head.map((name) => ({ name, elided: false })),
    ...(hidden > 0 ? [{ name: `+${hidden}`, elided: true }] : []),
    ...tail.map((name) => ({ name, elided: false })),
  ];

  const label = `Route: ${nodes.join(" to ")}${returnsToStart ? `, returning to ${start}` : ""}`;

  if (variant === "strip") {
    return (
      <p
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground",
          className
        )}
        aria-label={label}
      >
        {shown.map((node, i) => (
          <span key={`${node.name}-${i}`} className="flex items-center gap-2" aria-hidden="true">
            {i > 0 && <span className="h-px w-3 bg-current opacity-40" />}
            <span
              className={cn(
                node.name === farPoint && "text-alpenglow",
                node.elided && "opacity-50"
              )}
            >
              {node.name}
            </span>
          </span>
        ))}
        {returnsToStart && (
          <span className="opacity-45" aria-hidden="true">
            ⟲
          </span>
        )}
      </p>
    );
  }

  return (
    <motion.div
      className={cn("relative w-full", className)}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-10% 0px" }}
      aria-label={label}
      role="group"
    >
      {/* The rule itself, drawn from the trailhead outward. */}
      <motion.span
        aria-hidden="true"
        variants={reduced ? undefined : draw}
        className="absolute left-0 right-0 top-[7px] h-px origin-left bg-current opacity-30"
      />

      <motion.ol
        className="relative flex items-start justify-between gap-1"
        variants={
          reduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }
        }
      >
        {shown.map((node, i) => {
          const isApex = node.name === farPoint;
          const isFirst = i === 0;
          return (
            <motion.li
              key={`${node.name}-${i}`}
              variants={reduced ? undefined : nodeIn}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-2.5 text-center",
                isFirst && "items-start text-left",
                i === shown.length - 1 && "items-end text-right"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "relative block size-[15px] shrink-0",
                  isApex ? "text-alpenglow" : "text-current"
                )}
              >
                {isApex ? (
                  <span className="absolute inset-[2px] rotate-45 bg-current" />
                ) : isFirst ? (
                  <span className="absolute inset-[3px] rounded-full border-[1.5px] border-current bg-background" />
                ) : (
                  <span className="absolute inset-[5px] rounded-full bg-current" />
                )}
              </span>
              {/* The full variant only ever sits on a photograph, and alpenglow
                  on sunlit glacier is unreadable. The diamond keeps the accent;
                  the label gets weight and full opacity instead. */}
              <span
                className={cn(
                  "font-mono text-micro uppercase leading-[1.35] tracking-[0.16em]",
                  isApex ? "font-medium opacity-100" : "opacity-70",
                  node.elided && "opacity-40"
                )}
              >
                {node.name}
              </span>
            </motion.li>
          );
        })}
      </motion.ol>

      {returnsToStart && (
        <p className="mt-3 font-mono text-micro uppercase tracking-[0.2em] opacity-45">
          Returns to {start}
        </p>
      )}
    </motion.div>
  );
}
