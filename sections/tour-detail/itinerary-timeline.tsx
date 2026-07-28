import { Hotel, Tent, UtensilsCrossed } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/reveal";
import type { ItineraryDay } from "@/types/tour";

export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Day-by-Day Itinerary</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-2 text-muted-foreground">
          {days.length} days from arrival to departure — a detailed route through every stop.
        </p>
      </Reveal>

      <div className="relative mt-8 border-l border-border pl-6">
        <Accordion multiple>
          {days.map((day) => (
            <div key={day.day} className="relative pb-1">
              <span className="absolute -left-[31px] top-3 flex size-4 items-center justify-center rounded-full border-2 border-primary bg-background" />
              <AccordionItem value={day.day} className="border-none">
                <AccordionTrigger className="items-center py-3">
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">Day {day.day}</span>
                    <span className="font-heading text-base font-semibold">{day.title}</span>
                    {day.theme && <span className="text-xs text-muted-foreground">{day.theme}</span>}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    {day.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                  {(day.accommodation || day.meals) && (
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      {day.accommodation && (
                        <span className="flex items-center gap-1.5">
                          {day.accommodation.toLowerCase().includes("camp") || day.accommodation.toLowerCase().includes("desert") ? (
                            <Tent className="size-3.5" />
                          ) : (
                            <Hotel className="size-3.5" />
                          )}
                          {day.accommodation}
                        </span>
                      )}
                      {day.meals && day.meals.length > 0 && (
                        <span className="flex items-center gap-1.5">
                          <UtensilsCrossed className="size-3.5" />
                          {day.meals.join(", ")}
                        </span>
                      )}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
