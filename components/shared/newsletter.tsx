"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations/booking";
import { cn } from "@/lib/utils";

/**
 * A ruled line rather than a boxed input — it sits inside editorial layouts
 * without dragging a form widget into them. The rule turns alpenglow on focus,
 * which is the same signal every other focusable thing on the site uses.
 */
export function Newsletter({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <p
        role="status"
        className={cn("flex items-center gap-2 text-body-sm text-alpenglow-bright", className)}
      >
        <Check className="size-4" /> You&apos;re on the list. Field notes, a few times a year.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full", className)} noValidate>
      <div className="group/nl relative flex items-center gap-3 border-b border-current/25 py-2.5 transition-colors focus-within:border-alpenglow-bright">
        <input
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          aria-invalid={errors.email ? true : undefined}
          className="min-w-0 flex-1 bg-transparent text-body-sm outline-none placeholder:text-current/40"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Subscribe to the newsletter"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-current/25 transition-colors hover:border-alpenglow-bright hover:bg-alpenglow-bright hover:text-granite-950 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </div>
      {errors.email && (
        <p className="mt-2 text-body-sm text-destructive">{errors.email.message}</p>
      )}
    </form>
  );
}
