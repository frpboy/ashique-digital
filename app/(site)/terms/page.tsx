import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Ashique — ashique.digital",
  description: "Terms and conditions for using ashique.digital.",
};

export default function TermsPage() {
  const launchDate = "March 15, 2026";

  return (
    <LegalLayout title="Terms of Service" lastUpdated={launchDate}>
      <LegalSection title="1. Acceptance of Terms">
        <p>By accessing and using ashique.digital, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue use of the website immediately.</p>
      </LegalSection>

      <LegalSection title="2. Website Use">
        <p><strong>Permitted Use:</strong></p>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>Viewing and interacting with content for personal and informational purposes.</li>
          <li>Inquiring about consulting services and booking discovery calls.</li>
          <li>Downloading free resources for professional evaluation.</li>
        </ul>
        <p style={{ marginTop: "1rem" }}><strong>Prohibited Use:</strong></p>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>Scraping, copying, or reproducing content without express written permission.</li>
          <li>Submitting false, misleading, or spam information via forms.</li>
          <li>Attempting to bypass security measures or gain unauthorized access to systems.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Intellectual Property">
        <p>All content on ashique.digital — including but not limited to text, design, graphics, case studies, and strategic frameworks — is owned by Ashique unless otherwise stated. Reproduction, distribution, or modification of any material is strictly prohibited without prior written consent.</p>
      </LegalSection>

      <LegalSection title="4. Disclaimers">
        <p>Information on this website is for educational and informational purposes only. It is not a substitute for professional legal, financial, or marketing advice. Results shown in case studies are specific to those individuals and businesses; they are not guarantees of future performance for your own business.</p>
      </LegalSection>

      <LegalSection title="5. Limitation of Liability">
        <p>To the fullest extent permitted by law, Ashique shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website, loss of data, or failures of third-party services (Cal.com, Resend, etc.).</p>
      </LegalSection>

      <LegalSection title="6. Governing Law">
        <p>These terms are governed by the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in India.</p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>For any questions regarding these terms, please reach out to: <strong>ashique@ashique.digital</strong></p>
      </LegalSection>
    </LegalLayout>
  );
}
