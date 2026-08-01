"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, Minus, Plus } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/shared/social-icons";
import { siteConfig, socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/types/nav";

const FLAT_LINKS = [
  { label: "Vision & Mission", href: "/vision-mission" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/**
 * Mobile navigation.
 *
 * Twenty-one journeys will not fit on a phone screen as a flat list, so the
 * categories collapse. Each group stays shut until asked for, which keeps the
 * whole menu inside one thumb's reach instead of three screens of scrolling.
 */
export function MobileNav({
  groups,
  onNavigate,
}: {
  groups: NavGroup[];
  onNavigate: () => void;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <SheetContent
      side="right"
      // The base sheet ships `w-3/4`; on a phone that leaves a useless sliver of
      // page showing and squeezes twelve trek names into 290px.
      className="dark border-l-0 bg-granite-950 p-0 text-snow-50 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
    >
      <SheetHeader className="border-b border-white/10 px-gutter py-5">
        <SheetTitle className="font-display text-heading tracking-[-0.03em]">
          K2 Nomads Tours
        </SheetTitle>
        <SheetDescription className="font-mono text-micro uppercase tracking-[0.22em] text-snow-50/50">
          Karakoram · Himalaya · Hindukush
        </SheetDescription>
      </SheetHeader>

      <div className="flex h-full flex-col overflow-y-auto px-gutter pb-10">
        <nav aria-label="Mobile" className="pt-2">
          {groups.map((group) => {
            const open = openKey === group.key;
            return (
              <div key={group.key} className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <Link
                    href={group.href}
                    onClick={onNavigate}
                    className="flex-1 py-5 font-display text-heading tracking-[-0.03em]"
                  >
                    {group.label}
                    <span className="ml-2.5 align-super font-mono text-micro tracking-[0.2em] text-alpenglow-bright">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </Link>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-label={`${open ? "Hide" : "Show"} all ${group.label.toLowerCase()}`}
                    onClick={() => setOpenKey(open ? null : group.key)}
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 text-snow-50/70 transition-colors hover:border-white/35 hover:text-snow-50"
                  >
                    {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      {group.items.map((item, i) => (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 + i * 0.025, duration: 0.35 }}
                        >
                          <Link
                            href={item.href}
                            onClick={onNavigate}
                            className="flex items-baseline justify-between gap-3 border-t border-white/[0.07] py-3 text-body-sm text-snow-50/75"
                          >
                            <span>{item.label}</span>
                            <span className="shrink-0 font-mono text-micro uppercase tracking-[0.14em] text-snow-50/60">
                              {item.duration}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                      <li className="pb-4 pt-3">
                        <Link
                          href={group.href}
                          onClick={onNavigate}
                          className="font-mono text-micro uppercase tracking-[0.2em] text-alpenglow-bright"
                        >
                          View all {group.label.toLowerCase()} →
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {FLAT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="block border-b border-white/10 py-5 font-display text-heading tracking-[-0.03em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          nativeButton={false}
          size="lg"
          className="mt-8 w-full"
          render={<Link href="/contact" onClick={onNavigate} />}
        >
          Plan your journey
        </Button>

        <div className="mt-8 flex flex-col gap-3 font-mono text-micro uppercase tracking-[0.16em] text-snow-50/55">
          <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
            <MessageCircle className="size-3.5" /> {siteConfig.whatsapp}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 normal-case tracking-[0.08em]">
            <Mail className="size-3.5" /> {siteConfig.email}
          </a>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border border-white/15",
                "text-snow-50/65 transition-colors hover:border-alpenglow-bright hover:text-alpenglow-bright"
              )}
            >
              <SocialIcon platform={social.platform} className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </SheetContent>
  );
}
