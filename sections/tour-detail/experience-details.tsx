import { Sparkle, UserCheck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export function ExperienceDetails({
  experiencesIncluded,
  idealFor,
}: {
  experiencesIncluded: string[];
  idealFor: string[];
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 sm:grid-cols-2">
        <Reveal>
          <h2 className="flex items-center gap-2 font-heading text-xl font-semibold">
            <Sparkle className="size-5 text-primary" />
            Experiences Included
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {experiencesIncluded.map((item) => (
              <li key={item} className="border-b border-border pb-2.5">{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="flex items-center gap-2 font-heading text-xl font-semibold">
            <UserCheck className="size-5 text-primary" />
            Ideal For
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {idealFor.map((item) => (
              <li key={item} className="border-b border-border pb-2.5">{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
