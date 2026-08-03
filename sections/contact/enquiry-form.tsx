"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/shared/field";
import { Honeypot, readHoneypot } from "@/components/shared/honeypot";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import { siteConfig } from "@/data/site";

export interface JourneyOption {
  slug: string;
  title: string;
  group: string;
}

/**
 * General enquiry.
 *
 * The contact page previously offered links and nothing to fill in, which
 * pushes every "I'm interested but not sure which trip" visitor into writing a
 * cold email — the highest-friction path there is. Naming a journey is
 * optional: "Still deciding" is the default, and answering that is exactly the
 * conversation this company is good at.
 */
export function EnquiryForm({ journeys }: { journeys: JourneyOption[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { tourSlug: "general-enquiry", groupSize: 2 },
  });

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

  const groups = Array.from(new Set(journeys.map((j) => j.group)));

  if (submitted) {
    return (
      <div
        role="status"
        className="plate flex flex-col items-start gap-4 border bg-card p-10 hairline"
      >
        <CheckCircle2 className="size-9 text-alpenglow" />
        <p className="text-heading tracking-[-0.03em]">Message sent</p>
        <p className="max-w-md text-body text-muted-foreground">
          We&apos;ll reply to {submittedEmail} within 24 hours. If it&apos;s time-sensitive,
          WhatsApp is faster —{" "}
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
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="plate grid gap-6 border bg-card p-6 hairline sm:grid-cols-2 sm:p-8"
    >
      <Honeypot />

      <Field
        className="sm:col-span-2"
        id="tourSlug"
        label="Which journey?"
        hint="Pick one, or leave it as “Still deciding” and we'll suggest routes."
      >
        <select
          id="tourSlug"
          {...register("tourSlug")}
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-body-sm outline-none transition-colors focus-visible:border-ring"
        >
          <option value="general-enquiry">Still deciding</option>
          {groups.map((group) => (
            <optgroup key={group} label={group}>
              {journeys
                .filter((journey) => journey.group === group)
                .map((journey) => (
                  <option key={journey.slug} value={journey.slug}>
                    {journey.title}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </Field>

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
        <Input id="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" {...register("phone")} />
      </Field>

      <Field
        id="preferredDateStart"
        label="Roughly when?"
        hint="An approximate date is fine"
        error={errors.preferredDateStart?.message}
      >
        <Input id="preferredDateStart" type="date" {...register("preferredDateStart")} />
      </Field>

      <Field
        id="groupSize"
        label="How many of you?"
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
        label="What do you want out of the trip?"
        hint="Fitness, previous altitude, what you're hoping to see"
      >
        <Textarea
          id="message"
          rows={5}
          placeholder="We're two friends with a fortnight in August, comfortable at 4,000 m…"
          {...register("message")}
        />
      </Field>

      {submitError && (
        <p role="alert" className="text-body-sm text-destructive sm:col-span-2">
          {submitError}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Send this to the team
        </Button>
      </div>
    </form>
  );
}

