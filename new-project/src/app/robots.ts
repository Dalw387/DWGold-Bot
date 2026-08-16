import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const sitemap = raw
    ? `${raw.replace(/\/$/, "")}/sitemap.xml`
    : undefined;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap,
  };
}
