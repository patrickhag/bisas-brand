import type { Metadata } from "next";

export const siteName = "Boraland";
export const siteDescription =
  "Engineer-led construction oversight, client representation, and project management in Rwanda.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function createPageMetadata({
  description,
  image = "/images/boraland-hero-bg.webp",
  path,
  title,
}: {
  description?: string;
  image?: string;
  path: string;
  title: string;
}): Metadata {
  const canonical = new URL(path, getSiteUrl()).toString();
  const resolvedDescription = description ?? siteDescription;
  const resolvedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    alternates: {
      canonical,
    },
    description: resolvedDescription,
    openGraph: {
      description: resolvedDescription,
      images: [image],
      siteName,
      title: resolvedTitle,
      type: "website",
      url: canonical,
    },
    title: resolvedTitle,
    twitter: {
      card: "summary_large_image",
      description: resolvedDescription,
      images: [image],
      title: resolvedTitle,
    },
  };
}
