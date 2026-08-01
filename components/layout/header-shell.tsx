"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Wordmark } from "@/components/layout/wordmark";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/types/nav";

const FLAT_LINKS = [
  { label: "Vision & Mission", href: "/vision-mission" },
  { label: "FAQ", href: "/faq" },
];

/**
 * Every page in this site opens on a granite masthead, so the header can
 * safely start transparent-over-dark and only assume a surface once the
 * masthead has scrolled past. One rule, no per-page configuration.
 */
export function HeaderShell({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setLifted(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      data-lifted={lifted || undefined}
      className={cn(
        // The bar is granite whatever is under it. A header that inverts with
        // each section reads as three different headers; keeping it dark also
        // means the alpenglow CTA sits on the same ground on every page.
        "group/header dark fixed inset-x-0 top-0 z-50 text-snow-50",
        "transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        lifted
          ? "border-b border-white/10 bg-granite-950/88 shadow-[0_10px_40px_-24px_oklch(0_0_0/0.9)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-white/10 bg-transparent"
      )}
    >
      <div className="shell-wide flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/"
          className="shrink-0 rounded-sm"
          aria-label={`${siteConfig.name} — home`}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {groups.map((group) => (
            <MegaMenu key={group.key} group={group} />
          ))}
          {FLAT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-body-sm font-medium transition-colors duration-300",
                pathname === link.href
                  ? "text-alpenglow-bright"
                  : "opacity-80 hover:opacity-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message K2 Nomads Tours on WhatsApp"
            className="hidden size-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-alpenglow-bright hover:text-alpenglow-bright sm:inline-flex"
          >
            <MessageCircle className="size-4" />
          </a>

          <Button
            nativeButton={false}
            size="default"
            className="hidden sm:inline-flex"
            render={<Link href="/contact" />}
          >
            Plan your journey
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="glass"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <MobileNav groups={groups} onNavigate={() => setMobileOpen(false)} />
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
