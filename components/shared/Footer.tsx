"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Brand Strategy", href: "/services#brand-strategy" },
    { label: "Lead Generation", href: "/services#lead-generation" },
    { label: "Funnel Design", href: "/services#funnel-design" },
    { label: "Paid Ads Strategy", href: "/services#paid-ads" },
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
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
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
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer style={{ background: "var(--color-primary)", color: "#fff" }}>
      {/* Main Footer Grid */}
      <div
        className="container"
        style={{
          paddingTop: "4rem",
          paddingBottom: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "3rem",
        }}
      >
        {/* Brand Block */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "1.25rem",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Ashique
            <span style={{ color: "var(--color-accent)", margin: "0 0.2rem" }}>·</span>
            Digital
          </p>
          <p
            style={{
              color: "var(--color-text-on-dark)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              maxWidth: "220px",
            }}
          >
            Building growth systems that scale. Not just campaigns that run.
          </p>

          {/* Newsletter */}
          <div style={{ marginTop: "2rem" }}>
            <p
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Weekly Growth Insights
            </p>
            {status === "done" ? (
              <p style={{ color: "var(--color-accent)", fontSize: "0.875rem" }}>
                ✓ You&apos;re on the list!
              </p>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    padding: "0.625rem 0.875rem",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "0.875rem",
                    outline: "none",
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    padding: "0.625rem 0.875rem",
                    background: "var(--color-accent)",
                    color: "var(--color-primary)",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            {status === "error" && (
              <p style={{ color: "#f87171", fontSize: "0.8125rem", marginTop: "0.5rem" }}>
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <p
              style={{
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "1.25rem",
              }}
            >
              {group}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--color-text-on-dark)",
                      fontSize: "0.9rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-on-dark)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        className="container"
        style={{
          paddingTop: "1.5rem",
          paddingBottom: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p style={{ color: "var(--color-text-on-dark)", fontSize: "0.875rem" }}>
          © {new Date().getFullYear()} Ashique. All rights reserved.
        </p>
        <p style={{ color: "var(--color-text-on-dark)", fontSize: "0.875rem" }}>
          ashique.digital — Brand Strategy & Lead Generation
        </p>
      </div>
    </footer>
  );
}
