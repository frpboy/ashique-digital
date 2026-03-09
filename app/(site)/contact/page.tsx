"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Clock, MessageSquare, ArrowRight } from "lucide-react";

const callPoints = [
  "30 minutes — no commitment, no sales pitch",
  "We'll audit your current marketing and funnel",
  "I'll tell you exactly what's working and what isn't",
  "You'll take away 2–3 specific, actionable steps",
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", businessType: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("done");
        setForm({ name: "", email: "", businessType: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <CheckCircle size={48} style={{ color: "var(--color-accent)", marginBottom: "1rem" }} />
        <h3 style={{ marginBottom: "0.75rem" }}>Got your message!</h3>
        <p style={{ color: "var(--color-text-muted)" }}>I&apos;ll be in touch within 24 hours. Or if you&apos;d prefer, book a call directly:</p>
        <a href="https://cal.com/ashique/strategy" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: "1.25rem", gap: "0.5rem" }}>
          Book a Call Now <ArrowRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Honeypot */}
      <input type="text" name="website" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Your Name *</label>
          <input className="input" type="text" required placeholder="Rahul Mehta" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Email *</label>
          <input className="input" type="email" required placeholder="rahul@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Business Type *</label>
        <input className="input" type="text" required placeholder="e.g. D2C Brand, SaaS, Service Business" value={form.businessType} onChange={e => setForm(f => ({ ...f, businessType: e.target.value }))} />
      </div>
      <div>
        <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>What are you looking to achieve? *</label>
        <textarea className="input" required placeholder="Tell me about your current situation and what you want to change..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4} />
      </div>
      {status === "error" && <p className="error-msg">Something went wrong. Please try again or email ashique@ashique.digital</p>}
      <button type="submit" className="btn btn-primary" disabled={status === "loading"} style={{ justifyContent: "center" }}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--color-bg)" }}>
        <div className="container">
          <span className="tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Let&apos;s Talk</span>
          <h1 style={{ maxWidth: "16ch", marginBottom: "1.5rem" }}>
            Ready to turn your marketing into{" "}
            <span style={{ color: "var(--color-accent)" }}>a growth engine?</span>
          </h1>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
          }}
        >
          {/* Left: Info */}
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Book a Free 30-Minute Strategy Call</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
              {callPoints.map((point) => (
                <div key={point} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <CheckCircle size={18} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
                  <p style={{ color: "var(--color-text-muted)" }}>{point}</p>
                </div>
              ))}
            </div>

            <a
              href="https://cal.com/ashique/strategy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ gap: "0.5rem", display: "inline-flex" }}
            >
              <Clock size={16} /> Schedule on Cal.com
            </a>

            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--color-muted)" }}>
              <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MessageSquare size={16} style={{ color: "var(--color-accent)" }} />
                Prefer to email?
              </p>
              <a href="mailto:ashique@ashique.digital" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                ashique@ashique.digital
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              background: "var(--color-bg)",
              borderRadius: "8px",
              padding: "2rem",
              border: "1px solid var(--color-muted)",
            }}
          >
            <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "1.5rem" }}>Or send a message directly</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
