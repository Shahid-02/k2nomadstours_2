import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { SocialIcon } from "@/components/shared/social-icons";
import { Newsletter } from "@/components/shared/newsletter";
import { PeakMark } from "@/components/layout/wordmark";
import { Cta } from "@/components/shared/cta";
import { Eyebrow } from "@/components/shared/section-heading";
import { siteConfig, socialLinks } from "@/data/site";
import { getToursByCategory } from "@/data/tours";

export function Footer() {
  const columns = [
    {
      title: "Journeys",
      links: [
        { label: "Treks", href: "/treks", count: getToursByCategory("trek").length },
        { label: "Tours", href: "/tours", count: getToursByCategory("tour").length },
        { label: "Cycling", href: "/cycling", count: getToursByCategory("cycling").length },
        { label: "All journeys", href: "/#journeys", count: 0 },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Vision & Mission", href: "/vision-mission", count: 0 },
        { label: "FAQ", href: "/faq", count: 0 },
        { label: "Contact", href: "/contact", count: 0 },
      ],
    },
  ];

  return (
    <footer className="dark grain relative overflow-hidden bg-granite-950 text-snow-50">
      {/* Closing call. The last thing on every page is an invitation, not a sitemap. */}
      <div className="shell border-b border-white/10 py-section">
        <Eyebrow tone="bright" className="text-snow-50/55">
          Next departure
        </Eyebrow>
        <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl text-display display-tight">
            Tell us where you want to stand, and we&apos;ll build the route to it.
          </h2>
          <Cta href="/contact" size="xl" className="self-start lg:self-auto">
            Plan your journey
          </Cta>
        </div>
      </div>

      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <PeakMark className="size-7" />
            <span className="font-display text-heading tracking-[-0.03em]">K2 Nomads Tours</span>
          </Link>
          <p className="mt-4 max-w-xs text-body-sm text-snow-50/60">
            Locally led trekking, cycling and cultural expeditions across the Karakoram,
            Himalaya and Hindukush.
          </p>
          <p className="mt-5 flex items-center gap-2 font-mono text-micro uppercase tracking-[0.18em] text-snow-50/60">
            <MapPin className="size-3.5" /> Islamabad · Gilgit-Baltistan · Pakistan
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-snow-50/60">
              {column.title}
            </p>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-baseline gap-2 text-body-sm text-snow-50/75 transition-colors hover:text-snow-50"
                  >
                    <span className="link-wipe">{link.label}</span>
                    {link.count > 0 && (
                      <span className="font-mono text-micro tracking-[0.16em] text-snow-50/55">
                        {String(link.count).padStart(2, "0")}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className="font-mono text-micro uppercase tracking-[0.22em] text-snow-50/60">
            Field notes
          </p>
          <p className="mt-5 text-body-sm text-snow-50/65">
            New routes, seasonal dates and dispatches from the valleys. A few emails a year,
            never a newsletter treadmill.
          </p>
          <Newsletter className="mt-5" />

          <div className="mt-8 space-y-3 font-mono text-micro uppercase tracking-[0.16em] text-snow-50/60">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 transition-colors hover:text-alpenglow-bright"
            >
              <MessageCircle className="size-3.5" /> {siteConfig.whatsapp}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 normal-case tracking-[0.06em] transition-colors hover:text-alpenglow-bright"
            >
              <Mail className="size-3.5" /> {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`K2 Nomads Tours on ${social.platform}`}
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-snow-50/60 transition-colors hover:border-alpenglow-bright hover:text-alpenglow-bright"
            >
              <SocialIcon platform={social.platform} className="size-4" />
            </a>
          ))}
        </div>
        <p className="font-mono text-micro uppercase tracking-[0.16em] text-snow-50/60">
          © {new Date().getFullYear()} K2 Nomads Tours · All rights reserved
        </p>
      </div>
    </footer>
  );
}
