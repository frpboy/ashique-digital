"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react";

const GrowthSphere = dynamic(() => import("../visuals/GrowthSphere"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", top: 0, right: 0, width: "50vw", height: "100%", background: "radial-gradient(circle, rgba(0,194,203,0.05) 0%, transparent 70%)" }} />,
});

const trustBadges = [
  { icon: <TrendingUp size={16} />, label: "50+ Brands Scaled" },
  { icon: <Users size={16} />, label: "₹2Cr+ Revenue Generated" },
  { icon: <Award size={16} />, label: "Google & Meta Certified" },
];

export function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        paddingTop: "9rem",
        paddingBottom: "5rem",
        background: "var(--color-bg)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <GrowthSphere />


      <div className="container">
        {/* Pre-headline tag */}
        <div
          className="tag"
          style={{
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.1s",
          }}
        >
          Brand Strategist & Lead Generation Consultant
        </div>

        {/* Main headline — Typographic brutalism */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--color-primary)",
            maxWidth: "14ch",
            marginBottom: "1.75rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          Stop Running{" "}
          <span style={{ color: "var(--color-accent)" }}>Ads.</span> Start
          Building a{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            Growth System.
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: 4,
                left: 0,
                right: 0,
                height: 4,
                background: "var(--color-accent)",
                borderRadius: "2px",
              }}
            />
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--color-text-muted)",
            maxWidth: "52ch",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.35s",
          }}
        >
          I help SMEs and startups generate qualified leads, design
          high-converting funnels, and turn digital marketing into a{" "}
          <strong style={{ color: "var(--color-primary)" }}>
            predictable revenue engine.
          </strong>
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.5s",
          }}
        >
          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ gap: "0.5rem" }}
          >
            Book a Free Strategy Call
            <ArrowRight size={16} />
          </Link>
          <Link href="/case-studies" className="btn btn-secondary">
            See My Work
          </Link>
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.6s ease 0.65s",
          }}
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--color-text-muted)",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "var(--color-accent)" }}>{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
