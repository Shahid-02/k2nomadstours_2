"use client";

import { useCallback, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Compass, ShieldCheck, Star, Users, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { TextReveal } from "@/components/motion/text-reveal";
import { GlassStat } from "@/components/shared/glass-stat";
import { presentItem } from "@/lib/inclusion-icons";
import { useTabListKeys } from "@/hooks/use-tab-list-keys";
import { credentials, getRating } from "@/data/credentials";
import { cn } from "@/lib/utils";
import type { Tour } from "@/types/tour";

/**
 * WHAT'S INCLUDED — 60/40.
 *
 * Left: the package, as a grid of cards built straight from `tour.inclusions`.
 * Right: a cinematic plate with glass figures floating over it.
 *
 * On the toggle: showing exclusions behind a tab does hide them, which is why
 * an earlier pass put both lists side by side. The count sits on the tab label
 * as the compromise — a visitor can see there are seven things the price does
 * not cover before deciding whether to look.
 *
 * On the figures: every one is derived from the catalogue or from the
 * company's own published commitments. See `data/credentials.ts`.
 */
type Panel = "included" | "excluded";

/** Tab order, so the arrow keys and the rendered order cannot drift apart. */
const PANEL_ORDER: Panel[] = ["included", "excluded"];

export function InclusionsExclusions({ tour }: { tour: Tour }) {
  const [panel, setPanel] = useState<Panel>("included");
  const reduced = useReducedMotion();
  const tabsId = useId();
  const selectByIndex = useCallback((next: number) => setPanel(PANEL_ORDER[next]), []);
  const onTabKeys = useTabListKeys(PANEL_ORDER.length, PANEL_ORDER.indexOf(panel), selectByIndex);

  const rating = getRating();
  const items = panel === "included" ? tour.inclusions : tour.exclusions;
  const plate = tour.gallery[0] ?? tour.heroImage;

  const tabs: { id: Panel; label: string; count: number }[] = [
    { id: "included", label: "Included", count: tour.inclusions.length },
    { id: "excluded", label: "Not included", count: tour.exclusions.length },
  ];

  const stats = [
    {
      icon: Check,
      value: String(tour.inclusions.length).padStart(2, "0"),
      label: "Covered in the price",
      note: `${tour.exclusions.length} things it doesn't, listed in full`,
    },
    {
      icon: Users,
      value: `${tour.groupSize.min}–${tour.groupSize.max}`,
      label: "Travelers per departure",
      note: "Small enough to be welcome in a village of forty",
    },
    {
      icon: Compass,
      value: String(credentials.localCrewPercent),
      unit: "%",
      label: "Local crew",
      note: "Guides and porters from the valleys the route crosses",
    },
    rating && {
      icon: Star,
      value: rating.average,
      unit: "★",
      label: "Traveler rating",
      note: `From ${rating.count} published accounts`,
    },
  ].filter(Boolean) as {
    icon: typeof Check;
    value: string;
    unit?: string;
    label: string;
    note: string;
  }[];

  return (
    <section id="included" className="scroll-mt-32 bg-background py-section">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        {/* ---------------------------------------------------------------- 60 */}
        <div>
          <Reveal>
            <Eyebrow>All-inclusive</Eyebrow>
          </Reveal>

          <TextReveal
            text="What's included"
            className="mt-6 text-title display-tight"
          />

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-lg text-lede text-muted-foreground">
              Permits, porters, kitchen crew and transfers are arranged before you land.
              Here is exactly what the per-person price covers — and the short list it
              doesn&apos;t.
            </p>
          </Reveal>

          {/* Segmented control. The counts are on the labels so nothing is
              concealed by the tab that happens to be closed. */}
          <Reveal delay={0.18}>
            <div
              role="tablist"
              aria-label="Price coverage"
              onKeyDown={onTabKeys}
              className="mt-9 inline-flex rounded-full border bg-muted/60 p-1 hairline"
            >
              {tabs.map((tab) => {
                const active = panel === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    type="button"
                    id={`${tabsId}-tab-${tab.id}`}
                    aria-controls={`${tabsId}-panel`}
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setPanel(tab.id)}
                    className={cn(
                      "relative flex items-center gap-2.5 rounded-full px-5 py-2.5 text-body-sm font-medium transition-colors duration-300",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="coverage-pill"
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 -z-10 rounded-full bg-card shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_-12px_rgba(0,0,0,0.35)]"
                      />
                    )}
                    {tab.id === "included" ? (
                      <Check
                        aria-hidden="true"
                        className={cn("size-4", active ? "text-alpenglow" : "opacity-60")}
                      />
                    ) : (
                      <X
                        aria-hidden="true"
                        className={cn("size-4", active ? "text-alpenglow" : "opacity-60")}
                      />
                    )}
                    {tab.label}
                    <span className="font-mono text-micro tabular-nums opacity-55">
                      {String(tab.count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.ul
              key={panel}
              id={`${tabsId}-panel`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-tab-${panel}`}
              tabIndex={0}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reduced ? 0 : 0.055 } },
                exit: { transition: { staggerChildren: 0 } },
              }}
              className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {items.map((raw) => {
                const item = presentItem(raw);
                const Icon = item.icon;
                return (
                  <motion.li
                    key={raw}
                    variants={{
                      hidden: reduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: 16, filter: "blur(6px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                      },
                      exit: { opacity: 0, transition: { duration: 0.18 } },
                    }}
                    className={cn(
                      "group/item plate-edge relative flex flex-col border bg-card p-5 hairline",
                      "transition-[box-shadow,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lift"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full border transition-colors duration-500",
                        panel === "included"
                          ? "border-alpenglow/30 text-alpenglow group-hover/item:border-alpenglow group-hover/item:bg-alpenglow group-hover/item:text-white"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </span>

                    <h3 className="mt-5 text-body font-medium leading-snug tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
                      {item.detail}
                    </p>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-5 block h-px w-8 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:scale-x-[2.5]",
                        panel === "included" ? "bg-alpenglow" : "bg-border"
                      )}
                    />
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>

          {panel === "excluded" && (
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-lg text-body-sm text-muted-foreground">
                Travel insurance covering trekking at altitude is mandatory on every
                departure — we&apos;ll ask to see it before you fly.
              </p>
            </Reveal>
          )}
        </div>

        {/* ---------------------------------------------------------------- 40 */}
        <Reveal direction="left" duration={0.9} className="lg:sticky lg:top-36 lg:self-start">
          {/* Taller on mobile than the content needs: the cards stack full
              width there, and at 36rem they covered the photograph entirely. */}
          <div className="plate dark relative isolate flex min-h-[46rem] flex-col justify-end bg-granite-950 text-snow-50 lg:min-h-[46rem]">
            <Image
              src={plate.src}
              alt={plate.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="-z-10 object-cover"
            />
            {/* Two layers: an even wash so the panel is dark top to bottom
                where the glass sits, plus the usual bottom-weighted scrim for
                the safety bar. */}
            <div className="absolute inset-0 -z-10 bg-granite-950/15" />
            <div className="scrim-deep absolute inset-0 -z-10" />

            <div className="flex flex-col gap-3 p-4 sm:p-5">
              <div className="flex flex-col gap-3 lg:ml-auto lg:w-[19.5rem]">
                {stats.map((stat, i) => (
                  <GlassStat key={stat.label} {...stat} index={i} />
                ))}
              </div>

              {/* Safety bar. Links to the FAQ, which answers this properly. */}
              <Reveal delay={0.45} duration={0.8}>
                {/* The action sits on its own line rather than competing with
                    the headline for width — this panel is only ~40% of the
                    shell, and a right-hand link broke the title across two. */}
                <Link
                  href="/faq"
                  className="group/safety block rounded-[var(--radius-plate)] border border-white/15 bg-granite-950/70 p-5 backdrop-blur-2xl transition-colors duration-500 hover:border-white/30"
                >
                  <span className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-alpenglow-bright">
                      <ShieldCheck aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-body-sm font-medium">
                        Safety is where the money goes
                      </span>
                      <span className="mt-1.5 block text-body-sm leading-snug text-snow-50/65">
                        Conservative grading, real acclimatisation days, and a guide who
                        calls a turnaround is backed by us.
                      </span>
                    </span>
                  </span>
                  <span className="mt-4 flex items-center gap-2 pl-13 font-mono text-micro uppercase tracking-[0.18em] text-alpenglow-bright">
                    How we handle safety
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/safety:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
