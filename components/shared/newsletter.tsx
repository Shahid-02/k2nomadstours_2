"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations/booking";
import { cn } from "@/lib/utils";

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
      <p className={cn("flex items-center gap-2 text-sm text-primary", className)}>
        <Check className="size-4" /> You&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-2", className)} noValidate>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          {...register("email")}
        />
        <Button type="submit" size="icon" disabled={isSubmitting} aria-label="Subscribe">
          <Send className="size-4" />
        </Button>
      </div>
      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
    </form>
  );
}
