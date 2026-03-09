"use client";

export function TrustBar() {
  const logos = [
    "E-commerce Brand",
    "SaaS Startup",
    "D2C Fashion",
    "FinTech Co.",
    "EdTech Platform",
    "Healthcare SME",
  ];

  return (
    <section
      style={{
        background: "#fff",
        borderTop: "1px solid var(--color-muted)",
        borderBottom: "1px solid var(--color-muted)",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            marginBottom: "1.5rem",
          }}
        >
          Trusted by ambitious businesses across India
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {logos.map((name) => (
            <div
              key={name}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.9375rem",
                color: "var(--color-muted)",
                letterSpacing: "-0.01em",
                transition: "color 0.2s ease",
                cursor: "default",
                userSelect: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-muted)")
              }
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
