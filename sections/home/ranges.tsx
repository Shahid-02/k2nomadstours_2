import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ranges, type Range } from "@/data/regions";
import { cn } from "@/lib/utils";

/**
 * THREE RANGES — a bento, sized by how much of our catalogue sits in each.
 *
 * Karakoram takes two thirds of the grid because two thirds of the journeys
 * are there. The panel proportions carry that fact before anyone reads a word,
 * which is the only reason to break a grid in the first place.
 *
 * Each panel is measured up its left edge on the same scale, so the three
 * summit heights can be compared by eye rather than by arithmetic.
 */
/** Same ceiling and same track length on every panel, or the bars mean nothing. */
const SCALE_MAX = 9000;

function AltitudeScale({ metres }: { metres: number }) {
  const fill = Math.min(1, metres / SCALE_MAX);
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-7 left-6 h-28 w-px bg-white/25"
    >
      <span
        className="absolute inset-x-0 bottom-0 w-px bg-alpenglow-bright"
        style={{ height: `${fill * 100}%` }}
      />
      <span
        className="absolute -left-[2px] w-[5px] border-t border-alpenglow-bright"
        style={{ bottom: `${fill * 100}%` }}
      />
    </div>
  );
}

function RangePanel({ range, featured }: { range: Range; featured?: boolean }) {
  return (
    <Link
      href={range.href}
      className={cn(
        "plate group dark relative isolate flex h-full flex-col justify-end bg-granite-950 text-snow-50",
        featured ? "min-h-[30rem] lg:min-h-[42rem]" : "min-h-[19rem]"
      )}
    >
      <Image
        src={range.image.src}
        alt={range.image.alt}
        fill
        sizes={featured ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 31vw, 100vw"}
        className="-z-10 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="scrim-deep absolute inset-0 -z-10" />
      <AltitudeScale metres={range.highPoint.metres} />

      <div className={cn("relative pl-16 pr-6", featured ? "pb-9 pt-9" : "pb-7 pt-7")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            {/* White, not alpenglow. On these short panels the type block sits
                near the middle of the frame rather than in the deep end of the
                scrim, and orange at 12px disappears into the Kalash festival
                photograph entirely. The accent stays on the altitude scale,
                which is a graphic mark and survives any background. */}
            <p className="font-mono text-micro uppercase tracking-[0.24em] text-snow-50/85">
              {range.highPoint.peak} · {range.highPoint.metres.toLocaleString("en-US")} m
            </p>
            <h3
              className={cn(
                "mt-2.5 tracking-[-0.035em]",
                featured ? "text-display" : "text-title"
              )}
            >
              {range.name}
            </h3>
          </div>
          <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 group-hover:border-alpenglow-bright group-hover:bg-alpenglow-bright group-hover:text-granite-950">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        {featured && (
          <p className="mt-5 max-w-md text-body text-snow-50/75">{range.blurb}</p>
        )}

        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-micro uppercase tracking-[0.16em] text-snow-50/55">
          {range.places.map((place, i) => (
            <li key={place} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" className="h-px w-3 bg-current opacity-40" />}
              {place}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function Ranges() {
  const [featured, ...rest] = ranges;

  return (
    <section className="bg-background py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Where we go"
          title="Three ranges meet in northern Pakistan"
          lede="Nowhere else on earth do three of the world's great mountain systems collide inside a single day's drive. Every journey we run starts somewhere in that intersection."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="h-full lg:col-span-2 lg:row-span-2" duration={0.9}>
            <RangePanel range={featured} featured />
          </Reveal>
          {rest.map((range, i) => (
            <Reveal key={range.name} className="h-full" delay={0.1 + i * 0.08} duration={0.8}>
              <RangePanel range={range} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
