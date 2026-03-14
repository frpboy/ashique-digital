"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

const BrokenNode = dynamic(() => import("@/components/visuals/BrokenNode"), { ssr: false });

export default function NotFound() {
  return (
    <main 
      className="px-6"
      style={{ 
        width: "100%",
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "radial-gradient(circle at center, #ffffff 0%, #F8F9FA 100%)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Grain Overlay */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 2
        }}
      />

      {/* 1. Immersive 3D Visual Anchor */}
      <div aria-label="Broken System Error Visualization" style={{ width: "100%", maxWidth: "800px", marginBottom: "2rem", pointerEvents: "none" }}>
        <BrokenNode />
      </div>

      {/* 2. Editorial Typography Block */}
      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
           style={{ fontFamily: "var(--font-heading)" }}
        >
          {/* Label style - technical magazine look */}
          <div style={{ 
            fontSize: "clamp(0.75rem, 2vw, 0.875rem)", 
            fontWeight: 500, 
            color: "var(--color-primary)", 
            textTransform: "uppercase",
            letterSpacing: "0.5em",
            opacity: 0.6,
            marginBottom: "0.75rem"
          }}>
            Lost in the
          </div>
          
          <h1 
            style={{ 
              fontSize: "clamp(3rem, 10vw, 9rem)", 
              lineHeight: 0.9, 
              color: "var(--color-accent)", 
              fontWeight: 800,
              letterSpacing: "-0.05em",
              margin: "0 auto"
            }}
          >
            WRONG<br />FUNNEL
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ 
            color: "var(--color-text-muted)", 
            fontSize: "clamp(1rem, 2.5vw, 1.125rem)", 
            lineHeight: 1.6, 
            maxWidth: "32rem",
            margin: "1.5rem auto 0",
            fontWeight: 500,
            textWrap: "balance" as any
          }}
        >
          The growth system you were looking for doesn&apos;t exist at this location. Let&apos;s get your acquisition strategy back on track.
        </motion.p>

        {/* 3. Refined Elegant Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link 
            href="/" 
            aria-label="Return to Home"
            className="btn btn-primary w-full sm:w-auto" 
            style={{ 
              gap: "0.5rem",
              padding: "0.75rem 2rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              borderRadius: "2px",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}
          >
            <Home size={16} /> Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            aria-label="Go back to previous page"
            className="w-full sm:w-auto"
            style={{ 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem 2rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              borderRadius: "2px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              background: "transparent",
              border: "1px solid rgba(13, 27, 42, 0.2)",
              color: "var(--color-primary)",
              cursor: "pointer"
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </motion.div>
      </div>
    </main>
  );
}
