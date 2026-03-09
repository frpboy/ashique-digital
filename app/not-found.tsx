import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "var(--color-bg)",
      padding: "2rem",
      textAlign: "center"
    }}>
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ 
          fontSize: "clamp(6rem, 20vw, 10rem)", 
          lineHeight: 1, 
          color: "var(--color-primary)", 
          marginBottom: "1.5rem",
          opacity: 0.1,
          fontFamily: "var(--font-heading)"
        }}>
          404
        </h1>
        
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
          Lost in the <span style={{ color: "var(--color-accent)" }}>wrong funnel.</span>
        </h2>
        
        <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "3rem" }}>
          The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on the right growth path.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary" style={{ gap: "0.5rem" }}>
            <Home size={18} /> Back to Homepage
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-secondary" 
            style={{ gap: "0.5rem" }}
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
