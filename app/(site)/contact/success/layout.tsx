import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message Sent | Ashique — ashique.digital",
  description: "Thank you for reaching out. We've received your message and will get back to you shortly.",
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
