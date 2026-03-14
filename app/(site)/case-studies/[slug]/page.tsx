import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { caseStudyBySlugQuery, allCaseStudiesQuery } from "@/lib/sanity.queries";
import type { CaseStudy } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";

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
      <section style={{ paddingTop: "8rem", paddingBottom: "6rem", background: "var(--color-primary)" }}>
        <div className="container">
          <Link href="/case-studies" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--color-accent)", marginBottom: "2rem", fontSize: "0.875rem", fontWeight: 600 }}>
            <ArrowLeft size={14} /> All Case Studies
          </Link>
          
          <div style={{ maxWidth: "800px" }}>
            <span className="tag" style={{ marginBottom: "1.25rem", display: "inline-block" }}>{study.clientIndustry} Case Study</span>
            <h1 style={{ color: "#fff", marginBottom: "3rem", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>{study.title}</h1>

            {/* Top: Bold Metrics */}
            {study.metrics && study.metrics.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", background: "rgba(255,255,255,0.03)", padding: "2.5rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "3.5rem", color: "var(--color-accent)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {m.value}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginTop: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }}>
          {/* Main Content */}
          <div style={{ maxWidth: "760px" }}>
            {/* Middle: The Strategy */}
            {study.strategy && (
              <div style={{ marginBottom: "5rem" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>The Strategy</h2>
                <div className="prose" style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", lineHeight: 1.8 }}>
                  <PortableText value={study.strategy} />
                </div>
              </div>
            )}

            {/* Bottom: The Testimonial */}
            {study.testimonial && (
              <div style={{ padding: "4rem 0", borderTop: "1px solid var(--color-muted)" }}>
                <div style={{ position: "relative" }}>
                   {/* Quote icon or styling */}
                  <p style={{ 
                    fontFamily: "Playfair Display, serif", 
                    fontSize: "clamp(1.5rem, 3vw, 2rem)", 
                    fontStyle: "italic", 
                    color: "var(--color-primary)", 
                    lineHeight: 1.5, 
                    marginBottom: "2rem" 
                  }}>
                    &ldquo;{study.testimonial}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "40px", height: "1px", background: "var(--color-accent)" }} />
                    <p style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {study.clientName || "Client"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar CTA */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div className="card" style={{ padding: "2.5rem", background: "var(--color-primary)", border: "none" }}>
              <h3 style={{ color: "#fff", marginBottom: "1rem" }}>Want results like this?</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                I help SMEs and startups build predictable growth systems. Book a 30-min strategy call to audit your current funnel.
              </p>
              <Link href="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Work with Me
              </Link>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "1.5rem", textAlign: "center" }}>
                Free 30-min Strategy Session
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Floating CTA for Mobile/Quick Access */}
      <div 
        style={{ 
          position: "fixed", 
          bottom: "2rem", 
          left: "2rem", 
          zIndex: 100,
          display: "block"
        }}
      >
        <Link 
          href="https://cal.com/frpboy/strategy"
          target="_blank"
          className="btn btn-accent"
          style={{ 
            boxShadow: "0 10px 30px rgba(0, 194, 203, 0.4)",
            borderRadius: "99px",
            padding: "0.75rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}
        >
          Book Call
        </Link>
      </div>
    </>
  );
}
