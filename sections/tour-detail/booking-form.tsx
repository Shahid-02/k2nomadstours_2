"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import { siteConfig } from "@/data/site";

export function BookingForm({ tourSlug, tourTitle }: { tourSlug: string; tourTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { tourSlug, groupSize: 2 },
  });

  async function onSubmit(values: BookingFormValues) {
    setSubmitError("");
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSubmittedEmail(values.email);
      setSubmitted(true);
      return;
    }
    const data = await res.json().catch(() => null);
    setSubmitError(
      data?.error ?? "Something went wrong sending your request. Please try WhatsApp or email instead."
    );
  }

  return (
    <section id="booking" className="scroll-mt-20 bg-secondary/40 py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Book {tourTitle}</h2>
          <p className="mt-2 text-muted-foreground">
            Send your details and we&apos;ll confirm availability within 24 hours. Prefer to talk first?{" "}
            <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
              Message us on WhatsApp
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
              <CheckCircle2 className="size-10 text-primary" />
              <p className="font-heading text-lg font-semibold">Request received</p>
              <p className="text-sm text-muted-foreground">
                Thank you — our team will reach out to {submittedEmail} shortly to confirm your dates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
              <input type="hidden" {...register("tourSlug")} />

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" {...register("fullName")} placeholder="Jane Doe" />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone / WhatsApp</Label>
                <Input id="phone" {...register("phone")} placeholder="+1 555 000 0000" />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="preferredDateStart">Preferred start date</Label>
                <Input id="preferredDateStart" type="date" {...register("preferredDateStart")} />
                {errors.preferredDateStart && <p className="text-xs text-destructive">{errors.preferredDateStart.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="groupSize">Group size</Label>
                <Input id="groupSize" type="number" min={1} max={20} {...register("groupSize", { valueAsNumber: true })} />
                {errors.groupSize && <p className="text-xs text-destructive">{errors.groupSize.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="message">Anything else we should know?</Label>
                <Textarea id="message" rows={4} {...register("message")} placeholder="Dietary needs, travel dates flexibility, questions..." />
              </div>

              {submitError && (
                <p className="text-sm text-destructive sm:col-span-2">{submitError}</p>
              )}

              <Button type="submit" size="lg" disabled={isSubmitting} className="sm:col-span-2">
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                Request Booking
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
