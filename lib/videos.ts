import fs from "fs";
import path from "path";
import type { TourVideo } from "@/types/tour";

export function getPublicVideos(): TourVideo[] {
  try {
    const videoDir = path.join(process.cwd(), "public", "video");
    if (!fs.existsSync(videoDir)) {
      return [{ src: "/video/hunza.mp4", title: "Hunza Expedition Footage" }];
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

    return videos.length > 0
      ? videos
      : [{ src: "/video/hunza.mp4", title: "Hunza Expedition Footage" }];
  } catch (error) {
    console.error("Error reading public/video directory:", error);
    return [{ src: "/video/hunza.mp4", title: "Hunza Expedition Footage" }];
  }
}
