"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { getToursByCategory, tourHref } from "@/data/tours";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const treks = getToursByCategory("trek").map((t) => ({ label: t.title, href: tourHref(t) }));
  const tours = getToursByCategory("tour").map((t) => ({ label: t.title, href: tourHref(t) }));
  const cycling = getToursByCategory("cycling").map((t) => ({ label: t.title, href: tourHref(t) }));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight">
          <Compass className="size-6 text-primary" aria-hidden="true" />
          K2 Nomads Tours
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/#popular-journeys"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            Popular Journeys
          </Link>
          <NavDropdown label="Treks" href="/treks" items={treks} />
          <NavDropdown label="Tours" href="/tours" items={tours} />
          <NavDropdown label="Cycling" href="/cycling" items={cycling} />
          <Link
            href="/vision-mission"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            Vision & Mission
          </Link>
          <Link
            href="/faq"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            FAQ
          </Link>
          {/* <a
            href="https://blog.k2nomadstours.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            Blog
          </a> */}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" nativeButton={false} render={<Link href="/contact" />}>
            Plan Your Journey
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <MobileNav treks={treks} tours={tours} cycling={cycling} onNavigate={() => setMobileOpen(false)} />
          </Sheet>
        </div>
      </div>
    </header>
  );
}
