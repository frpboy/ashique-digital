import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface LeadNotificationProps {
  name: string;
  email: string;
  businessType: string;
  message: string;
}

export const LeadNotification = ({
  name,
  email,
  businessType,
  message,
}: LeadNotificationProps) => (
  <Html>
    <Head />
    <Preview>New Lead from {name} — ashique.digital</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>New Growth Inquiry</Heading>
        </Section>
        <Section style={section}>
          <Text style={label}>Lead Name</Text>
          <Text style={value}>{name}</Text>
          
          <Text style={label}>Email Address</Text>
          <Text style={value}>{email}</Text>
          
          <Text style={label}>Business Context</Text>
          <Text style={value}>{businessType}</Text>
          
          <Hr style={hr} />
          
          <Text style={label}>Strategic Requirement</Text>
          <Text style={messageBox}>{message}</Text>
        </Section>
        <Section style={footer}>
          <Text style={footerText}>
            Sent via ashique.digital growth engine. Reply to this email to respond directly to the lead.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

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
  backgroundColor: "#0d1b2a",
  padding: "40px 0",
  textAlign: "center" as const,
};

const h1 = {
  color: "#00c2cb",
  fontSize: "24px",
  fontWeight: "800",
  margin: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const section = {
  padding: "40px",
};

const label = {
  fontSize: "12px",
  color: "#64748b",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: "4px",
};

const value = {
  fontSize: "16px",
  color: "#0d1b2a",
  marginBottom: "20px",
  fontWeight: "500",
};

const messageBox = {
  fontSize: "15px",
  color: "#1a1a2e",
  lineHeight: "1.6",
  backgroundColor: "#f8f9fa",
  padding: "20px",
  borderRadius: "6px",
  border: "1px solid #e9ecef",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e9ecef",
  margin: "20px 0",
};

const footer = {
  padding: "24px 40px",
  backgroundColor: "#f8f9fa",
};

const footerText = {
  fontSize: "12px",
  color: "#94a3b8",
  textAlign: "center" as const,
  lineHeight: "1.5",
};
