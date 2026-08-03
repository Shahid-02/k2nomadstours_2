import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * The default is `["image/webp"]` alone. AVIF is tried first and falls
     * back to WebP, then to the source format, based on the request's Accept
     * header — so this changes only the bytes on the wire, never the markup.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
