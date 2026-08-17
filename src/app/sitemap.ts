import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CAREERS } from "@/data/careers";
import { DEGREE_GROUPS } from "@/data/pivots";

const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.9, changeFrequency: "weekly" },
  { path: "/quiz", priority: 0.9, changeFrequency: "monthly" },
  { path: "/check", priority: 0.9, changeFrequency: "monthly" },
  { path: "/saved", priority: 0.5, changeFrequency: "monthly" },
  { path: "/roadmap", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pivot", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const careerUrls: MetadataRoute.Sitemap = CAREERS.map((c) => ({
    url: `${SITE_URL}/careers/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const pivotUrls: MetadataRoute.Sitemap = DEGREE_GROUPS.map((g) => ({
    url: `${SITE_URL}/pivot/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const shareUrls: MetadataRoute.Sitemap = ["science", "art", "commercial"].map((stream) => ({
    url: `${SITE_URL}/s/${stream}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [...staticUrls, ...careerUrls, ...pivotUrls, ...shareUrls];
}
