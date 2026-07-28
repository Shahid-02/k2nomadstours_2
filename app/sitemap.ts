import type { MetadataRoute } from "next";
import { getAllTours, tourHref } from "@/data/tours";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/tours`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/treks`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/cycling`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/vision-mission`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const tourRoutes: MetadataRoute.Sitemap = getAllTours().map((tour) => ({
    url: `${siteConfig.url}${tourHref(tour)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...tourRoutes];
}
