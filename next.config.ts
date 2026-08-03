import type { NextConfig } from "next";

/**
 * Content-Security-Policy ships in Report-Only first.
 *
 * Enforcing it blind would very likely break this site: framer-motion writes
 * inline `style` attributes on almost every animated element, the JSON-LD
 * blocks and Next's own bootstrap are inline scripts, and next/font injects
 * inline styles. All of those need `unsafe-inline` today. Report-Only lets
 * the violations be collected from real traffic before anything is enforced.
 */
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Only meaningful over HTTPS; browsers ignore it on plain HTTP.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  /** Stops advertising the framework and its version on every response. */
  poweredByHeader: false,

  images: {
    /**
     * The default is `["image/webp"]` alone. AVIF is tried first and falls
     * back to WebP, then to the source format, based on the request's Accept
     * header — so this changes only the bytes on the wire, never the markup.
     */
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
