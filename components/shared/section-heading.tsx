import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

/**
 * Eyebrow: a map-legend label. The leading rule is not decoration — it anchors
 * the label to the same left edge as the headline beneath it, which is what
 * makes the survey-document grid legible at a glance.
 */
export function Eyebrow({
  children,
  className,
  rule = true,
  /**
   * `bright` is for eyebrows sitting on granite or over a photograph, where
   * the standard alpenglow is too dark to read against the scrim.
   */
  tone = "default",
  ruleWidth = "w-8",
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
  tone?: "default" | "bright";
  ruleWidth?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-muted-foreground", className)}>
      {rule && (
        <span
          aria-hidden="true"
          className={cn(
            "h-px",
            ruleWidth,
            tone === "bright" ? "bg-alpenglow-bright" : "bg-alpenglow"
          )}
        />
      )}
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "start",
  className,
  titleClassName,
  as = "h2",
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal duration={0.6}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal
        as={as}
        text={title}
        className={cn("mt-5 max-w-4xl text-title display-tight", titleClassName)}
      />
      {lede && (
        <Reveal delay={0.12} duration={0.8}>
          <p
            className={cn(
              "mt-5 max-w-xl text-lede text-muted-foreground",
              align === "center" && "mx-auto"
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
