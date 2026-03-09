"use client";

import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowLeft, ArrowRight, Share2, Linkedin, MessageCircle } from "lucide-react";

export default function ContactSuccessPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--color-bg)" }}>
      <div 
        style={{ 
          maxWidth: "600px", 
          width: "100%", 
          textAlign: "center",
          background: "#fff",
          padding: "4rem 2rem",
          borderRadius: "16px",
          border: "1px solid var(--color-muted)",
          boxShadow: "0 20px 50px rgba(13,27,42,0.08)"
        }}
      >
        <div style={{ width: "160px", height: "160px", margin: "0 auto 1.5rem" }}>
          <DotLottieReact
            src="https://lottie.host/9036f0e3-e5d0-4966-898e-490333d4f4e7/p6lV3X8P7u.lottie"
            autoplay
          />
        </div>

        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", lineHeight: 1.1 }}>
          Message <span style={{ color: "var(--color-accent)" }}>Received.</span>
        </h1>
        
        <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
          You&apos;ve taken the first step toward a predictable growth engine. 
          I&apos;ll personally review your details and get back to you within <strong>24 business hours.</strong>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link href="/" className="btn btn-primary" style={{ justifyContent: "center", padding: "1rem" }}>
            <ArrowLeft size={18} /> Back to Growth Engine
          </Link>
          
          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--color-muted)" }}>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-primary)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              While you wait...
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
              <Link href="/case-studies" className="btn btn-secondary" style={{ fontSize: "0.875rem", padding: "0.75rem" }}>
                Browse Case Studies
              </Link>
              <Link href="/insights" className="btn btn-secondary" style={{ fontSize: "0.875rem", padding: "0.75rem" }}>
                Read Growth Insights
              </Link>
            </div>
          </div>

          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
            <a href="https://linkedin.com/in/ashique" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#0077b5"}>
              <Linkedin size={20} />
            </a>
            <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#25d366"}>
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
