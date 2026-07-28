import { Compass, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const pillars = [
  {
    icon: Compass,
    title: "Local, Expert Guides",
    text: "Every journey is led by guides who grew up in the regions we travel through — not scripted tour narration.",
  },
  {
    icon: HeartHandshake,
    title: "Small Groups, Real Connection",
    text: "We cap most groups at 4–10 travelers so you actually meet the communities you're passing through.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Planning",
    text: "Clear pricing, honest difficulty ratings, and detailed inclusions — no surprises once you're on the road.",
  },
  {
    icon: Sparkles,
    title: "Slow Travel, By Design",
    text: "Our itineraries favor depth over speed: fewer stops, more time to actually experience each one.",
  },
];

export function WhyK2() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Why Travel With Us</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">Built for the Modern Nomadic Traveler</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <pillar.icon className="size-5" />
                </span>
                <h3 className="font-heading text-lg font-semibold">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
