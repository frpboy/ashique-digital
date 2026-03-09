"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import posthog from "posthog-js";

const footerLinks = {
  Services: [
    { label: "Brand Strategy", href: "/services#brand-strategy" },
    { label: "Lead Generation", href: "/services#lead-generation" },
    { label: "Funnel Design", href: "/services#funnel-design" },
    { label: "Paid Ads Strategy", href: "/services#paid-ads-strategy" },
    { label: "Growth Consulting", href: "/services#growth-consulting" },
  ],
  Company: [
    { label: "About Ashique", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
    { label: "Free Audit", href: "/free-audit" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("done");
        posthog.identify(email, { email });
        posthog.capture("newsletter_subscribed", { email, location: "footer" });
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer style={{ background: "var(--color-primary)", color: "#fff", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Main Footer Content */}
      <div
        className="container mx-auto"
        style={{
          paddingTop: "clamp(3rem, 5vw, 5rem)",
          paddingBottom: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <div 
          style={{
            display: "grid",
            gap: "3rem",
          }}
          className="grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "1.25rem",
                color: "#fff",
                marginBottom: "1.25rem",
                display: "inline-block",
                textDecoration: "none"
              }}
            >
              Ashique<span style={{ color: "var(--color-accent)" }}>-</span>Digital
            </Link>
            <p
              style={{
                color: "var(--color-text-on-dark)",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "300px",
              }}
            >
              Building growth systems that scale. Not just campaigns that run.
            </p>

            {/* Newsletter */}
            <div style={{ maxWidth: "300px" }}>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Weekly Growth Insights
              </p>
              {status === "done" ? (
                <div style={{ padding: "0.625rem", background: "rgba(0,194,203,0.1)", borderRadius: "4px", border: "1px solid var(--color-accent)" }}>
                  <p style={{ color: "var(--color-accent)", fontSize: "0.8125rem", fontWeight: 600 }}>
                    ✓ You&apos;re subscribed!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    style={{
                      flex: 1,
                      padding: "0.625rem 0.875rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "0.875rem",
                      outline: "none",
                      minWidth: 0,
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-primary"
                    style={{
                      padding: "0.625rem 1rem",
                      borderRadius: "6px",
                      boxShadow: "none"
                    }}
                  >
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  marginBottom: "1.5rem",
                }}
              >
                {group}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link"
                      style={{
                        color: "var(--color-text-on-dark)",
                        fontSize: "0.9375rem",
                        transition: "color 0.2s",
                        textDecoration: "none"
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2rem 0" }}>
        <div
          className="container mx-auto"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8125rem", width: "100%", textAlign: "center" }} className="md:w-auto md:text-left">
            © {new Date().getFullYear()} Ashique-Digital. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", width: "100%", justifyContent: "center" }} className="md:w-auto md:justify-end">
             <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8125rem" }}>
                Developed and Designed by <a href="https://github.com/frpboy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)", textDecoration: "none", fontWeight: 600 }}>frpboy</a>
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
