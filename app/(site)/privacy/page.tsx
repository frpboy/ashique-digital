import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ashique — ashique.digital",
  description: "How we collect, use, and protect your personal information at ashique.digital.",
};

export default function PrivacyPage() {
  const lastUpdated = "March 10, 2026";

  return (
    <main className="section-lg" style={{ background: "var(--color-bg)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <header style={{ marginBottom: "4rem" }}>
          <span className="tag" style={{ marginBottom: "1.5rem" }}>Legal</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1.5rem" }}>
            Privacy <span style={{ color: "var(--color-accent)" }}>Policy.</span>
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
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>1.1 Introduction</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Welcome to ashique.digital ("the Website"), operated by Ashique ("I", "me", "my"). This Privacy Policy explains how I collect, use, and protect your personal information when you visit or interact with my website.
            </p>
            <p>By using this website, you agree to the practices described in this Privacy Policy.</p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>1.2 Information I Collect</h2>
            <p style={{ marginBottom: "1rem" }}><strong>Information you provide voluntarily:</strong></p>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem", listStyleType: "disc" }}>
              <li>Name and email address (contact form, newsletter, free audit form)</li>
              <li>Business type and marketing challenges (free audit form)</li>
              <li>Messages and communications (contact form)</li>
            </ul>
            <p style={{ marginBottom: "1rem" }}><strong>Information collected automatically:</strong></p>
            <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
              <li>IP address and approximate location</li>
              <li>Browser type and device information</li>
              <li>Pages visited and time spent (via Vercel Analytics and PostHog)</li>
              <li>Referring URLs</li>
            </ul>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>1.3 How I Use Your Information</h2>
            <p style={{ marginBottom: "1.5rem" }}>I use your information to respond to enquiries, deliver requested resources, and improve the overall website experience. I will <strong>never</strong> sell your personal information to third parties.</p>
            
            <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9375rem", border: "1px solid var(--color-muted)" }}>
                <thead>
                  <tr style={{ background: "rgba(0,194,203,0.05)" }}>
                    <th style={{ padding: "1rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Purpose</th>
                    <th style={{ padding: "1rem", textAlign: "left", border: "1px solid var(--color-muted)" }}>Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: "1rem", border: "1px solid var(--color-muted)" }}>Respond to your enquiries</td><td style={{ padding: "1rem", border: "1px solid var(--color-muted)" }}>Legitimate interest</td></tr>
                  <tr><td style={{ padding: "1rem", border: "1px solid var(--color-muted)" }}>Send requested resources</td><td style={{ padding: "1rem", border: "1px solid var(--color-muted)" }}>Contract performance</td></tr>
                  <tr><td style={{ padding: "1rem", border: "1px solid var(--color-muted)" }}>Send newsletter (if opted in)</td><td style={{ padding: "1rem", border: "1px solid var(--color-muted)" }}>Consent</td></tr>
                  <tr><td style={{ padding: "1rem", border: "1px solid var(--color-muted)" }}>Improve website experience</td><td style={{ padding: "1rem", border: "1px solid var(--color-muted)" }}>Legitimate interest</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>1.4 Third-Party Services</h2>
            <p style={{ marginBottom: "1.5rem" }}>This website uses third-party services like Vercel (hosting), Sanity.io (CMS), and PostHog (analytics) that may process your data according to their own privacy policies.</p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--color-primary)" }}>1.5 Your Rights</h2>
            <p style={{ marginBottom: "1rem" }}>You have the right to access, correct, or request deletion of your personal data. You may also withdraw consent for marketing at any time.</p>
            <p>To exercise these rights, please contact me at: <strong>ashique@ashique.digital</strong></p>
          </section>
        </article>
      </div>
    </main>
  );
}
