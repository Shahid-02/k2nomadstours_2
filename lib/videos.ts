import fs from "fs";
import path from "path";
import { cache } from "react";
import type { TourVideo } from "@/types/tour";
import { FALLBACK_VIDEO } from "@/data/videos";

/**
 * Memoised per request/render pass. The scan is identical for all 21 tour
 * pages, and `lib/tour-page.tsx` calls it from inside the page component —
 * so without this it is synchronous disk I/O repeated on every render, and
 * would sit on the request path the moment any tour route stops being static.
 */
export const getPublicVideos = cache((): TourVideo[] => {
  try {
    const videoDir = path.join(process.cwd(), "public", "video");
    if (!fs.existsSync(videoDir)) {
      return [FALLBACK_VIDEO];
    }

    const files = fs.readdirSync(videoDir);
    // Prioritize web-compatible formats (.mp4, .webm, .m4v, .mov)
    const videoExtensions = [".mp4", ".webm", ".m4v", ".mov"];

    const videos = files
      .filter((file) => !file.startsWith(".") && videoExtensions.includes(path.extname(file).toLowerCase()))
      .map((file) => {
        const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const formattedTitle = nameWithoutExt
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        // Convention: `hunza.mp4` is postered by `hunza-poster.jpg` sitting
        // beside it. Without this the scan branch returns posterless videos
        // and FALLBACK_VIDEO's poster is only ever seen when public/video is
        // missing entirely — which is never, in practice.
        const posterFile = `${nameWithoutExt}-poster.jpg`;
        const poster = files.includes(posterFile) ? `/video/${posterFile}` : undefined;

        return {
          src: `/video/${file}`,
          title: formattedTitle || "Expedition Video",
          ...(poster ? { poster } : {}),
        };
      });

    return videos.length > 0 ? videos : [FALLBACK_VIDEO];
  } catch (error) {
    console.error("Error reading public/video directory:", error);
    return [FALLBACK_VIDEO];
  }
});
