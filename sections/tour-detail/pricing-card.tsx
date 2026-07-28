import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import type { PricingTier } from "@/types/tour";

export function PricingCard({ pricing }: { pricing: PricingTier[] }) {
  if (pricing.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Pricing</h2>
        <p className="mt-2 text-muted-foreground">Per-person rates. Custom dates and private departures available on request.</p>
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {pricing.map((tier, i) => (
          <Reveal key={tier.label} delay={i * 0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">{tier.label}</p>
              <p className="mt-2 font-heading text-4xl font-semibold">
                {tier.currency === "USD" ? "$" : `${tier.currency} `}
                {tier.pricePerPerson.toLocaleString()}
                <span className="text-base font-normal text-muted-foreground"> / person</span>
              </p>
              {tier.groupSizeRange && (
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="size-3.5 text-primary" />
                  Group size {tier.groupSizeRange.min}–{tier.groupSizeRange.max}
                </p>
              )}
              {tier.notes && <p className="mt-1 text-xs text-muted-foreground">{tier.notes}</p>}
              <Button className="mt-6" nativeButton={false} render={<a href="#booking" />}>
                Book This Tour
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
