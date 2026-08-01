import type { Metadata } from "next";
import { PageMasthead } from "@/components/layout/page-masthead";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { TextReveal } from "@/components/motion/text-reveal";
import { Cta } from "@/components/shared/cta";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "K2 Nomads Tours exists to reintroduce Pakistan as a destination for responsible trekking and expedition travel — routes that strengthen mountain economies and protect fragile ground.",
  alternates: { canonical: "/vision-mission" },
};

/**
 * Two long statements. Set as a magazine feature rather than two boxed cards:
 * a sticky label on the left, one measure of text on the right, and a pull
 * quote lifted from the statement itself to break the wall.
 *
 * The copy is the company's own, unchanged — only the typography is doing the
 * new work.
 */
const STATEMENTS = [
  {
    label: "Vision",
    index: "01",
    pull: "Exploration that strengthens local economies and protects fragile ground.",
    body: "We envision K2 Nomads Tours as a globally respected adventure and expedition brand—recognized for authenticity, trust, and ethical exploration. Our vision is to reintroduce Pakistan to the world as a premier destination for responsible trekking, bike tours, and jeep safaris, where travelers experience raw beauty without compromise. We aim to build a future where exploration strengthens local economies, protects fragile ecosystems, and forges lifelong emotional connections between travelers and the world's most iconic mountain landscapes.",
  },
  {
    label: "Mission",
    index: "02",
    pull: "Every route thoughtfully crafted. Every guide locally rooted and professionally trained.",
    body: "At K2 Nomads Tours, we go beyond traditional travel to design deeply immersive trekking, mountaineering, bike tours, jeep safaris, cycling expeditions, and cultural journeys across the legendary landscapes of Pakistan's Karakoram, Himalaya, and Hindukush. Our mission is to deliver true nomadic experiences—where every route is thoughtfully crafted, every guide is locally rooted and professionally trained, and every journey reflects our commitment to safety, sustainability, and cultural respect. We strive to create adventures that not only challenge and inspire travelers, but also honor the land, empower mountain communities, and preserve heritage for future generations.",
  },
];

const COMMITMENTS = [
  {
    title: "Local crews, fairly paid",
    body: "Guides, porters, cooks and drivers are hired from the valleys the route passes through, at rates set with them rather than for them.",
  },
  {
    title: "Leave the ground as found",
    body: "Waste comes off the glacier with us. Camps rotate so no meadow takes the load twice in a season.",
  },
  {
    title: "Permits and paperwork handled",
    body: "Restricted-zone permits, NOCs and liaison arrangements are managed before you land, not improvised in Skardu.",
  },
  {
    title: "Honest ratings, honest turnarounds",
    body: "Difficulty is graded conservatively, and a guide who calls a weather turnaround is backed by us, not overruled.",
  },
];

export default function VisionMissionPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Who we are"
        title="Why we run these routes the way we do"
        lede="K2 Nomads Tours is a Pakistani expedition company. Our vision and mission, in full, and what they mean on the ground."
        size="compact"
        image={{
          src: "/images/optimized/wakhi-elder-shimshal.jpg",
          alt: "A Wakhi elder from Shimshal in the upper Hunza valley",
        }}
      />

      {STATEMENTS.map((statement, i) => (
        <section
          key={statement.label}
          className={i % 2 === 1 ? "bg-muted py-section" : "bg-background py-section"}
        >
          <div className="shell grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <p className="font-mono text-micro uppercase tracking-[0.24em] text-alpenglow">
                  {statement.index}
                </p>
                <h2 className="mt-4 text-title display-tight">{statement.label}</h2>
              </Reveal>
            </div>

            <div>
              <TextReveal
                text={statement.pull}
                as="p"
                stagger={0.03}
                className="max-w-2xl border-l-2 border-alpenglow pl-6 font-display text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.25] tracking-[-0.03em]"
              />
              <Reveal delay={0.15}>
                <p className="mt-10 max-w-2xl text-lede leading-[1.65] text-muted-foreground">
                  {statement.body}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="dark grain relative bg-granite-950 py-section text-snow-50">
        <div className="shell">
          <Eyebrow className="text-snow-50/55">In practice</Eyebrow>
          <TextReveal
            text="Four commitments that outlast any brochure"
            className="mt-6 max-w-2xl text-title display-tight"
          />

          <RevealGroup className="mt-14 grid gap-x-14 gap-y-10 sm:grid-cols-2" stagger={0.08}>
            {COMMITMENTS.map((item) => (
              <RevealItem key={item.title} className="border-t border-white/12 pt-6">
                <h3 className="text-heading leading-tight tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-4 max-w-md text-body text-snow-50/70">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <Cta href="/#journeys" size="xl" className="mt-14">
              See the journeys
            </Cta>
          </Reveal>
        </div>
      </section>
    </>
  );
}
