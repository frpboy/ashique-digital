import React from "react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <main style={{ 
      background: "var(--color-bg)", 
      paddingTop: "clamp(6rem, 15vw, 10rem)",
      paddingBottom: "4rem",
      minHeight: "100vh"
    }}>
      <div className="container mx-auto">
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <header style={{ marginBottom: "4rem", borderBottom: "1px solid var(--color-muted)", paddingBottom: "2rem" }}>
            <span className="tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Legal Documentation</span>
            <h1 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--color-primary)",
              marginBottom: "1rem"
            }}>
              {title}
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", fontStyle: "italic" }}>
              Last Updated: {lastUpdated}
            </p>
          </header>

          <div style={{ 
            color: "var(--color-text-muted)", 
            lineHeight: 1.8, 
            fontSize: "1.0625rem" 
          }}>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2 style={{ 
        color: "var(--color-primary)", 
        fontSize: "1.25rem", 
        fontWeight: 700, 
        marginBottom: "1.25rem",
        fontFamily: "var(--font-heading)",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {children}
      </div>
    </section>
  );
}
