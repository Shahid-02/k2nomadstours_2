import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";

/**
 * A deliberately image-free band between two heavy visual sections.
 *
 * Two ruled columns, set on granite: what you will actually do, and who this
 * trip suits. "Ideal for" is the honest half — it exists so the wrong traveler
 * can rule themselves out here rather than at 4,700 m.
 */
export function ExperienceDetails({
  experiencesIncluded,
  idealFor,
}: {
  experiencesIncluded: string[];
  idealFor: string[];
}) {
  const columns = [
    {
      eyebrow: "On this journey",
      title: "What you'll actually do",
      items: experiencesIncluded,
    },
    {
      eyebrow: "Honest fit",
      title: "Who this trip suits",
      items: idealFor,
    },
  ];

  return (
    <section className="dark grain relative bg-granite-950 py-section text-snow-50">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
        {columns.map((column, columnIndex) => (
          <div key={column.title}>
            <Reveal delay={columnIndex * 0.08}>
              <Eyebrow className="text-snow-50/55">{column.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-title display-tight">{column.title}</h2>
            </Reveal>

            <RevealGroup
              className="mt-9 border-t border-white/12"
              stagger={0.06}
              as="ul"
            >
              {column.items.map((item, i) => (
                <RevealItem
                  key={item}
                  as="li"
                  className="flex items-baseline gap-5 border-b border-white/12 py-4"
                >
                  <span className="shrink-0 font-mono text-micro tabular-nums tracking-[0.16em] text-alpenglow-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body text-snow-50/80">{item}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}
