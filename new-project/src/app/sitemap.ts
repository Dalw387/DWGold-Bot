import type { MetadataRoute } from "next";
import { commercialSlugs } from "@/lib/commercial-pages";
import { TOOLS } from "@/lib/tools";

function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "",
    "/guide",
    "/sample",
    "/audit",
    "/tools",
    "/operations",
    "/concierge",
    "/proof",
    "/pay",
    ...commercialSlugs.map((slug) => `/${slug}`),
    ...TOOLS.map((tool) => `/tools/${tool.slug}`),
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
