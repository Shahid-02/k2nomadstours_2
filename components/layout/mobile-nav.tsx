"use client";

import Link from "next/link";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  treks: NavItem[];
  tours: NavItem[];
  cycling: NavItem[];
  onNavigate: () => void;
}

function NavGroup({ title, items, onNavigate }: { title: string; items: NavItem[]; onNavigate: () => void }) {
  return (
    <div>
      <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      <div className="mt-1 flex flex-col">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="rounded-lg px-1 py-2 text-sm transition-colors hover:bg-muted"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileNav({ treks, tours, cycling, onNavigate }: MobileNavProps) {
  return (
    <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-sm">
      <SheetHeader>
        <SheetTitle>K2 Nomads Tours</SheetTitle>
        <SheetDescription>Nomadic & cultural journeys across Pakistan</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-5 px-4 pb-6">
        <Link href="/#popular-journeys" onClick={onNavigate} className="text-sm font-medium">
          Popular Journeys
        </Link>
        <Separator />
        <NavGroup title="Treks" items={treks} onNavigate={onNavigate} />
        <NavGroup title="Tours" items={tours} onNavigate={onNavigate} />
        <NavGroup title="Cycling" items={cycling} onNavigate={onNavigate} />
        <Separator />
        <Link href="/vision-mission" onClick={onNavigate} className="text-sm font-medium">
          Vision & Mission
        </Link>
        <Link href="/faq" onClick={onNavigate} className="text-sm font-medium">
          FAQ
        </Link>
        <a
          href="https://blog.k2nomadstours.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium"
        >
          Blog
        </a>
        <Link href="/contact" onClick={onNavigate} className="text-sm font-medium text-primary">
          Plan Your Journey
        </Link>
      </div>
    </SheetContent>
  );
}
