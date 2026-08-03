"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Compass,
  Building2,
  Truck,
  Sun,
  Users,
  Mountain,
  Tent,
  Waves,
  MapPin,
  Footprints,
  Bike,
  Layers,
  Flame,
  ShieldCheck,
  Star,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/types/nav";

interface CategoryItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  href: string;
}

const CATEGORIES_BY_KEY: Record<string, CategoryItem[]> = {
  tour: [
    {
      icon: Building2,
      title: "Cultural & Heritage Tours",
      subtitle: "Explore history, culture & local traditions",
      href: "/tours",
    },
    {
      icon: Compass,
      title: "Adventure & Trekking Tours",
      subtitle: "High-altitude treks and adventure routes",
      href: "/tours",
    },
    {
      icon: Truck,
      title: "Off-Road & Overland Tours",
      subtitle: "Scenic drives through remote landscapes",
      href: "/tours",
    },
    {
      icon: Sun,
      title: "Seasonal & Special Tours",
      subtitle: "Best experiences for every season",
      href: "/tours",
    },
    {
      icon: Users,
      title: "Family & Group Tours",
      subtitle: "Perfect for families and group travelers",
      href: "/tours",
    },
  ],
  trek: [
    {
      icon: Mountain,
      title: "High Altitude & Glacier Treks",
      subtitle: "Glacier crossings & 8,000m peak base camps",
      href: "/treks",
    },
    {
      icon: Tent,
      title: "Base Camp Expeditions",
      subtitle: "Stand beneath K2, Nanga Parbat & Broad Peak",
      href: "/treks",
    },
    {
      icon: Waves,
      title: "Alpine Lakes & Meadows",
      subtitle: "Rush Lake, Fairy Meadows & Nagmah Valley",
      href: "/treks",
    },
    {
      icon: MapPin,
      title: "Remote Pass Crossings",
      subtitle: "Gondogoro La, Thalle La & Shimshal Passages",
      href: "/treks",
    },
    {
      icon: Footprints,
      title: "Short & Moderate Treks",
      subtitle: "Accessible alpine routes for keen hikers",
      href: "/treks",
    },
  ],
  cycling: [
    {
      icon: Bike,
      title: "Karakoram Highway Rides",
      subtitle: "Epic long-distance paved mountain routes",
      href: "/cycling",
    },
    {
      icon: Compass,
      title: "Off-Road & Mountain Biking",
      subtitle: "Rugged dirt trails through remote valleys",
      href: "/cycling",
    },
    {
      icon: Layers,
      title: "Mixed Bike & Trek Expeditions",
      subtitle: "Combine high-pass biking with alpine trekking",
      href: "/cycling",
    },
    {
      icon: Flame,
      title: "High Altitude Pass Challenges",
      subtitle: "Conquer Babusar & Khunjerab Pass (4,693m)",
      href: "/cycling",
    },
    {
      icon: ShieldCheck,
      title: "Fully Supported Expeditions",
      subtitle: "Dedicated support vehicles, mechanics & guides",
      href: "/cycling",
    },
  ],
};

const FOOTER_BY_KEY: Record<
  string,
  { customTitle: string; customSub: string; customHref: string }
> = {
  tour: {
    customTitle: "Custom Tours",
    customSub: "Plan a tour your way",
    customHref: "/contact?type=custom-tour",
  },
  trek: {
    customTitle: "Custom Treks",
    customSub: "Plan a trek your way",
    customHref: "/contact?type=custom-trek",
  },
  cycling: {
    customTitle: "Custom Rides",
    customSub: "Plan a ride your way",
    customHref: "/contact?type=custom-cycling",
  },
};

/**
 * Premium Mega Menu for Treks, Tours, and Cycling navigation.
 * Matches the dual-column card design with popular items, categories,
 * icons, hover animations, and action footer.
 */
