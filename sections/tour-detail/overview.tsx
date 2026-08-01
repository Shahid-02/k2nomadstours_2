import { Sparkles } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { DifficultyMeter } from "@/components/shared/difficulty-meter";
import { Cta } from "@/components/shared/cta";
import { highlightIconMap } from "@/lib/icon-map";
import { durationLabel, groupSizeLabel, fromPrice } from "@/lib/format";
import { getOutboundRoute } from "@/lib/route";
import { siteConfig } from "@/data/site";
import type { Tour } from "@/types/tour";

/**
 * OVERVIEW — the argument for this specific trip, with the booking facts
 * pinned alongside it.
 *
 * The card on the right stays in view for the whole section, so someone
 * persuaded by the third paragraph does not have to hunt for the price. It
 * repeats what the hero already said on purpose: by this point the hero has
 * scrolled away.
 */
export function TourOverview({ tour }: { tour: Tour }) {
  const price = fromPrice(tour);
  const { start, farPoint, returnsToStart } = getOutboundRoute(tour.route);

  const glance = [
    { label: "Trailhead", value: start },
    { label: "Far point", value: farPoint },
    { label: "Duration", value: durationLabel(tour.durationDays) },
    { label: "Best season", value: tour.bestSeason },
    { label: "Group size", value: `${groupSizeLabel(tour.groupSize)} travelers` },
    { label: "Style", value: tour.style },
  ];

  return (
    <section id="overview" className="scroll-mt-32 bg-background py-section">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>The journey</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-7 max-w-2xl text-[clamp(1.125rem,1.9vw,1.5rem)] leading-[1.5] tracking-[-0.01em]">
              {tour.summary}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <h2 className="mt-14 text-heading tracking-[-0.03em]">
              What makes this one worth the flights
            </h2>
          </Reveal>

          <RevealGroup className="mt-7 border-t hairline" stagger={0.08}>
            {tour.highlights.map((highlight) => {
              const Icon = highlightIconMap[highlight.icon] ?? Sparkles;
              return (
                <RevealItem
                  key={highlight.text}
                  className="flex items-start gap-5 border-b py-6 hairline"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-alpenglow/35 text-alpenglow">
                    <Icon className="size-4" />
                  </span>
                  <p className="max-w-xl text-body">{highlight.text}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* At a glance — pinned for the length of the section. */}
        <Reveal delay={0.12} direction="left" className="lg:sticky lg:top-36 lg:self-start">
          <div className="plate border p-7 hairline">
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-muted-foreground">
              At a glance
            </p>

            <dl className="mt-6 space-y-4">
              {glance.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 border-b pb-4 hairline last:border-b-0"
                >
                  <dt className="font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="text-right text-body-sm font-medium">{item.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6">
                <dt className="font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground">
                  Difficulty
                </dt>
                <dd className="text-muted-foreground">
                  <DifficultyMeter difficulty={tour.difficulty} />
                </dd>
              </div>
            </dl>

            {returnsToStart && (
              <p className="mt-6 font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground">
                Returns to {start}
              </p>
            )}

            {price && (
              <p className="mt-7 border-t pt-6 hairline">
                <span className="font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
                  From
                </span>
                <span className="mt-1 block font-mono text-[2rem] leading-none tracking-[-0.03em]">
                  {price.label}
                </span>
                <span className="mt-1.5 block text-body-sm text-muted-foreground">
                  per person, land-only
                </span>
              </p>
            )}

            <Cta href="#reserve" size="lg" className="mt-7 w-full" magnetic={false}>
              Check dates
            </Cta>
            <p className="mt-4 text-center text-body-sm text-muted-foreground">
              or{" "}
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe text-alpenglow"
              >
                ask us on WhatsApp
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
