import Link from "next/link";
import { Target, LineChart, Magnet, Funnel, DollarSign, TrendingUp } from "lucide-react";

const services = [
  {
    icon: <Target size={22} />,
    title: "Brand Strategy",
    outcome: "Define how you want to be known — and make it stick.",
    slug: "brand-strategy",
  },
  {
    icon: <LineChart size={22} />,
    title: "Digital Marketing Strategy",
    outcome: "Turn disconnected channels into one cohesive growth plan.",
    slug: "digital-marketing-strategy",
  },
  {
    icon: <Magnet size={22} />,
    title: "Lead Generation Systems",
    outcome: "Build pipelines that fill your calendar — on autopilot.",
    slug: "lead-generation",
  },
  {
    icon: <Funnel size={22} />,
    title: "Funnel Design",
    outcome: "Convert cold traffic into warm leads and paying customers.",
    slug: "funnel-design",
  },
  {
    icon: <DollarSign size={22} />,
    title: "Paid Ads Strategy",
    outcome: "Make every rupee of ad spend count. No wasted budget.",
    slug: "paid-ads-strategy",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Growth Consulting",
    outcome: "Scale with a clear roadmap — not guesswork.",
    slug: "growth-consulting",
  },
];

export function ServicesGrid() {
  return (
    <section className="section" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="accent-line" />
          <h2 style={{ marginBottom: "1rem" }}>How I Help You Grow</h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "52ch", fontSize: "1.0625rem" }}>
            Six specialised services. One unified goal: predictable, systemised growth.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{ height: "100%", cursor: "pointer" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "6px",
                    background: "rgba(0,194,203,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {s.icon}
                </div>
                <h3 style={{ marginBottom: "0.75rem", fontSize: "1.125rem" }}>{s.title}</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem", lineHeight: 1.65 }}>
                  {s.outcome}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link href="/services" className="btn btn-secondary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
