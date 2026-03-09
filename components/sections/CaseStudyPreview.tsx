import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import { featuredCaseStudiesQuery } from "@/lib/sanity.queries";
import type { CaseStudy } from "@/lib/types";
import { StudyCard } from "./StudyCard";

const placeholders: Array<Partial<CaseStudy> & { _id: string }> = [
  {
    _id: "1",
    title: "3.2x ROAS in 60 Days",
    clientIndustry: "D2C E-commerce",
    metrics: [{ label: "ROAS", value: "3.2x" }, { label: "CPL Drop", value: "71%" }],
    slug: { current: "#" },
  },
  {
    _id: "2",
    title: "220% More Qualified Leads",
    clientIndustry: "SaaS Startup",
    metrics: [{ label: "Leads/month", value: "+220%" }, { label: "CAC", value: "-40%" }],
    slug: { current: "#" },
  },
  {
    _id: "3",
    title: "₹4.2L Revenue Added Monthly",
    clientIndustry: "Service Business",
    metrics: [{ label: "Revenue", value: "+₹4.2L/mo" }, { label: "Conversion", value: "3.8x" }],
    slug: { current: "#" },
  },
];

export async function CaseStudyPreview() {
  let studies: CaseStudy[] = [];
  try {
    studies = await sanityFetch<CaseStudy[]>({
      query: featuredCaseStudiesQuery,
      tags: ["caseStudy"],
    });
  } catch {
    studies = [];
  }

  const displayStudies =
    studies.length > 0 ? studies : placeholders;

  return (
    <section className="section" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="accent-line" />
          <h2 style={{ marginBottom: "1rem" }}>Real Results. Real Businesses.</h2>
          <p
            style={{
              color: "var(--color-text-muted)",
              maxWidth: "52ch",
              fontSize: "1.0625rem",
            }}
          >
            Numbers don&apos;t lie. Here&apos;s what happens when strategy meets execution.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {displayStudies.map((study, i) => (
            <StudyCard key={study._id ?? i} study={study} />
          ))}
        </div>

        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link href="/case-studies" className="btn btn-secondary">
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
