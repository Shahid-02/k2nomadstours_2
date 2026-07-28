import type { Metadata } from "next";
import { Compass, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "K2 Nomads Tours: a globally respected adventure and expedition brand recognized for authenticity, trust, and ethical exploration in Pakistan.",
  alternates: { canonical: "/vision-mission" },
};

const pillars = [
  {
    icon: Compass,
    title: "Our Vision",
    text: "We envision K2 Nomads Tours as a globally respected adventure and expedition brand—recognized for authenticity, trust, and ethical exploration. Our vision is to reintroduce Pakistan to the world as a premier destination for responsible trekking, bike tours, and jeep safaris, where travelers experience raw beauty without compromise. We aim to build a future where exploration strengthens local economies, protects fragile ecosystems, and forges lifelong emotional connections between travelers and the world's most iconic mountain landscapes.",
  },
  {
    icon: HeartHandshake,
    title: "Our Mission",
    text: "At K2 Nomads Tours, we go beyond traditional travel to design deeply immersive trekking, mountaineering, bike tours, jeep safaris, cycling expeditions, and cultural journeys across the legendary landscapes of Pakistan's Karakoram, Himalaya, and Hindukush. Our mission is to deliver true nomadic experiences—where every route is thoughtfully crafted, every guide is locally rooted and professionally trained, and every journey reflects our commitment to safety, sustainability, and cultural respect. We strive to create adventures that not only challenge and inspire travelers, but also honor the land, empower mountain communities, and preserve heritage for future generations.",
  },
];

export default function VisionMissionPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Vision & Mission</h1>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.1}>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <pillar.icon className="size-5" />
              </span>
              <h2 className="font-heading text-lg font-semibold">{pillar.title}</h2>
              <p className="text-sm text-muted-foreground">{pillar.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
