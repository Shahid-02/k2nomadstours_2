import type { TourVideo } from "@/types/tour";

/**
 * Shown when a tour names no video of its own and the filesystem scan in
 * `lib/videos.ts` finds nothing usable.
 *
 * It lives here rather than beside that scan because the gallery is a client
 * component: `lib/videos.ts` imports `fs` and `path`, so importing the
 * constant from there would drag Node builtins into the browser bundle.
 */
export const FALLBACK_VIDEO: TourVideo = {
  src: "/video/hunza.mp4",
  title: "Hunza Expedition Footage",
};
