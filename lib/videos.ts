import fs from "fs";
import path from "path";
import type { TourVideo } from "@/types/tour";
import { FALLBACK_VIDEO } from "@/data/videos";

export function getPublicVideos(): TourVideo[] {
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

        return {
          src: `/video/${file}`,
          title: formattedTitle || "Expedition Video",
        };
      });

    return videos.length > 0 ? videos : [FALLBACK_VIDEO];
  } catch (error) {
    console.error("Error reading public/video directory:", error);
    return [FALLBACK_VIDEO];
  }
}
