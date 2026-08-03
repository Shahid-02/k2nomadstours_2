import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * A labelled form control.
 *
 * The error line replaces the hint rather than sitting beside it — both
 * occupy the same slot, so a field does not change height when it fails
 * validation and the form never reflows mid-submit.
 */
export function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="font-mono text-micro uppercase tracking-[0.16em]">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-body-sm text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-body-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
