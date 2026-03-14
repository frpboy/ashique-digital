import dynamic from "next/dynamic";
import Script from "next/script";
import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import DataNodeTrail from "@/components/shared/DataNodeTrail";
import Preloader from "@/components/layout/Preloader";
import { Analytics } from "@vercel/analytics/next";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import PostHogPageView from "@/components/providers/PostHogPageView";
import { Toaster } from "sonner";
import { ThreeSceneProvider } from "@/components/providers/ThreeSceneProvider";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ashique | Brand Strategist & Lead Generation India",
    template: "%s | Ashique | Brand Strategist & Lead Gen India",
  },
  description:
    "Ashique helps SMEs and Startups in India generate qualified leads and scale through engineered growth systems. Download your free 15-Point Lead Gen Audit today.",
  metadataBase: new URL("https://ashique.digital"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ashique.digital",
    siteName: "Ashique Digital",
    title: "Ashique | Brand Strategist & Lead Generation India",
    description:
      "Ashique helps SMEs and Startups in India generate qualified leads and scale through engineered growth systems. Download your free 15-Point Lead Gen Audit today.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Ashique — Brand Strategist & Lead Generation India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashique | Brand Strategist & Lead Generation India",
    description:
      "Ashique helps SMEs and Startups in India generate qualified leads and scale through engineered growth systems. Download your free 15-Point Lead Gen Audit today.",
    images: ["/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${syne.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Ashique Digital",
              "image": "https://ashique.digital/og/home.png",
              "@id": "https://ashique.digital",
              "url": "https://ashique.digital",
              "telephone": "",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "",
                "addressLocality": "Kerala",
                "addressRegion": "India",
                "postalCode": "",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 10.8505,
                "longitude": 76.2711
              },
              "areaServed": "India",
              "description": "Lead generation and brand strategy consultant for Indian SMEs and Startups.",
              "priceRange": "Contact for Pricing"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ashique",
              "url": "https://ashique.digital",
              "jobTitle": "Brand Strategist & Lead Generation Consultant",
              "knowsAbout": ["Brand Strategy", "Lead Generation", "Funnel Engineering", "Growth Marketing", "Indian SME Market"],
              "sameAs": [
                "https://github.com/frpboy",
                "https://cal.com/frpboy/strategy"
              ]
            })
          }}
        />
        <Script
          id="cal-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function (C, A, L) {
                let p = function (a, ar) { a.q.push(ar); };
                let d = C.document;
                C.Cal = C.Cal || function () {
                  let cal = C.Cal;
                  let ar = arguments;
                  if (!cal.loaded) {
                    cal.q = cal.q || [];
                    cal.loaded = true;
                  }
                  p(cal, ar);
                };
                C.Cal("init", { origin: "https://cal.com" });
                C.Cal("ui", { theme: "light", styles: { branding: { brandColor: "#00c2cb" } } });
              })(window, "https://api.cal.com", "cal");
            `
          }}
        />
      </head>
      <body className="antialiased">
        <PostHogProvider>
          <ThreeSceneProvider>
            <PostHogPageView />
            <Preloader />
            {children}
            <DataNodeTrail />
            <Analytics />
            <Toaster position="top-center" richColors />
          </ThreeSceneProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
