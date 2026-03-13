"use client";

import Link from "next/link";
import { CheckCircle, Home, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <main style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "var(--color-bg)",
      padding: "2rem"
    }}>
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <div style={{ 
          width: "80px", 
          height: "80px", 
          borderRadius: "50%", 
          background: "rgba(0,194,203,0.1)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          margin: "0 auto 2rem",
          color: "var(--color-accent)"
        }}>
          <CheckCircle size={40} />
        </div>
        
        <h1 style={{ marginBottom: "1rem", fontSize: "clamp(2rem, 5vw, 2.5rem)" }}>
          Growth engine <br />
          <span style={{ color: "var(--color-accent)" }}>Ignited.</span>
        </h1>
        
        <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          Success! Your request has been confirmed. Whether it&apos;s a message or a strategy call booking, I usually follow up within 24 hours. Keep an eye on your inbox.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a 
            href="https://linkedin.com/in/ashique-mp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            style={{ gap: "0.5rem", width: "100%", justifyContent: "center", padding: "1rem" }}
          >
            Connect on LinkedIn <ArrowRight size={18} />
          </a>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/" className="btn btn-secondary" style={{ gap: "0.5rem", flex: 1, padding: "1rem" }}>
              <Home size={18} /> Home
            </Link>
            <Link href="/insights" className="btn btn-secondary" style={{ gap: "0.5rem", flex: 1, padding: "1rem" }}>
              Insights
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
