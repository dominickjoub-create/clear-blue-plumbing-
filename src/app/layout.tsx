import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { site, services } from "@/lib/site";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Reliable Plumber in ${site.areaServed}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "plumber",
    "plumbing",
    "emergency plumber",
    "plumbing leak detection",
    "plumbing leak repair",
    "pipe repair",
    "burst geyser replacement",
    "geyser installation",
    "water heater repair",
    "tap installation",
    "tap repair",
    "shower installation",
    "toilet installation",
    "toilet repair",
    "drain cleaning",
    "sewer cleaning",
    "sewer repair",
    "water tank installation",
    "outdoor plumbing repair",
    site.areaServed,
    "Clear Blue Plumbing",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/logo-full.png",
        width: 1240,
        height: 1240,
        alt: `${site.name}, reliable plumber`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/logo-full.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#050A14",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Structured data — helps Google understand the local business.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: site.name,
  image: `${site.url}/logo-full.png`,
  "@id": site.url,
  url: site.url,
  telephone: site.phoneE164,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  areaServed: site.areaServed,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
    bestRating: "5",
  },
  priceRange: "$$",
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.blurb },
  })),
  sameAs: [site.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#quote"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-aqua focus:px-5 focus:py-2 focus:font-display focus:font-bold focus:text-white"
        >
          Skip to quote form
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
