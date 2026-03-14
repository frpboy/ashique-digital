"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react";
import posthog from "posthog-js";

const NeuralCore = dynamic(() => import("../visuals/NeuralCore"), {
  ssr: false,
  loading: () => <div className="animate-pulse" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(0,194,203,0.03) 0%, transparent 70%)" }} />,
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
        paddingTop: "clamp(6rem, 15vw, 10rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        background: "var(--color-bg)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div aria-label="Hero Growth System Animation" style={{ 
        position: "absolute", 
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-end", // Desktop: Right-aligned
          alignItems: "center"
        }} className="hero-lattice-container">
          <div style={{
            width: "clamp(300px, 50vw, 800px)",
            height: "100%",
            opacity: "var(--lattice-opacity, 1)",
            position: "relative"
          }}>
             <NeuralCore />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .hero-lattice-container {
            justify-content: center !important;
          }
          :root {
            --lattice-opacity: 0.2;
          }
        }
      `}</style>

      <div className="container mx-auto px-6">
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
            fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "var(--color-primary)",
            maxWidth: "18ch",
            marginBottom: "1.75rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          Stop Running{" "}
          <span style={{ color: "var(--color-accent)" }}>Ads.</span> <br className="hidden md:block" /> Start
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
                bottom: "5%",
                left: 0,
                right: 0,
                height: "clamp(4px, 1vw, 8px)",
                background: "var(--color-accent)",
                borderRadius: "2px",
                opacity: 0.8
              }}
            />
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            color: "var(--color-text-muted)",
            maxWidth: "52ch",
            lineHeight: 1.6,
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
          className="flex flex-col sm:flex-row gap-4 mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.5s",
            maxWidth: "max-content"
          }}
        >
          <Link
            href={process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/frpboy/strategy"}
            className="btn btn-primary w-full sm:w-auto"
            style={{ 
              gap: "0.5rem", 
              justifyContent: "center",
              padding: "0.875rem 2rem"
            }}
            onClick={() => posthog.capture("hero_cta_clicked", { cta: "book_strategy_call", location: "hero" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Strategy Call
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/case-studies"
            className="btn btn-secondary w-full sm:w-auto justify-center"
            style={{ padding: "0.875rem 2rem" }}
            onClick={() => posthog.capture("hero_cta_clicked", { cta: "see_my_work", location: "hero" })}
          >
            See My Work
          </Link>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap gap-x-8 gap-y-4"
          style={{
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
