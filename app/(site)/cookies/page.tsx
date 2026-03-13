import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Ashique — ashique.digital",
  description: "How we use cookies to improve your experience on ashique.digital.",
};

export default function CookiesPage() {
  const launchDate = "March 15, 2026";

  return (
    <LegalLayout title="Cookie Policy" lastUpdated={launchDate}>
      <LegalSection title="1. What Are Cookies">
        <p>Cookies are small text files placed on your device to help websites remember your preferences, keep you logged in, and analyze how you interact with content. They are essential for modern, high-performance web experiences.</p>
      </LegalSection>

      <LegalSection title="2. Essential Cookies">
        <p>These cookies are required for the website to function securely and cannot be disabled in our systems.</p>
        <div style={{ overflowX: "auto", marginTop: "1rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9375rem" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-muted)" }}>
                <th style={{ padding: "12px 8px" }}>Name</th>
                <th style={{ padding: "12px 8px" }}>Provider</th>
                <th style={{ padding: "12px 8px" }}>Purpose</th>
                <th style={{ padding: "12px 8px" }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-muted)" }}>
                <td style={{ padding: "12px 8px" }}><code>__session</code></td>
                <td style={{ padding: "12px 8px" }}>Vercel</td>
                <td style={{ padding: "12px 8px" }}>Security & Session</td>
                <td style={{ padding: "12px 8px" }}>Session</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-muted)" }}>
                <td style={{ padding: "12px 8px" }}><code>cookie-consent</code></td>
                <td style={{ padding: "12px 8px" }}>First-party</td>
                <td style={{ padding: "12px 8px" }}>Consent Choice</td>
                <td style={{ padding: "12px 8px" }}>12 Months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3. Analytics Cookies">
        <p>We use these to measure website performance and understand which pages are most valuable to our visitors. All data is processed anonymously.</p>
        <div style={{ overflowX: "auto", marginTop: "1rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9375rem" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-muted)" }}>
                <th style={{ padding: "12px 8px" }}>Name</th>
                <th style={{ padding: "12px 8px" }}>Provider</th>
                <th style={{ padding: "12px 8px" }}>Purpose</th>
                <th style={{ padding: "12px 8px" }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-muted)" }}>
                <td style={{ padding: "12px 8px" }}><code>ph_*</code></td>
                <td style={{ padding: "12px 8px" }}>PostHog</td>
                <td style={{ padding: "12px 8px" }}>Usage Analytics</td>
                <td style={{ padding: "12px 8px" }}>12 Months</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-muted)" }}>
                <td style={{ padding: "12px 8px" }}><code>_va_*</code></td>
                <td style={{ padding: "12px 8px" }}>Vercel</td>
                <td style={{ padding: "12px 8px" }}>Performance Metrics</td>
                <td style={{ padding: "12px 8px" }}>Session</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. Managing Preferences">
        <p>You can adjust your cookie settings through your browser preferences. Please note that blocking essential cookies may impact your ability to use certain features on ashique.digital.</p>
      </LegalSection>

      <LegalSection title="5. Questions">
        <p>For more information about our use of cookies, please contact: <strong>ashique@ashique.digital</strong></p>
      </LegalSection>
    </LegalLayout>
  );
}
