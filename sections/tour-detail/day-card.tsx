"use client";

import Image from "next/image";
import {
  Clock,
  Home,
  Hotel,
  MapPin,
  Mountain,
  Route,
  Tent,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getDayMetrics, type StayKind } from "@/lib/itinerary";
import { cn } from "@/lib/utils";
import type { ItineraryDay } from "@/types/tour";

const STAY_ICON: Record<StayKind, LucideIcon> = {
  hotel: Hotel,
  guesthouse: Home,
  camp: Tent,
  homestay: Home,
  other: MapPin,
};

const MODE_LABEL: Record<string, string> = {
  trek: "on foot",
  drive: "by road",
  ride: "by bike",
  fly: "by air",
};

/**
 * The tile that stands in for a photograph.
 *
 * The catalogue has three or four images per tour, not one per day, and
 * dropping a Concordia glacier next to "Arrival in Islamabad" would be a lie
 * told in pictures. So an unillustrated day gets a designed chip instead: the
 * day number, where you sleep, and — when the itinerary states an altitude —
 * a bar showing where that day sits between the trip's lowest and highest
 * point. Add `image` to a day in the data and this is replaced by the photo.
 */
function DayTile({
  day,
  altitudeRatio,
  stayKind,
}: {
  day: ItineraryDay;
  altitudeRatio: number | null;
  stayKind: StayKind | null;
}) {
  const StayIcon = stayKind ? STAY_ICON[stayKind] : MapPin;
  const label = String(day.day).padStart(2, "0");

  if (day.image) {
    return (
      <div className="plate-inner relative size-16 shrink-0 overflow-hidden bg-muted sm:size-[5.5rem]">
        <Image
          src={day.image.src}
          alt={day.image.alt}
          fill
          sizes="88px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="plate-inner relative flex size-16 shrink-0 flex-col items-center justify-center overflow-hidden bg-granite-950 text-snow-50 sm:size-[5.5rem]"
    >
      <StayIcon className="size-3.5 opacity-45" />
      <span className="mt-1.5 font-mono text-[1.125rem] leading-none tracking-[-0.02em] sm:text-[1.375rem]">
        {label}
      </span>
      {altitudeRatio !== null && (
        <span className="absolute inset-x-0 bottom-0 h-1 bg-white/12">
          <span
            className="block h-full bg-alpenglow-bright"
            style={{ width: `${Math.max(8, altitudeRatio * 100)}%` }}
          />
        </span>
      )}
    </div>
  );
}

function Metric({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-alpenglow" />
      <span className="min-w-0">
        <span className="block line-clamp-2 text-body-sm font-medium leading-tight">{value}</span>
        <span className="mt-0.5 block font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
      </span>
    </div>
  );
}

export function DayCard({
  day,
  altitudeRatio,
  index,
}: {
  day: ItineraryDay;
  altitudeRatio: number | null;
  index: number;
}) {
  const metrics = getDayMetrics(day);
  const modeLabel = metrics.mode ? MODE_LABEL[metrics.mode] : null;

  const items = [
    metrics.distanceKm !== null && {
      icon: Route,
      value: `${metrics.distanceKm} km`,
      label: "Distance",
    },
    metrics.duration && {
      icon: Clock,
      value: metrics.duration,
      label: modeLabel ?? "Moving",
    },
    metrics.elevationM !== null && {
      icon: Mountain,
      value: `${metrics.elevationM.toLocaleString("en-US")} m`,
      label: "Altitude",
    },
    metrics.stay && {
      icon: STAY_ICON[metrics.stay.kind],
      value: metrics.stay.label,
      label: "Overnight",
    },
  ].filter(Boolean) as { icon: LucideIcon; value: string; label: string }[];

  return (
    <AccordionItem
      value={day.day}
      className={cn(
        "plate-edge group/day relative border bg-card transition-[box-shadow,border-color] duration-500 hairline",
        "hover:border-foreground/15 hover:shadow-lift",
        "data-open:border-alpenglow/40 data-open:shadow-lift"
      )}
    >
      {/* Node on the spine. Alpenglow once the day is open, so the rail reads
          as a position indicator rather than decoration. */}
      <span
        aria-hidden="true"
        className={cn(
          // Sits on the rail: container padding is pl-10/pl-14, rail is at
          // left-3/left-4, so the node offsets back by the difference.
          "absolute -left-7 top-9 size-[11px] -translate-x-1/2 rounded-full border-2 bg-muted transition-colors duration-500 sm:-left-10",
          "border-border group-hover/day:border-foreground/40",
          "group-data-open/day:border-alpenglow group-data-open/day:bg-alpenglow"
        )}
      />

      <AccordionTrigger
        className={cn(
          "w-full items-start gap-5 rounded-none p-4 text-left hover:no-underline sm:p-5",
          "**:data-[slot=accordion-trigger-icon]:mt-1.5 **:data-[slot=accordion-trigger-icon]:size-4",
          "**:data-[slot=accordion-trigger-icon]:text-alpenglow"
        )}
      >
        <span className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <span className="flex min-w-0 flex-1 items-start gap-3.5 sm:gap-5">
            <DayTile
              day={day}
              altitudeRatio={altitudeRatio}
              stayKind={metrics.stay?.kind ?? null}
            />

            <span className="min-w-0 flex-1 pt-0.5">
              <span className="font-mono text-micro uppercase tracking-[0.2em] text-alpenglow">
                Day {day.day}
              </span>
              <span className="mt-2 block text-heading leading-[1.15] tracking-[-0.03em]">
                {day.title}
              </span>
              {metrics.leg ? (
                <span className="mt-2 flex flex-wrap items-center gap-2 font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
                  {metrics.leg.from}
                  <span aria-hidden="true" className="h-px w-4 bg-current opacity-45" />
                  {metrics.leg.to}
                </span>
              ) : day.theme ? (
                <span className="mt-2 block font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
                  {day.theme}
                </span>
              ) : null}
            </span>
          </span>

          {/* Fixed width on desktop even when a day states only one metric: the
              rule then lands at the same x on every card, so the column reads
              as a table rather than a ragged edge. */}
          {items.length > 0 && (
            <span
              className={cn(
                "grid shrink-0 grid-cols-2 gap-x-6 gap-y-4 border-t pt-4 hairline",
                "lg:w-[20rem] lg:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
              )}
            >
              {items.map((item) => (
                <Metric key={item.label} {...item} />
              ))}
            </span>
          )}
        </span>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-6 sm:px-5 sm:pl-[7.5rem]">
        <ul className="max-w-2xl space-y-2.5">
          {day.activities.map((activity) => (
            <li
              key={activity}
              className="relative pl-5 text-body text-muted-foreground before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-alpenglow"
            >
              {activity}
            </li>
          ))}
        </ul>

        {metrics.meals && (
          <p className="mt-5 flex items-center gap-2.5 font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground">
            <UtensilsCrossed aria-hidden="true" className="size-3.5" />
            Meals included · {metrics.meals}
          </p>
        )}
      </AccordionContent>

      {/* Hairline that warms on hover, matching the tour cards. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-alpenglow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover/day:scale-x-100"
        )}
        style={{ transitionDelay: `${Math.min(index, 6) * 15}ms` }}
      />
    </AccordionItem>
  );
}
