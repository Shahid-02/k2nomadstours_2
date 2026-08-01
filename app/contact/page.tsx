import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { SocialIcon } from "@/components/shared/social-icons";
import { Newsletter } from "@/components/shared/newsletter";
import { EnquiryForm, type JourneyOption } from "@/sections/contact/enquiry-form";
import { siteConfig, socialLinks } from "@/data/site";
import { getToursByCategory } from "@/data/tours";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Plan a trek, tour or cycling journey across northern Pakistan with K2 Nomads Tours. WhatsApp, email, or send an enquiry and we'll reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.whatsapp,
    href: siteConfig.whatsappHref,
    note: "Fastest. Usually answered the same day, Pakistan time.",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    note: "Best for detailed itineraries, quotes and permits.",
    external: false,
  },
];

export default function ContactPage() {
  const journeys: JourneyOption[] = [
    ...getToursByCategory("trek").map((t) => ({ slug: t.slug, title: t.title, group: "Treks" })),
    ...getToursByCategory("tour").map((t) => ({ slug: t.slug, title: t.title, group: "Tours" })),
    ...getToursByCategory("cycling").map((t) => ({
      slug: t.slug,
      title: t.title,
      group: "Cycling",
    })),
  ];

  return (
    <>
      <PageMasthead
        eyebrow="Get in touch"
        title="Tell us where you want to stand"
        lede="Whether you have a route picked or only a fortnight in August and a vague idea about mountains, start here. A real person reads every message."
        size="compact"
        image={{
          src: "/images/optimized/baltistan-valley-aerial.jpg",
          alt: "Aerial view over a Baltistan valley at dusk",
        }}
      />

      <section className="bg-background py-section">
        <div className="shell grid gap-14 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Eyebrow>Direct lines</Eyebrow>
            </Reveal>

            <ul className="mt-8 border-t hairline">
              {CHANNELS.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-start gap-4 border-b py-6 transition-colors duration-300 hairline hover:text-alpenglow"
                  >
                    <channel.icon className="mt-1 size-4 shrink-0 text-alpenglow" />
                    <span className="min-w-0">
                      <span className="block font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
                        {channel.label}
                      </span>
                      <span className="mt-1.5 block truncate text-body font-medium">
                        {channel.value}
                      </span>
                      <span className="mt-1.5 block text-body-sm text-muted-foreground">
                        {channel.note}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-4 border-b py-6 hairline">
                <MapPin className="mt-1 size-4 shrink-0 text-alpenglow" />
                <span>
                  <span className="block font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
                    Based in
                  </span>
                  <span className="mt-1.5 block text-body font-medium">Islamabad, Pakistan</span>
                  <span className="mt-1.5 block text-body-sm text-muted-foreground">
                    Operating throughout Gilgit-Baltistan and Khyber Pakhtunkhwa.
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-4 border-b py-6 hairline">
                <Clock className="mt-1 size-4 shrink-0 text-alpenglow" />
                <span>
                  <span className="block font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
                    Reply time
                  </span>
                  <span className="mt-1.5 block text-body font-medium">Within 24 hours</span>
                  <span className="mt-1.5 block text-body-sm text-muted-foreground">
                    We&apos;re on PKT (UTC+5). Expedition season runs slower — guides are on
                    the mountain.
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`K2 Nomads Tours on ${social.platform}`}
                  className="flex size-11 items-center justify-center rounded-full border text-muted-foreground transition-colors hairline hover:border-alpenglow hover:text-alpenglow"
                >
                  <SocialIcon platform={social.platform} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <Eyebrow>Send an enquiry</Eyebrow>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <EnquiryForm journeys={journeys} />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="plate mt-10 border p-7 hairline">
                <p className="font-mono text-micro uppercase tracking-[0.22em] text-muted-foreground">
                  Field notes
                </p>
                <p className="mt-4 max-w-md text-body-sm text-muted-foreground">
                  Not ready to book? Get new routes and seasonal dates a few times a year.
                </p>
                <Newsletter className="mt-5 max-w-sm" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
