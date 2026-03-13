import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityFetch } from "@/lib/sanity";
import { allCaseStudiesQuery } from "@/lib/sanity.queries";
import type { CaseStudy } from "@/lib/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies — Real Results from Real Businesses",
  description: "Browse results-driven case studies from Ashique's client engagements. Real metrics from real businesses.",
};

import LockedEmptyState from "@/components/shared/LockedEmptyState";

async function CaseStudiesList() {
  let studies: CaseStudy[] = [];
  try {
    studies = await sanityFetch<CaseStudy[]>({ query: allCaseStudiesQuery, tags: ["caseStudy"] });
  } catch {
    studies = [];
  }

  if (studies.length === 0) {
    return <LockedEmptyState type="Case Studies" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {studies.map((s) => (
        <Link key={s._id} href={`/case-studies/${s.slug.current}`} style={{ textDecoration: "none" }}>
          <div
            className="card"
            style={{ background: "var(--color-primary)", border: "none", height: "100%" }}
          >
            <span className="tag" style={{ marginBottom: "1rem" }}>{s.clientIndustry}</span>
            {s.metrics?.[0] && (
              <>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "var(--color-accent)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {s.metrics[0].value}
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginBottom: "1rem" }}>{s.metrics[0].label}</p>
              </>
            )}
            <h3 style={{ color: "#fff", fontSize: "1.0625rem", marginBottom: "1.25rem" }}>{s.title}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-accent)", fontSize: "0.875rem", fontWeight: 600 }}>
              Read Case Study <ArrowRight size={14} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--color-bg)" }}>
        <div className="container px-6">
          <span className="tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Case Studies</span>
          <h1 style={{ maxWidth: "16ch", marginBottom: "1.5rem", fontSize: "clamp(2.5rem, 8vw, 4rem)", lineHeight: 1 }}>
            Real results.<br />
            <span style={{ color: "var(--color-accent)" }}>Real businesses.</span>
          </h1>
          <p style={{ maxWidth: "50ch", fontSize: "1.125rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
            Every case study is a real engagement with real outcomes. No vanity metrics. No cherry-picked numbers.
          </p>
        </div>
      </section>
      <section className="section" style={{ background: "var(--color-bg)" }}>
        <div className="container px-6">
          <Suspense fallback={<p style={{ color: "var(--color-text-muted)" }}>Loading case studies...</p>}>
            <CaseStudiesList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
