import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge classifies an unrecognised `text-*` class as a colour, because
 * that is the safer default for a `text-brand`-style token. Our type scale uses
 * words rather than t-shirt sizes (`text-lede`, `text-heading`, `text-hero`),
 * so without this every `cn("text-body text-muted-foreground")` would silently
 * throw the size away and leave the element at 16px.
 *
 * Registering the scale explicitly makes size and colour independent again.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "micro",
            "label",
            "body",
            "body-sm",
            "lede",
            "heading",
            "title",
            "display",
            "hero",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