export function MegaMenu({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  function show() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function hide(delay = 140) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), delay);
  }

  const popularItems = group.items.slice(0, 5);
  const categories = CATEGORIES_BY_KEY[group.key] ?? CATEGORIES_BY_KEY.tour;
  const footerConfig = FOOTER_BY_KEY[group.key] ?? FOOTER_BY_KEY.tour;

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
      onFocus={show}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) hide(0);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          (event.currentTarget.querySelector("button") as HTMLElement | null)?.focus();
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-body-sm font-medium transition-all duration-300",
          open
            ? "text-alpenglow-bright opacity-100"
            : "opacity-80 hover:opacity-100"
        )}
      >
        {group.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open && "rotate-180 text-alpenglow-bright"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full mt-3 z-50 w-[720px] -translate-x-1/2 rounded-2xl border border-neutral-200/80 bg-white text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden"
          >
            {/* Top triangle pointer */}
            <div className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rotate-45 border-l border-t border-neutral-200/80 bg-white" />

            <div className="relative z-10">
              {/* Main 2-column Grid */}
              <div className="grid grid-cols-2 divide-x divide-neutral-100 p-6 gap-6">
                {/* Left Column: Popular Items */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex size-6 items-center justify-center rounded-full bg-orange-100/80 text-orange-600">
                      <Sparkles className="size-3.5" />
                    </span>
                    <h3 className="text-sm font-bold tracking-tight text-neutral-900">
                      Popular {group.label}
                    </h3>
                  </div>

                  <ul className="space-y-1">
                    {popularItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-3 rounded-xl p-1.5 -mx-1.5 transition-colors hover:bg-neutral-50"
                        >
                          <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100 border border-neutral-100 shadow-xs">
                            <Image
                              src={item.image}
                              alt={item.imageAlt || item.label}
                              fill
                              sizes="56px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-neutral-800 transition-colors line-clamp-1 group-hover:text-orange-600">
                              {item.label}
                            </h4>
                            <p className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                              {item.duration} • {group.key.toUpperCase()}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 pt-2 border-t border-neutral-100">
                    <Link
                      href={group.href}
                      onClick={() => setOpen(false)}
                      className="group inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 transition-all hover:text-orange-700 hover:gap-2"
                    >
                      View all {group.label.toLowerCase()} →
                    </Link>
                  </div>
                </div>

                {/* Right Column: Browse by Category */}
                <div className="pl-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex size-6 items-center justify-center rounded-full bg-orange-100/80 text-orange-600">
                      <Layers className="size-3.5" />
                    </span>
                    <h3 className="text-sm font-bold tracking-tight text-neutral-900">
                      Browse by Category
                    </h3>
                  </div>

                  <ul className="space-y-1">
                    {categories.map((cat) => {
                      const CategoryIcon = cat.icon;
                      return (
                        <li key={cat.title}>
                          <Link
                            href={cat.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-neutral-50"
                          >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-50/80 text-orange-600 border border-orange-100/50">
                              <CategoryIcon className="size-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-neutral-800 transition-colors group-hover:text-orange-600">
                                {cat.title}
                              </h4>
                              <p className="text-[11px] text-neutral-500 line-clamp-1">
                                {cat.subtitle}
                              </p>
                            </div>
                            <ChevronRight className="size-4 shrink-0 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-600" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Bottom Footer Bar */}
              <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/80 px-6 py-3.5 text-xs">
                <Link
                  href={footerConfig.customHref}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-2.5 text-neutral-700 transition-colors hover:text-orange-600"
                >
                  <Star className="size-4 text-neutral-400 transition-colors group-hover:text-orange-600" />
                  <div>
                    <span className="block font-bold text-neutral-800 transition-colors group-hover:text-orange-600">
                      {footerConfig.customTitle}
                    </span>
                    <span className="block text-[11px] text-neutral-500 font-normal">
                      {footerConfig.customSub}
                    </span>
                  </div>
                </Link>

                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-2.5 text-neutral-700 transition-colors hover:text-orange-600"
                >
                  <MessageCircle className="size-4 text-neutral-400 transition-colors group-hover:text-orange-600" />
                  <div>
                    <span className="block font-bold text-neutral-800 transition-colors group-hover:text-orange-600">
                      Need help choosing?
                    </span>
                    <span className="block text-[11px] text-neutral-500 font-normal">
                      We&apos;re here to help you plan
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
