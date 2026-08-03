import type { ReactNode } from "react";
import { ParallaxImage } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { TextRevealOnLoad } from "@/components/motion/text-reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

/**
 * Every page opens on granite.
 *
 * That is a system decision, not a stylistic one: because the first screen is
 * always dark, the header can start transparent everywhere and only take a
 * surface once you have scrolled past the masthead. One rule, no per-route
 * configuration, no flash of unreadable navigation.
 */
export function PageMasthead({
  eyebrow,
  title,
  lede,
  image,
  facts,
  children,
  size = "default",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  image?: { src: string; alt: string };
  facts?: { label: string; value: string }[];
  children?: ReactNode;
  size?: "default" | "compact";
}) {
  return (
    <section
      className={cn(
        "dark grain relative flex flex-col justify-end overflow-hidden bg-granite-950 text-snow-50",
        size === "compact" ? "min-h-[58svh]" : "min-h-[72svh]"
      )}
    >
      {image ? (
        <ParallaxImage
          src={image.src}
          alt={image.alt}
          priority
          strength={0.14}
          className="absolute inset-0"
          sizes="100vw"
        >
          <div className="scrim absolute inset-0" />
        </ParallaxImage>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,var(--granite-800),var(--granite-950)_65%)]"
        />
      )}

      <div className="shell relative pb-14 pt-32 sm:pb-16 lg:pb-20">
        <Reveal duration={0.7} direction="none">
          <Eyebrow tone="bright" className="text-snow-50/65">
            {eyebrow}
          </Eyebrow>
        </Reveal>

        <TextRevealOnLoad
          as="h1"
          text={title}
          delay={0.15}
          className="mt-6 max-w-[18ch] text-display display-tight font-semibold"
        />

        {lede && (
          <Reveal delay={0.35} duration={0.9}>
            <p className="mt-6 max-w-2xl text-lede text-snow-50/75">{lede}</p>
          </Reveal>
        )}

        {facts && facts.length > 0 && (
          <Reveal delay={0.45}>
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-micro uppercase tracking-[0.18em] text-snow-50/50">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-body-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {children}
      </div>
    </section>
  );
}
