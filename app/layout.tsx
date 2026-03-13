import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import DataNodeTrail from "@/components/shared/DataNodeTrail";
import Preloader from "@/components/layout/Preloader";
import { Analytics } from "@vercel/analytics/next";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import PostHogPageView from "@/components/providers/PostHogPageView";
import { Toaster } from "sonner";

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
    default: "Ashique | Brand Strategist & Lead Generation Consultant",
    template: "%s | Ashique — ashique.digital",
  },
  description:
    "Ashique is a Brand Strategist and Lead Generation Consultant helping SMEs and Startups build predictable growth systems. Download the free 15-Point Growth Audit and engineer an acquisition engine that scales profits, not just campaigns.",
  metadataBase: new URL("https://ashique.digital"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ashique.digital",
    siteName: "Ashique Digital",
    title: "Ashique | Brand Strategist & Lead Generation Consultant",
    description:
      "Stop running ads. Start building a growth system. Ashique helps ambitious businesses generate more leads and scale with confidence.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Ashique — Brand Strategist & Lead Generation Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashique | Brand Strategist & Lead Generation Consultant",
    description: "Stop running ads. Start building a growth system.",
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
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="antialiased">
        <PostHogProvider>
          <PostHogPageView />
          <Preloader />
          {children}
          <DataNodeTrail />
          <Analytics />
          <Toaster position="top-center" richColors />
        </PostHogProvider>
      </body>
    </html>
  );
}
