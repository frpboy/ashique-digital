import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Growth Strategist India — About Ashique",
  description: "Ashique is a leading Growth Strategist in India helping ambitious SMEs and Startups build systemised lead generation and brand authority.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--color-bg)" }}>
        <div className="container">
          <span className="tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Growth Strategist India</span>
          <h1 style={{ maxWidth: "14ch", marginBottom: "1.5rem" }}>
            I engineer growth systems.<br />
            <span style={{ color: "var(--color-accent)" }}>Not just campaigns.</span>
          </h1>
          <p style={{ maxWidth: "55ch", fontSize: "1.125rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
            I&apos;m Ashique — a Growth Strategist in India helping Indian SMEs
            and startups in India build predictable, scalable growth infrastructure.
            Not spray-and-pray ads. Real systems.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <span className="accent-line" />
            <h2 style={{ marginBottom: "1.5rem" }}>My Story</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              I spent years watching businesses with great products fail to grow — not because
              of what they were selling, but because of how they were selling it. Disconnected
              channels. No tracking. No funnel. Just budget burns with no system behind it.
            </p>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              So I built the alternative. A practice focused on designing the whole system:
              brand, strategy, funnel, traffic, and measurement — all working together.
            </p>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85 }}>
              Today I work with ambitious founders and marketing teams who are done with
              guesswork and ready to build something that compounds.
            </p>
          </div>
          <div
            style={{
              background: "var(--color-primary)",
              borderRadius: "8px",
              padding: "3rem",
              color: "#fff",
            }}
          >
            <h3 style={{ color: "#fff", marginBottom: "2rem" }}>My Philosophy</h3>
            {[
              "Strategy before tactics — always.",
              "Data should drive decisions, not ego.",
              "Build systems that outlast campaigns.",
              "Proof over promises. Results over reports.",
              "Clients deserve clarity, not jargon.",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                  paddingBottom: "1rem",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>→</span>
                <p style={{ color: "var(--color-text-on-dark)", margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section" style={{ background: "var(--color-bg)" }}>
        <div className="container">
          <span className="accent-line" />
          <h2 style={{ marginBottom: "3rem" }}>Credentials & Expertise</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              "Google Ads Certified",
              "Meta Blueprint Certified",
              "Growth Marketing",
              "Brand Strategy",
              "Funnel Architecture",
              "Performance Analytics",
              "CRO & UX",
              "Content Strategy",
            ].map((cred) => (
              <div
                key={cred}
                style={{
                  padding: "1.25rem",
                  background: "#fff",
                  borderRadius: "6px",
                  border: "1px solid var(--color-muted)",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "var(--color-accent)" }}>✓</span>
                {cred}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-section section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Let&apos;s see if we&apos;re a good fit.</h2>
          <p style={{ color: "var(--color-text-on-dark)", marginBottom: "2rem", fontSize: "1.0625rem" }}>
            I take on a limited number of clients each quarter. If you&apos;re serious about growth,
            let&apos;s talk.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ gap: "0.5rem" }}>
            Work With Me <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
