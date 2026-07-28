import Link from "next/link";
import { Compass, Mail, MessageCircle } from "lucide-react";
import { SocialIcon } from "@/components/shared/social-icons";
import { Newsletter } from "@/components/shared/newsletter";
import { siteConfig, socialLinks, navigation } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight">
              <Compass className="size-6 text-primary" aria-hidden="true" />
              K2 Nomads Tours
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{siteConfig.description}</p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <SocialIcon platform={social.platform} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/treks" className="hover:text-foreground">Treks</Link></li>
              <li><Link href="/tours" className="hover:text-foreground">Tours</Link></li>
              <li><Link href="/cycling" className="hover:text-foreground">Cycling</Link></li>
              <li><Link href={navigation.vision.href} className="hover:text-foreground">Vision & Mission</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Support</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-foreground">
                  <Mail className="size-3.5" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
                  <MessageCircle className="size-3.5" /> {siteConfig.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Stay in the loop</p>
            <p className="mt-3 text-sm text-muted-foreground">
              New routes, seasonal dates, and travel notes from the field — no spam.
            </p>
            <Newsletter className="mt-4" />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} K2 Nomads Tours. All rights reserved.</p>
          <p>Designed & built for the modern nomadic traveler.</p>
        </div>
      </div>
    </footer>
  );
}
