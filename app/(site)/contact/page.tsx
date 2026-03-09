"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, MessageSquare, ArrowRight } from "lucide-react";
import BookingEmbed from "@/components/shared/BookingEmbed";

const callPoints = [
  "30 minutes — no commitment, no sales pitch",
  "We'll audit your current marketing and funnel",
  "I'll tell you exactly what's working and what isn't",
  "You'll take away 2–3 specific, actionable steps",
];

function ContactForm() {
  const router = useRouter();
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
        router.push("/contact/success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Honeypot */}
      <input type="text" name="website" value={form.website} onChange={e => setForm(prev => ({ ...prev, website: e.target.value }))} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Your Name *</label>
          <input className="input" type="text" required placeholder="Rahul Mehta" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Email *</label>
          <input className="input" type="email" required placeholder="rahul@company.com" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>Business Type *</label>
        <input className="input" type="text" required placeholder="e.g. D2C Brand, SaaS, Service Business" value={form.businessType} onChange={e => setForm(prev => ({ ...prev, businessType: e.target.value }))} />
      </div>
      <div>
        <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-primary)" }}>What are you looking to achieve? *</label>
        <textarea className="input" required placeholder="Tell me about your current situation and what you want to change..." value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} rows={4} />
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

            <div style={{ background: "var(--color-bg)", borderRadius: "12px", border: "1px solid var(--color-muted)", padding: "1rem", overflow: "hidden" }}>
              <BookingEmbed />
            </div>

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
