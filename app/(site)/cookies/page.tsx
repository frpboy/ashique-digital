import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Ashique — ashique.digital",
  description: "How we use cookies to improve your experience on ashique.digital.",
};

export default function CookiesPage() {
  const lastUpdated = "March 10, 2026";

  return (
    <main className="section-lg" style={{ background: "var(--color-bg)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <header style={{ marginBottom: "4rem" }}>
          <span className="tag" style={{ marginBottom: "1.5rem" }}>Legal</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1.5rem" }}>
            Cookie <span style={{ color: "var(--color-accent)" }}>Policy.</span>
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
            Effective Date: {lastUpdated} | Last Updated: {lastUpdated}
          </p>
        </header>

        <article className="prose" style={{ 
          fontFamily: "var(--font-body)", 
          lineHeight: 1.8, 
          color: "var(--color-text)",
          fontSize: "1.0625rem"
        }}>
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>3.1 What Are Cookies</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, keep you logged in, and analyze usage.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>3.2 Types of Cookies Used</h2>
            <p style={{ marginBottom: "1.5rem" }}>We use minimal cookies to ensure the website functions correctly and to analyze usage anonymously.</p>

            <h4 style={{ marginBottom: "1rem" }}>Essential Cookies (Always Active)</h4>
            <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9375rem", border: "1px solid var(--color-muted)" }}>
                <thead>
                  <tr style={{ background: "rgba(0,194,203,0.05)" }}>
                    <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Cookie Name</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Provider</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Purpose</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>`__session`</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>Vercel</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>Session management</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>Session</td></tr>
                  <tr><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>`cookie-consent`</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>First-party</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>Your consent choice</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>12 months</td></tr>
                </tbody>
              </table>
            </div>

            <h4 style={{ marginBottom: "1rem" }}>Analytics Cookies (Opt-in)</h4>
            <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9375rem", border: "1px solid var(--color-muted)" }}>
                <thead>
                  <tr style={{ background: "rgba(0,194,203,0.05)" }}>
                    <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Cookie Name</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Provider</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Purpose</th>
                    <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>`ph_*`</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>PostHog</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>Anonymous usage analytics</td><td style={{ padding: "0.75rem", border: "1px solid var(--color-muted)" }}>12 months</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>3.3 Managing Cookies</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              You can control cookies through your browser settings or our cookie banner. 
              Note: Blocking essential cookies may prevent the website from functioning correctly.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>3.4 Contact</h2>
            <p>For questions regarding these cookies, contact me at: <strong>ashique@ashique.digital</strong></p>
          </section>
        </article>
      </div>
    </main>
  );
}
