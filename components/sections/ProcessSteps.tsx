const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Deep-dive into your business, your goals, your gaps, and your current marketing reality.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Build a custom growth roadmap — channels, messaging, funnel structure, and KPIs.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Launch campaigns, build funnels, and activate systems with precision and speed.",
  },
  {
    number: "04",
    title: "Optimise",
    description:
      "Track, test, and scale what's working. Kill what isn't. Your growth compounds.",
  },
];

export function ProcessSteps() {
  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container">
        <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <span className="accent-line" style={{ margin: "0 auto 1rem" }} />
          <h2>How Working With Me Looks</h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "44ch", margin: "1rem auto 0", fontSize: "1.0625rem" }}>
            A simple, repeatable process designed to get results fast, then make them permanent.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0",
            position: "relative",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              style={{
                padding: "2rem",
                position: "relative",
                borderLeft: i !== 0 ? "1px solid var(--color-muted)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "3.5rem",
                  color: "rgba(0,194,203,0.15)",
                  lineHeight: 1,
                  marginBottom: "1rem",
                  letterSpacing: "-0.04em",
                }}
              >
                {step.number}
              </div>
              <h3 style={{ marginBottom: "0.75rem", fontSize: "1.125rem" }}>{step.title}</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                {step.description}
              </p>
              {/* Connector dot */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "2.5rem",
                    right: "-6px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    zIndex: 1,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
