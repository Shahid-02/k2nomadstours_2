import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Newsletter } from "@/components/shared/newsletter";
import { siteConfig, socialLinks } from "@/data/site";
import { SocialIcon } from "@/components/shared/social-icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with K2 Nomads Tours to plan your next journey across Pakistan.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Plan Your Journey</h1>
      <p className="mt-3 text-muted-foreground">
        Have a route in mind, or not sure where to start? Reach out and we&apos;ll help you build the right itinerary.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{siteConfig.email}</p>
          </div>
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium">WhatsApp</p>
            <p className="text-sm text-muted-foreground">{siteConfig.whatsapp}</p>
          </div>
        </a>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MapPin className="size-5" />
        </span>
        <div>
          <p className="text-sm font-medium">Based in</p>
          <p className="text-sm text-muted-foreground">Islamabad, Pakistan</p>
        </div>
      </div>

      <div className="mt-10 flex gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <SocialIcon platform={social.platform} className="size-4" />
          </a>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
        <p className="text-sm font-semibold">Join the newsletter</p>
        <p className="mt-1 text-sm text-muted-foreground">New routes and seasonal availability, straight to your inbox.</p>
        <Newsletter className="mt-4 max-w-sm" />
      </div>
    </div>
  );
}
