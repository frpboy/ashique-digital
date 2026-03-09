"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import posthog from "posthog-js";

const challenges = [
  "Not generating enough leads",
  "Poor ROAS / ad spend not converting",
  "No clear funnel or strategy",
  "Struggling to differentiate from competitors",
  "Inconsistent revenue / feast-famine cycle",
  "Other",
];

const budgets = ["< ₹20K/month", "₹20K–₹50K/month", "₹50K–₹1L/month", "₹1L+/month", "No active budget yet"];

export default function FreeAuditPage() {
  const [form, setForm] = useState({ name: "", email: "", businessName: "", budget: "", challenge: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          businessType: form.businessName,
          message: `Budget: ${form.budget}\nChallenge: ${form.challenge}`,
        }),
      });
      if (res.ok) {
        posthog.identify(form.email, { email: form.email, name: form.name, business_name: form.businessName });
        posthog.capture("free_audit_submitted", {
          budget: form.budget,
          challenge: form.challenge,
          business_name: form.businessName,
        });
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg)", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <CheckCircle size={56} style={{ color: "var(--color-accent)", marginBottom: "1.5rem" }} />
          <h1 style={{ marginBottom: "1rem" }}>Your audit is on its way!</h1>
          <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Check your inbox for Ashique&apos;s 15-point Lead Generation Audit. If you don&apos;t see it in 5 minutes, check your spam folder.
          </p>
          <Link href="/" className="btn btn-primary">Back to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1875rem", color: "var(--color-primary)", display: "inline-block", marginBottom: "2rem" }}>
            Ashique<span style={{ color: "var(--color-accent)" }}> · </span>Digital
          </Link>
          <span className="tag" style={{ display: "block", marginBottom: "1rem" }}>Free Growth Audit</span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
            Get your free{" "}
            <span style={{ color: "var(--color-accent)" }}>15-Point Lead Generation Audit</span>
          </h1>
          <p style={{ color: "var(--color-text-muted)", lineHeight: 1.75 }}>
            Answer 5 quick questions and I&apos;ll send you a personalised audit covering your funnel, ads, and lead gen strategy — free, no pitch.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", background: "#fff", padding: "2.5rem", borderRadius: "8px", border: "1px solid var(--color-muted)" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Your Name *</label>
            <input className="input" type="text" required placeholder="Rahul Mehta" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Email Address *</label>
            <input className="input" type="email" required placeholder="rahul@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Business Name *</label>
            <input className="input" type="text" required placeholder="Your Company" value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Monthly Marketing Budget</label>
            <select className="input" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
              <option value="">Select range...</option>
              {budgets.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Biggest Challenge *</label>
            <select className="input" required value={form.challenge} onChange={e => setForm(f => ({ ...f, challenge: e.target.value }))}>
              <option value="">Select your challenge...</option>
              {challenges.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {status === "error" && (
            <p className="error-msg">Something went wrong. Please try again.</p>
          )}
          <button type="submit" className="btn btn-primary" disabled={status === "loading"} style={{ justifyContent: "center", gap: "0.5rem" }}>
            {status === "loading" ? "Sending..." : <>Get My Free Audit <ArrowRight size={16} /></>}
          </button>
          <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
            No spam. No pitch. Just your audit — delivered within minutes.
          </p>
        </form>
      </div>
    </div>
  );
}
