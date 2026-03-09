"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/types";

export function StudyCard({
  study,
}: {
  study: Partial<CaseStudy> & { _id: string; slug?: { current: string } };
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/case-studies/${study.slug?.current ?? "#"}`}
      style={{ textDecoration: "none" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--color-primary)",
          borderRadius: "8px",
          padding: "2rem",
          height: "100%",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 12px 40px rgba(0,194,203,0.2)"
            : "none",
        }}
      >
        <div className="tag" style={{ marginBottom: "1.25rem" }}>
          {study.clientIndustry}
        </div>
        {study.metrics && study.metrics[0] && (
          <>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "var(--color-accent)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                letterSpacing: "-0.03em",
              }}
            >
              {study.metrics[0].value}
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.875rem",
                marginBottom: "1.25rem",
              }}
            >
              {study.metrics[0].label}
            </p>
          </>
        )}
        <h3 style={{ color: "#fff", fontSize: "1.0625rem", marginBottom: "1.5rem" }}>
          {study.title}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--color-accent)",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          Read Case Study <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
