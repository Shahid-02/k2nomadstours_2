import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { highlightIconMap } from "@/lib/icon-map";

export function TourHighlights({
  highlights,
  summary,
}: {
  highlights: { icon: string; text: string }[];
  summary: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">What Makes This a Nomadic Experience?</h2>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {highlights.map((highlight, i) => {
          const Icon = highlightIconMap[highlight.icon] ?? Sparkles;
          return (
            <Reveal key={highlight.text} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4.5" />
                </span>
                <p className="pt-1.5 text-sm">{highlight.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.3}>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{summary}</p>
      </Reveal>
    </section>
  );
}
