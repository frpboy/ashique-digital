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

async function CaseStudiesList() {
  let studies: CaseStudy[] = [];
  try {
    studies = await sanityFetch<CaseStudy[]>({ query: allCaseStudiesQuery, tags: ["caseStudy"] });
  } catch {
    studies = [];
  }

  if (studies.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
        <p style={{ fontSize: "1.125rem" }}>Case studies coming soon.</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9375rem" }}>Check back shortly — content is being loaded into the CMS.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
      {studies.map((s) => (
        <Link key={s._id} href={`/case-studies/${s.slug.current}`} style={{ textDecoration: "none" }}>
          <div
            className="card"
            style={{ background: "var(--color-primary)", border: "none", height: "100%" }}
          >
            <span className="tag" style={{ marginBottom: "1rem" }}>{s.clientIndustry}</span>
            {s.metrics?.[0] && (
              <>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2.5rem", color: "var(--color-accent)", letterSpacing: "-0.03em", lineHeight: 1 }}>
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
        <div className="container">
          <span className="tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Case Studies</span>
          <h1 style={{ maxWidth: "14ch", marginBottom: "1.5rem" }}>
            Real results.<br />
            <span style={{ color: "var(--color-accent)" }}>Real businesses.</span>
          </h1>
          <p style={{ maxWidth: "50ch", fontSize: "1.125rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
            Every case study is a real engagement with real outcomes. No vanity metrics. No cherry-picked numbers.
          </p>
        </div>
      </section>
      <section className="section" style={{ background: "var(--color-bg)" }}>
        <div className="container">
          <Suspense fallback={<p style={{ color: "var(--color-text-muted)" }}>Loading case studies...</p>}>
            <CaseStudiesList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
