import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { AIWidget } from "@/components/AIWidget/AIOrb";
import Preloader from "@/components/layout/Preloader";

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
    "I help SMEs and startups generate qualified leads, design high-converting funnels, and turn digital marketing into a predictable revenue engine.",
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
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AIWidget />
      </body>
    </html>
  );
}
