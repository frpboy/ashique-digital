"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, MessageSquare, ArrowRight } from "lucide-react";
import BookingEmbed from "@/components/shared/BookingEmbed";
import posthog from "posthog-js";

const callPoints = [
  "30 minutes — no commitment, no sales pitch",
  "We'll audit your current marketing and funnel",
  "I'll tell you exactly what's working and what isn't",
  "You'll take away 2–3 specific, actionable steps",
];

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", businessType: "", message: "", fax_number: "" });
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
      const data = await res.json();

      if (res.ok) {
        setStatus("done");
        toast.success(data.message || "Message sent successfully!");
        
        posthog.identify(form.email, { email: form.email, name: form.name, business_type: form.businessType });
        posthog.capture("lead_captured", { business_type: form.businessType, source: "contact_form" });
        
        // Brief delay for the success animation before redirecting
        setTimeout(() => {
          router.push("/contact/success");
        }, 1500);
      } else {
        setStatus("error");
        toast.error(data.error || "Something went wrong.");
        console.error("Form error:", data.error);
      }
    } catch (err) {
      setStatus("error");
      toast.error("Connection error. Please try again.");
      console.error("Connection error:", err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center", padding: "2rem 0" }}
          >
            <CheckCircle size={48} style={{ color: "var(--color-accent)", margin: "0 auto 1rem" }} />
            <h4 style={{ color: "var(--color-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>Message Received</h4>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Redirecting you now...</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Honeypot */}
            <input 
              type="text" 
              name="fax_number" 
              value={form.fax_number} 
              onChange={e => setForm(prev => ({ ...prev, fax_number: e.target.value }))} 
              style={{ display: "none" }} 
              tabIndex={-1} 
              autoComplete="off" 
            />

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
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <section style={{ 
        paddingTop: "clamp(6rem, 10vw, 9rem)", 
        paddingBottom: "clamp(3rem, 5vw, 4rem)", 
        background: "var(--color-bg)" 
      }}>
        <div className="container mx-auto">
          <div style={{ textAlign: "left" }} className="md:text-left">
            <span className="tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Let&apos;s Talk</span>
            <h1 style={{ 
              maxWidth: "20ch", 
              marginBottom: "1.5rem",
              fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
              lineHeight: 1.1 
            }}>
              Ready to turn your marketing into{" "}
              <span style={{ color: "var(--color-accent)" }}>a growth engine?</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div
          className="container mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
        >
          {/* Main Grid: Responsive column swap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Left: Info & Cal.com */}
            <div style={{ order: 1 }}>
              <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", marginBottom: "2rem" }}>Book a Free 30-Minute Strategy Call</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
                {callPoints.map((point) => (
                  <div key={point} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <CheckCircle size={18} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "4px" }} />
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>{point}</p>
                  </div>
                ))}
              </div>

              <div style={{ 
                background: "var(--color-bg)", 
                borderRadius: "16px", 
                border: "1px solid var(--color-muted)", 
                padding: "clamp(1rem, 2vw, 1.5rem)", 
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(13, 27, 42, 0.04)"
              }}>
                <BookingEmbed />
              </div>

              <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--color-muted)" }}>
                <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <MessageSquare size={16} style={{ color: "var(--color-accent)" }} />
                  Prefer to email?
                </p>
                <a href="mailto:ashique@ashique.digital" style={{ color: "var(--color-accent)", fontWeight: 600, fontSize: "1.125rem", textDecoration: "underline" }}>
                  ashique@ashique.digital
                </a>
              </div>
            </div>

            {/* Right: Manual Form */}
            <div
              style={{
                background: "var(--color-bg)",
                borderRadius: "16px",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                border: "1px solid var(--color-muted)",
                height: "fit-content",
                order: 2
              }}
              className="lg:sticky lg:top-32"
            >
              <h3 style={{ fontWeight: 800, color: "var(--color-primary)", marginBottom: "0.5rem", fontSize: "1.25rem" }}>Drop a message</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>
                If you prefer typing over talking, use the form below.
              </p>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
