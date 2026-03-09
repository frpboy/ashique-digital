import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { caseStudyBySlugQuery, allCaseStudiesQuery } from "@/lib/sanity.queries";
import type { CaseStudy } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = await sanityFetch<CaseStudy[]>({ query: allCaseStudiesQuery, tags: ["caseStudy"] }).catch(() => []);
  return studies.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await sanityFetch<CaseStudy>({ query: caseStudyBySlugQuery, params: { slug }, tags: ["caseStudy"] }).catch(() => null);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: `${study.title} — Case Study`,
    description: study.problem ?? `A case study on how Ashique helped a ${study.clientIndustry} business grow.`,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = await sanityFetch<CaseStudy>({ query: caseStudyBySlugQuery, params: { slug }, tags: ["caseStudy"] }).catch(() => null);

  if (!study) notFound();

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--color-primary)" }}>
        <div className="container">
          <Link href="/case-studies" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--color-accent)", marginBottom: "1.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
            <ArrowLeft size={14} /> All Case Studies
          </Link>
          <span className="tag" style={{ marginBottom: "1.25rem", display: "inline-block" }}>{study.clientIndustry}</span>
          <h1 style={{ color: "#fff", maxWidth: "16ch", marginBottom: "2rem" }}>{study.title}</h1>

          {/* Metrics */}
          {study.metrics && study.metrics.length > 0 && (
            <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              {study.metrics.map((m) => (
                <div key={m.label}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2.5rem", color: "var(--color-accent)", letterSpacing: "-0.03em" }}>
                    {m.value}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: "760px", margin: "0 auto" }}>
          {study.problem && (
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>The Problem</h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85 }}>{study.problem}</p>
            </div>
          )}

          {study.testimonial && study.clientName && (
            <div style={{ borderLeft: "3px solid var(--color-accent)", paddingLeft: "1.5rem", marginTop: "3rem", marginBottom: "3rem" }}>
              <p style={{ fontFamily: "var(--font-accent)", fontSize: "1.125rem", fontStyle: "italic", color: "var(--color-text)", lineHeight: 1.8, marginBottom: "1rem" }}>
                &ldquo;{study.testimonial}&rdquo;
              </p>
              <p style={{ fontWeight: 600, color: "var(--color-primary)", fontSize: "0.9375rem" }}>— {study.clientName}</p>
            </div>
          )}

          <div style={{ marginTop: "3rem" }}>
            <Link href="/contact" className="btn btn-primary" style={{ gap: "0.5rem" }}>
              Want results like this? Book a free call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
