"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/field";
import { Honeypot, readHoneypot } from "@/components/shared/honeypot";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { TextReveal } from "@/components/motion/text-reveal";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import { priceLabel } from "@/lib/format";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Tour } from "@/types/tour";

/**
 * RESERVE — pricing and the enquiry form, joined.
 *
 * They used to be two sections a screen apart, which meant choosing a tier and
 * asking about it were separate acts of faith. Now picking a tier fills the
 * group size and names the tier in the message, so the enquiry that lands in
 * the inbox already says which departure the traveler had in mind.
 */
export function Reserve({ tour }: { tour: Tour }) {
  // Preselect the cheapest tier: it is the figure the hero, the sticky rail and
  // every card on the site advertise as "from", so anything else contradicts
  // the number that got the visitor here.
  const [selected, setSelected] = useState(() =>
    tour.pricing.reduce(
      (best, tier, i) =>
        tier.pricePerPerson < tour.pricing[best].pricePerPerson ? i : best,
      0
    )
  );
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tourSlug: tour.slug,
      groupSize: tour.groupSize.min,
      message: "",
    },
  });

  function chooseTier(index: number) {
    setSelected(index);
    const tier = tour.pricing[index];
    if (!tier) return;
    if (tier.groupSizeRange) setValue("groupSize", tier.groupSizeRange.min);
    setValue("message", `Interested in the “${tier.label}” rate.`);
  }

  async function onSubmit(values: BookingFormValues, event?: React.BaseSyntheticEvent) {
    const company = readHoneypot(event);
    setSubmitError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      if (res.ok) {
        setSubmittedEmail(values.email);
        setSubmitted(true);
        return;
      }
      const data = await res.json().catch(() => null);
      setSubmitError(
        typeof data?.error === "string"
          ? data.error
          : "We couldn't send that. Message us on WhatsApp and we'll pick it up there."
      );
    } catch {
      setSubmitError(
        "We couldn't reach the server. Check your connection, or message us on WhatsApp."
      );
    }
  }

  return (
    <section id="reserve" className="scroll-mt-32 bg-muted py-section">
      <div className="shell">
        <Reveal>
          <Eyebrow>Reserve</Eyebrow>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            text={`Book ${tour.title}`}
            className="max-w-3xl text-title display-tight"
          />
          <Reveal delay={0.12}>
            <p className="max-w-sm text-body-sm text-muted-foreground">
              We confirm availability within 24 hours. Nothing is charged at this stage —
              this is an enquiry, not a payment.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Tiers */}
          <Reveal delay={0.05} className="lg:sticky lg:top-36 lg:self-start">
            <fieldset>
              <legend className="font-mono text-micro uppercase tracking-[0.22em] text-muted-foreground">
                Per-person rates
              </legend>

              <div className="mt-6 space-y-3">
                {tour.pricing.map((tier, i) => (
                  <label
                    key={tier.label}
                    className={cn(
                      "plate-inner flex cursor-pointer items-start gap-4 border p-5 transition-colors duration-300",
                      selected === i
                        ? "border-alpenglow bg-background"
                        : "hairline bg-background/60 hover:border-foreground/25"
                    )}
                  >
                    <input
                      type="radio"
                      name="pricing-tier"
                      checked={selected === i}
                      onChange={() => chooseTier(i)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1.5 size-3 shrink-0 rotate-45 transition-colors duration-300",
                        selected === i ? "bg-alpenglow" : "bg-border"
                      )}
                    />
                    <span className="flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="text-body font-medium">{tier.label}</span>
                        <span className="font-mono text-[1.5rem] leading-none tracking-[-0.03em]">
                          {priceLabel(tier.pricePerPerson, tier.currency)}
                        </span>
                      </span>
                      {tier.groupSizeRange && (
                        <span className="mt-2 flex items-center gap-2 font-mono text-micro uppercase tracking-[0.16em] text-muted-foreground">
                          <Users className="size-3.5" />
                          {tier.groupSizeRange.min}–{tier.groupSizeRange.max} travelers
                        </span>
                      )}
                      {tier.notes && (
                        <span className="mt-2 block text-body-sm text-muted-foreground">
                          {tier.notes}
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>

              <p className="mt-5 text-body-sm text-muted-foreground">
                Private departures and custom dates are available on any route — say so in
                the message and we&apos;ll quote it.
              </p>
            </fieldset>
          </Reveal>

          {/* Enquiry */}
          <Reveal delay={0.12} direction="left">
            {submitted ? (
              <div
                role="status"
                className="plate flex flex-col items-start gap-4 border bg-background p-10 hairline"
              >
                <CheckCircle2 className="size-9 text-alpenglow" />
                <p className="text-heading tracking-[-0.03em]">Request received</p>
                <p className="max-w-md text-body text-muted-foreground">
                  We&apos;ll write to {submittedEmail} within 24 hours to confirm dates and
                  answer anything outstanding. If it&apos;s urgent, WhatsApp is faster —{" "}
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-wipe text-alpenglow"
                  >
                    {siteConfig.whatsapp}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="plate grid gap-6 border bg-background p-6 hairline sm:grid-cols-2 sm:p-8"
              >
                <input type="hidden" {...register("tourSlug")} />
                <Honeypot />

                <Field
                  className="sm:col-span-2"
                  id="fullName"
                  label="Full name"
                  error={errors.fullName?.message}
                >
                  <Input id="fullName" autoComplete="name" placeholder="Jane Doe" {...register("fullName")} />
                </Field>

                <Field id="email" label="Email" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                </Field>

                <Field id="phone" label="Phone or WhatsApp" error={errors.phone?.message}>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 555 000 0000"
                    {...register("phone")}
                  />
                </Field>

                <Field
                  id="preferredDateStart"
                  label="Preferred start date"
                  hint={`This route runs ${tour.bestSeason}`}
                  error={errors.preferredDateStart?.message}
                >
                  <Input id="preferredDateStart" type="date" {...register("preferredDateStart")} />
                </Field>

                <Field
                  id="groupSize"
                  label="Group size"
                  hint={`Departures run ${tour.groupSize.min}–${tour.groupSize.max}`}
                  error={errors.groupSize?.message}
                >
                  <Input
                    id="groupSize"
                    type="number"
                    min={1}
                    max={20}
                    {...register("groupSize", { valueAsNumber: true })}
                  />
                </Field>

                <Field
                  className="sm:col-span-2"
                  id="message"
                  label="Anything we should know?"
                  hint="Fitness, dietary needs, date flexibility, questions"
                >
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="I've trekked to 4,000 m before but never on glacier…"
                    {...register("message")}
                  />
                </Field>

                {submitError && (
                  <p role="alert" className="text-body-sm text-destructive sm:col-span-2">
                    {submitError}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                    Request this departure
                  </Button>
                  <p className="text-body-sm text-muted-foreground">
                    or{" "}
                    <a
                      href={siteConfig.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-wipe text-alpenglow"
                    >
                      message us on WhatsApp
                    </a>
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

