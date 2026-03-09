"use client";

import dynamic from "next/dynamic";

const NeuralCore = dynamic(() => import("../visuals/NeuralCore"), {
  ssr: false,
});

export function ProblemBlock() {
  return (
    <section className="dark-section section">
      <div className="container">
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          
          <div style={{ margin: "0 auto 1.5rem", width: "240px" }}>
            <NeuralCore />
          </div>

          <span className="tag" style={{ background: "rgba(0,194,203,0.15)", color: "var(--color-accent)", marginBottom: "1.5rem", display: "inline-block" }}>
            The Real Problem
          </span>
          <h2 style={{ color: "#fff", marginBottom: "1.5rem" }}>
            Most businesses don&apos;t have a marketing problem.
            They have a <span style={{ color: "var(--color-accent)" }}>systems problem.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.8, color: "var(--color-text-on-dark)", marginBottom: "2.5rem" }}>
            No clear funnel. No tracking. No strategy. Just spend and hope. You&apos;re not getting
            bad results because your product isn&apos;t good enough — you&apos;re getting them because
            the growth infrastructure isn&apos;t built yet.
          </p>
          <div
            style={{
              display: "inline-block",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "var(--color-accent)",
            }}
          >
            That&apos;s where I come in.
          </div>
        </div>
      </div>
    </section>
  );
}

