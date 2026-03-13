import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemBlock } from "@/components/sections/ProblemBlock";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CaseStudyPreview } from "@/components/sections/CaseStudyPreview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Ashique | Brand Strategist & Lead Generation Consultant",
  description:
    "Stop running ads. Start building a growth system. Book a free strategy call with Ashique — Brand Strategist & Lead Generation Consultant helping Indian SMEs and startups scale predictably.",
  openGraph: {
    title: "Ashique | Brand Strategist & Lead Generation Consultant",
    description:
      "Stop running ads. Start building a growth system. Book your free 30-minute strategy call.",
    url: "https://ashique.digital",
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ashique",
            jobTitle: "Brand Strategist & Lead Generation Consultant",
            url: "https://ashique.digital",
            sameAs: ["https://linkedin.com/in/ashique"],
            offers: {
              "@type": "Offer",
              description: "Free 30-minute Growth Strategy Call",
              url: "https://cal.com/frpboy/strategy",
            },
          }),
        }}
      />

      <Hero />
      <TrustBar />
      <ProblemBlock />
      <ServicesGrid />

      <Suspense fallback={<div style={{ padding: "5rem 0", textAlign: "center", color: "var(--color-text-muted)" }}>Loading case studies...</div>}>
        <CaseStudyPreview />
      </Suspense>

      <ProcessSteps />

      <Suspense fallback={<div style={{ padding: "3rem 0" }} />}>
        <Testimonials />
      </Suspense>

      <FinalCTA />
    </>
  );
}
