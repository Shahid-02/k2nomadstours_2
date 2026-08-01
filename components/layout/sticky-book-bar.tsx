"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fromPrice, durationLabel } from "@/lib/format";
import { siteConfig } from "@/data/site";
import type { Tour } from "@/types/tour";

/**
 * Mobile booking dock.
 *
 * Carries the price and the length of the trip, not just a verb — on a phone
 * the pricing table is a long way up the page, and asking someone to commit
 * without restating the number is how you lose them. Desktop gets the sticky
 * rail in the Reserve section instead, so this stays out of the way there.
 */
export function StickyBookBar({ tour }: { tour: Tour }) {
  const [visible, setVisible] = useState(false);
  const price = fromPrice(tour);

  useEffect(() => {
    function onScroll() {
      const nearFoot =
        window.scrollY + window.innerHeight > document.body.scrollHeight - 420;
      setVisible(window.scrollY > 520 && !nearFoot);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="dark fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-white/10 bg-granite-950/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-snow-50 backdrop-blur-xl lg:hidden"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-micro uppercase tracking-[0.16em] text-snow-50/50">
              {durationLabel(tour.durationDays)}
            </p>
            <p className="truncate text-body-sm font-medium">
              {price ? `From ${price.label} per person` : tour.title}
            </p>
          </div>
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ask about this trip on WhatsApp"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-snow-50/80"
          >
            <MessageCircle className="size-4" />
          </a>
          <Button nativeButton={false} size="default" render={<a href="#reserve" />}>
            Check dates
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
