import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Ashique — ashique.digital",
  description: "Terms and conditions for using ashique.digital services and website.",
};

export default function TermsPage() {
  const lastUpdated = "March 10, 2026";

  return (
    <main className="section-lg" style={{ background: "var(--color-bg)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <header style={{ marginBottom: "4rem" }}>
          <span className="tag" style={{ marginBottom: "1.5rem" }}>Legal</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1.5rem" }}>
            Terms of <span style={{ color: "var(--color-accent)" }}>Service.</span>
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
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>2.1 Acceptance of Terms</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              By accessing ashique.digital, you agree to these Terms of Service. If you disagree, please do not use the website.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>2.2 Website Use</h2>
            <p style={{ marginBottom: "1rem" }}><strong>Permitted use:</strong></p>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem", listStyleType: "disc" }}>
              <li>Viewing and reading content for personal and informational purposes</li>
              <li>Contacting Ashique to enquire about consulting services</li>
              <li>Booking discovery calls via Cal.com</li>
            </ul>
            <p style={{ marginBottom: "1rem" }}><strong>Prohibited use:</strong></p>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>Scraping, copying, or reproducing website content without written permission</li>
              <li>Using the website for any illegal purpose</li>
              <li>Attempting to gain unauthorized access to any systems</li>
              <li>Submitting false, misleading, or spam form submissions</li>
            </ul>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>2.3 Intellectual Property</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              All content on ashique.digital — including text, design, graphics, case studies, and blog posts — is owned by Ashique unless stated otherwise. 
              You may not reproduce, distribute, or modify any content without prior written permission.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>2.4 Disclaimer</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              The information on this website is provided for general informational purposes only. While I strive to ensure accuracy, 
              it is not a substitute for professional legal, financial, or marketing advice. 
              Case study results are client-specific and cannot be guaranteed for all businesses.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>2.5 Governing Law</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Kochi, India.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>2.6 Contact</h2>
            <p>For questions regarding these terms, contact me at: <strong>ashique@ashique.digital</strong></p>
          </section>
        </article>
      </div>
    </main>
  );
}
