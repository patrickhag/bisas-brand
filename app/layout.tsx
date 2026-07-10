import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { getSiteUrl, siteDescription, siteName } from "@/lib/seo";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  alternates: {
    canonical: getSiteUrl(),
  },
  description: siteDescription,
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    description: siteDescription,
    images: ["/images/boraland-hero-bg.webp"],
    siteName,
    title: siteName,
    type: "website",
    url: getSiteUrl(),
  },
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  twitter: {
    card: "summary_large_image",
    description: siteDescription,
    images: ["/images/boraland-hero-bg.webp"],
    title: siteName,
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: getSiteUrl(),
      logo: `${getSiteUrl()}/logo.svg`,
      description: siteDescription,
      sameAs: [
        "https://www.linkedin.com/company/boraland-ltd/",
        "https://www.tiktok.com/@boraland_co",
        "https://www.instagram.com/boraland_co",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "boralandltd@gmail.com",
          telephone: "+250788815978",
          areaServed: "RW",
          availableLanguage: ["en", "rw", "fr"],
        },
      ],
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: getSiteUrl(),
      description: siteDescription,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-mono">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
