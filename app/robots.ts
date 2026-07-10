import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    host: getSiteUrl(),
    rules: [
      {
        allow: ["/"],
        disallow: ["/admin", "/api", "/login"],
        userAgent: "*",
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
