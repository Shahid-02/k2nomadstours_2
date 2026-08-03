"use client";

import { useCallback, type KeyboardEvent } from "react";

/**
 * The keyboard half of the ARIA tabs pattern.
 *
 * `role="tablist"` promises arrow-key navigation: once focus is inside the
 * list, Tab leaves it and Left/Right move between tabs. Without that a screen
 * reader announces "tab, 1 of 5" and then the arrow keys do nothing, which is
 * worse than having used plain buttons.
 *
 * Pair with a roving tabindex — the selected tab is the only one at `0`.
 */
export function useTabListKeys(
  count: number,
  index: number,
  select: (next: number) => void
) {
  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (count < 2) return;
      let next: number;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = (index + 1) % count;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = (index - 1 + count) % count;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = count - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      select(next);
      const tabs = event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]');
      tabs[next]?.focus();
    },
    [count, index, select]
  );
}
