"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Counter } from "@/components/motion/counter";
import { Eyebrow } from "@/components/shared/section-heading";
import { TextLink } from "@/components/shared/cta";

/**
 * The positioning statement, set as one long editorial line rather than a grid
 * of feature cards. Nothing else is on screen, so the sentence has to carry
 * the section — which is the point: it is the argument for the whole company.
 *
 * The counters underneath are the proof, and every figure is checkable.
 */
const PROOF = [
  { value: 21, prefix: "", suffix: "", label: "Journeys in the catalogue", note: "Treks, tours and cycling" },
  { value: 8611, prefix: "", suffix: " m", label: "The peak you walk under", note: "K2 Base Camp itself sits at 5,150 m" },
  { value: 14, prefix: "", suffix: "", label: "Days on glacier", note: "On the K2 Base Camp route alone" },
  { value: 10, prefix: "≤", suffix: "", label: "Travelers per departure", note: "Most groups run 4 to 8" },
];

export function Statement() {
  return (
    <section className="bg-background py-section">
      <div className="shell">
        <Reveal>
          <Eyebrow>Why we exist</Eyebrow>
        </Reveal>

        <TextReveal
          as="h2"
          text="Most operators sell Pakistan as a checklist. We sell the walk between the checkpoints — the glacier days, the tea in Askole, the porters who know the ice better than any map."
          className="mt-8 max-w-5xl text-title display-tight font-normal"
          stagger={0.02}
        />

        <Reveal delay={0.15}>
          <TextLink href="/vision-mission" className="mt-9 text-alpenglow">
            How we work
          </TextLink>
        </Reveal>

        <RevealGroup
          className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.09}
        >
          {PROOF.map((item) => (
            <RevealItem key={item.label} className="border-t pt-6 hairline">
              <p className="font-mono text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.03em]">
                <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
              </p>
              <p className="mt-4 text-body-sm font-medium">{item.label}</p>
              <p className="mt-1.5 text-body-sm text-muted-foreground">{item.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
