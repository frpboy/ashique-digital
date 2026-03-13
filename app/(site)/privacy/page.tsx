import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Ashique — ashique.digital",
  description: "How we collect, use, and protect your personal information at ashique.digital.",
};

export default function PrivacyPage() {
  const launchDate = "March 15, 2026";

  return (
    <LegalLayout title="Privacy Policy" lastUpdated={launchDate}>
      <p style={{ marginBottom: "2rem" }}>
        Welcome to ashique.digital (&quot;the Website&quot;), operated by Ashique (&quot;I&quot;, &quot;me&quot;, &quot;my&quot;). This Privacy Policy explains how I collect, use, and protect your personal information when you visit or interact with my website. By using this website, you agree to the practices described here.
      </p>

      <LegalSection title="1. Information I Collect">
        <p><strong>Information you provide voluntarily:</strong></p>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>Name and email address (contact form, newsletter, free audit form)</li>
          <li>Business name, marketing challenges, and budget (free audit form)</li>
          <li>Messages and communications via the contact form</li>
        </ul>
        <p style={{ marginTop: "1rem" }}><strong>Information collected automatically:</strong></p>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>IP address and approximate location</li>
          <li>Browser type and device information</li>
          <li>Pages visited and time spent (via Vercel Analytics and PostHog)</li>
          <li>Referring URLs</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. How I Use Your Information">
        <div style={{ overflowX: "auto", marginBottom: "1rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9375rem" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-muted)" }}>
                <th style={{ padding: "12px 8px" }}>Purpose</th>
                <th style={{ padding: "12px 8px" }}>Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-muted)" }}>
                <td style={{ padding: "12px 8px" }}>Respond to your enquiries</td>
                <td style={{ padding: "12px 8px" }}>Legitimate interest</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-muted)" }}>
                <td style={{ padding: "12px 8px" }}>Send requested resources (PDFs)</td>
                <td style={{ padding: "12px 8px" }}>Contract performance</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-muted)" }}>
                <td style={{ padding: "12px 8px" }}>Send newsletter (if opted in)</td>
                <td style={{ padding: "12px 8px" }}>Consent</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-muted)" }}>
                <td style={{ padding: "12px 8px" }}>Improve website experience</td>
                <td style={{ padding: "12px 8px" }}>Legitimate interest</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>I will <strong>never</strong> sell your personal information to third parties.</p>
      </LegalSection>

      <LegalSection title="3. Third-Party Services">
        <p>This website uses trusted third-party services that may process your data under their own privacy policies:</p>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li><strong>Vercel:</strong> Web hosting & performance analytics</li>
          <li><strong>Sanity.io:</strong> Content management system</li>
          <li><strong>Resend:</strong> Transactional email delivery</li>
          <li><strong>Cal.com:</strong> Appointment and call scheduling</li>
          <li><strong>Google:</strong> Gemini AI Pro processing for the assistant</li>
          <li><strong>PostHog:</strong> User behavior tracking and conversion analytics</li>
          <li><strong>Pinecone:</strong> AI knowledge base storage</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Data Retention">
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li><strong>Contact form data:</strong> Retained for 24 months, then deleted</li>
          <li><strong>Newsletter subscribers:</strong> Retained until you unsubscribe</li>
          <li><strong>Analytics data:</strong> Anonymised after 12 months</li>
          <li><strong>Booking data:</strong> Managed via Cal.com&apos;s retention policy</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Your Rights">
        <p>You have the right to access, correct, or delete your personal data. You may also object to processing for marketing purposes or withdraw your consent at any time.</p>
        <p style={{ marginTop: "1rem" }}>To exercise these rights, please contact me at: <strong>ashique@ashique.digital</strong></p>
      </LegalSection>
    </LegalLayout>
  );
}
