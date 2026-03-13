import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface AuditAutoResponderProps {
  name: string;
  downloadUrl?: string;
}

export const AuditAutoResponder = ({
  name,
  downloadUrl = "https://ashique.digital/lead-gen-audit.pdf",
}: AuditAutoResponderProps) => {
  const firstName = name.split(" ")[0];

  return (
    <Html>
      <Head />
      <Preview>Your 15-Point Lead Generation Audit is ready</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>ASHIQUE<span style={{ color: "#00c2cb" }}> · </span>DIGITAL</Text>
          </Section>
          
          <Section style={content}>
            <Heading style={h1}>Hey {firstName},</Heading>
            <Text style={text}>
              I&apos;m glad you requested the <strong>15-Point Lead Generation Audit</strong>. This is the exact framework I use to evaluate high-growth funnels and identify the &quot;leaks&quot; that are costing you revenue.
            </Text>
            
            <Text style={text}>
              Your copy of the audit is ready for download below:
            </Text>
            
            <Section style={buttonContainer}>
              <Button
                style={button}
                href={downloadUrl}
              >
                Download My Free Audit
              </Button>
            </Section>
            
            <Hr style={hr} />
            
            <Section style={ctaSection}>
              <Heading style={h2}>Ready to skip the line?</Heading>
              <Text style={ctaText}>
                The audit will give you the &quot;what&quot;, but if you want the &quot;how&quot; specifically tailored to your business, let&apos;s talk.
              </Text>
              <Link
                href="https://cal.com/frpboy/strategy"
                style={ctaLink}
              >
                Book a Free Strategy Call →
              </Link>
            </Section>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              Sent by Ashique Digital<br />
              Brand Strategist & Lead Gen Consultant<br />
              <Link href="https://ashique.digital" style={{ color: "#00c2cb" }}>ashique.digital</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "40px auto",
  width: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #e9ecef",
};

const header = {
  padding: "40px 0",
  textAlign: "center" as const,
  borderBottom: "1px solid #e9ecef",
};

const logo = {
  fontSize: "20px",
  fontWeight: "800",
  color: "#0d1b2a",
  margin: "0",
  letterSpacing: "0.1em",
};

const content = {
  padding: "40px",
};

const h1 = {
  fontSize: "24px",
  color: "#0d1b2a",
  fontWeight: "700",
  marginBottom: "24px",
};

const text = {
  fontSize: "16px",
  color: "#1a1a2e",
  lineHeight: "1.7",
  marginBottom: "20px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#00c2cb",
  borderRadius: "8px",
  color: "#0d1b2a",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
};

const hr = {
  borderColor: "#e9ecef",
  margin: "40px 0",
};

const ctaSection = {
  backgroundColor: "#f8f9fa",
  padding: "32px",
  borderRadius: "12px",
  textAlign: "center" as const,
};

const h2 = {
  fontSize: "20px",
  color: "#0d1b2a",
  fontWeight: "700",
  margin: "0 0 12px 0",
};

const ctaText = {
  fontSize: "15px",
  color: "#64748b",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const ctaLink = {
  fontSize: "16px",
  color: "#00c2cb",
  fontWeight: "700",
  textDecoration: "none",
};

const footer = {
  padding: "32px 40px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "13px",
  color: "#94a3b8",
  lineHeight: "1.8",
};
