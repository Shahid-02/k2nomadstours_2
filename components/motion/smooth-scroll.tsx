"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling, tuned for long editorial pages: enough inertia that
 * a flick carries you through a chapter, not so much that a keyboard user
 * loses track of where the focus ring went.
 *
 * Disabled outright under `prefers-reduced-motion` — scroll hijacking is the
 * single most common trigger for motion sickness on sites like this one.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      // Native scrolling on touch: mobile browsers already do this well, and
      // hijacking it costs battery and breaks pull-to-refresh.
      syncTouch: false,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Keep in-page anchors (#itinerary, #booking) working through Lenis.
    function onAnchorClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"], a[href*="/#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.hash;
      if (!hash || hash.length < 2) return;
      if (anchor.pathname !== window.location.pathname) return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -88 });
      window.history.pushState(null, "", hash);
    }

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
