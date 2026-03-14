import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, LineChart, Magnet, Funnel, DollarSign, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Lead Generation for SMEs in India — Services",
  description: "Six specialised services designed to scale Indian SMEs and Startups in India. Brand strategy, lead generation systems, and growth consulting.",
};

const services = [
  {
    id: "brand-strategy",
    icon: <Target size={28} />,
    title: "Brand Strategy",
    forWho: "Businesses that know their product is great but can't explain what makes them different.",
    problem: "Without a clear positioning, you compete on price. With it, you attract the right clients at the right rates.",
    deliverables: ["Brand positioning framework", "Messaging architecture", "ICP definition", "Competitive differentiation map"],
    outcome: "You'll know exactly how to talk about what you do — and it will attract the right people.",
  },
  {
    id: "digital-marketing-strategy",
    icon: <LineChart size={28} />,
    title: "Digital Marketing Strategy",
    forWho: "Teams running disconnected campaigns across platforms with no cohesive plan.",
    problem: "Fragmented marketing creates fragmented results. You need one strategy that connects everything.",
    deliverables: ["Channel strategy & prioritisation", "90-day growth roadmap", "KPI framework", "Content calendar"],
    outcome: "A unified growth plan where every channel feeds the funnel — not runs independently.",
  },
  {
    id: "lead-generation",
    icon: <Magnet size={28} />,
    title: "Lead Generation Systems",
    forWho: "Service businesses or B2B companies that rely on referrals and word-of-mouth.",
    problem: "Referrals dry up. You need a pipeline that runs even when you're not actively selling.",
    deliverables: ["Lead magnet creation", "Landing page builds", "Email nurture sequences", "LinkedIn outreach system"],
    outcome: "A predictable, measurable flow of qualified leads — every single month.",
  },
  {
    id: "funnel-design",
    icon: <Funnel size={28} />,
    title: "Funnel Design",
    forWho: "Businesses driving traffic but seeing poor conversion rates.",
    problem: "Traffic without a funnel is wasted budget. Every journey needs clear steps from aware → interested → booked.",
    deliverables: ["Sales funnel architecture", "Landing page copywriting", "CRO audit & implementation", "A/B testing framework"],
    outcome: "Higher conversion from the traffic you already have — without increasing ad spend.",
  },
  {
    id: "paid-ads-strategy",
    icon: <DollarSign size={28} />,
    title: "Paid Ads Strategy",
    forWho: "Businesses with ad budgets getting mediocre ROAS and no strategic direction.",
    problem: "Running ads without strategy is burning money. You need campaigns that are engineered, not guessed.",
    deliverables: ["Meta & Google Ads setup/audit", "Creative strategy & briefs", "Audience targeting framework", "Monthly ROAS reporting"],
    outcome: "Campaigns that actually scale — with clear data on what's working and why.",
  },
  {
    id: "growth-consulting",
    icon: <TrendingUp size={28} />,
    title: "Growth Consulting",
    forWho: "Founders who have traction but need strategic direction to scale past their current ceiling.",
    problem: "What got you to ₹1Cr won't get you to ₹5Cr. You need a different playbook.",
    deliverables: ["Growth audit", "Scalability roadmap", "Team & process recommendations", "Monthly strategy sessions"],
    outcome: "A clear, data-backed plan to grow — with someone to hold you accountable to it.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--color-bg)" }}>
        <div className="container">
          <span className="tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Services for Indian SMEs & Startups</span>
          <h1 style={{ maxWidth: "16ch", marginBottom: "1.5rem" }}>
            Six services. One goal:{" "}
            <span style={{ color: "var(--color-accent)" }}>predictable growth.</span>
          </h1>
          <p style={{ maxWidth: "55ch", fontSize: "1.125rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
            I help startups in India and Indian SMEs build high-authority brand systems.
            Every engagement is personalised — not a template.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {services.map((svc, i) => (
              <div
                key={svc.id}
                id={svc.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "3rem",
                  paddingBottom: "4rem",
                  borderBottom: i < services.length - 1 ? "1px solid var(--color-muted)" : "none",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "8px",
                      background: "rgba(0,194,203,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {svc.icon}
                  </div>
                  <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{svc.title}</h2>
                  <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Who it&apos;s for</p>
                  <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>{svc.forWho}</p>
                  <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>The Problem</p>
                  <p style={{ color: "var(--color-text-muted)" }}>{svc.problem}</p>
                </div>
                <div>
                  <div style={{ background: "var(--color-bg)", borderRadius: "8px", padding: "2rem", marginBottom: "1.5rem" }}>
                    <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>What&apos;s Included</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {svc.deliverables.map((item) => (
                        <li key={item} style={{ display: "flex", gap: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
                          <span style={{ color: "var(--color-accent)", fontWeight: 700, flexShrink: 0 }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ borderLeft: "3px solid var(--color-accent)", paddingLeft: "1rem" }}>
                    <p style={{ fontWeight: 600, color: "var(--color-primary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>THE OUTCOME</p>
                    <p style={{ color: "var(--color-text)", fontStyle: "italic" }}>{svc.outcome}</p>
                  </div>
                  <Link href="/contact" className="btn btn-primary" style={{ marginTop: "1.5rem", gap: "0.5rem" }}>
                    Get a Custom Strategy <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Not sure which service you need?</h2>
          <p style={{ color: "var(--color-text-on-dark)", marginBottom: "2rem" }}>
            Book a free 30-minute strategy call. I&apos;ll help you figure out the best starting point.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Book a Free Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
