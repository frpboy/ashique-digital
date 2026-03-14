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

import { motion, AnimatePresence } from "framer-motion";

export default function FreeAuditPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    businessName: "", 
    budget: "", 
    challenge: "",
    fax_number: "" 
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    
    try {
      const res = await fetch("/api/free-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        posthog.identify(form.email, { email: form.email, name: form.name, business_name: form.businessName });
        posthog.capture("audit_requested", {
          budget: form.budget,
          challenge: form.challenge,
          business_name: form.businessName,
        });
        setStatus("done");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Connection failed. Please check your internet.");
    }
  };

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is included in the 15-Point Growth Audit?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The audit includes a comprehensive diagnostic of your lead generation funnel, ad spend efficiency (ROAS), landing page conversion rate optimization (CRO), and a 12-month growth roadmap."
                }
              },
              {
                "@type": "Question",
                "name": "How can this audit reduce my CAC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "By identifying leaks in your funnel and optimizing your 'Speed to Lead' metrics, the audit provides actionable steps to lower your Customer Acquisition Cost (CAC) by up to 40%."
                }
              },
              {
                "@type": "Question",
                "name": "Is this audit specific to Indian businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, while the growth principles are global, the audit is specifically optimized for Indian SMEs and high-growth startups operating in the unique Indian digital ecosystem."
                }
              }
            ]
          }),
        }}
      />

      <div style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <Link href="/" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1875rem", color: "var(--color-primary)", display: "inline-block", marginBottom: "2rem" }}>
            Ashique<span style={{ color: "var(--color-accent)" }}> · </span>Digital
          </Link>
          <span className="tag" style={{ display: "inline-block", marginBottom: "1rem" }}>Free Growth Audit</span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem", lineHeight: 1.1 }}>
            Get your free{" "}
            <span style={{ color: "var(--color-accent)" }}>15-Point Lead Gen Audit</span>
          </h1>
          <p style={{ color: "var(--color-text-muted)", lineHeight: 1.75, maxWidth: "42ch", margin: "0 auto" }}>
            Answer 5 quick questions and I&apos;ll send you a personalised audit covering your funnel and ads — delivered to your inbox.
          </p>
        </motion.div>

        {/* Form Container */}
        <div style={{ background: "#fff", padding: "clamp(1.5rem, 5vw, 2.5rem)", borderRadius: "16px", border: "1px solid var(--color-muted)", boxShadow: "0 20px 50px rgba(13, 27, 42, 0.04)" }}>
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "2rem 0" }}
              >
                <div style={{ width: "64px", height: "64px", background: "rgba(0, 194, 203, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <CheckCircle size={32} style={{ color: "var(--color-accent)" }} />
                </div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Success! Your 19-page audit is heading to your inbox.</h2>
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  While you wait, check out how we solved the CAC crisis for other SMEs.
                </p>
                <Link href="/case-studies" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Check out Case Studies</Link>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                exit={{ opacity: 0, y: 20 }}
                onSubmit={handleSubmit} 
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                {/* Honeypot */}
                <input 
                  type="text" 
                  name="fax_number" 
                  value={form.fax_number} 
                  onChange={e => setForm(f => ({ ...f, fax_number: e.target.value }))} 
                  style={{ display: "none" }} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.8125rem", marginBottom: "0.5rem", color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Name *</label>
                    <input className="input" type="text" required placeholder="Rahul Mehta" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.8125rem", marginBottom: "0.5rem", color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email *</label>
                    <input className="input" type="email" required placeholder="rahul@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.8125rem", marginBottom: "0.5rem", color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Business Name *</label>
                  <input className="input" type="text" required placeholder="Your Company" value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.8125rem", marginBottom: "0.5rem", color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Marketing Budget</label>
                  <select className="input" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
                    <option value="">Select range...</option>
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.8125rem", marginBottom: "0.5rem", color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Biggest Challenge *</label>
                  <select className="input" required value={form.challenge} onChange={e => setForm(f => ({ ...f, challenge: e.target.value }))}>
                    <option value="">Select your challenge...</option>
                    {challenges.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {status === "error" && (
                  <p className="error-msg" style={{ padding: "0.75rem", background: "rgba(239, 68, 68, 0.05)", borderRadius: "4px", textAlign: "center" }}>{errorMessage}</p>
                )}
                <button type="submit" className="btn btn-primary" disabled={status === "loading"} style={{ justifyContent: "center", gap: "0.75rem", padding: "1rem" }}>
                  {status === "loading" ? "Processing..." : <>Send My Free Audit <ArrowRight size={18} /></>}
                </button>
                <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  Zero spam. Your data is protected by my <Link href="/privacy" style={{ textDecoration: "underline" }}>Privacy Policy</Link>.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>

      {/* The 15-Point Blueprint Section */}
      <section style={{ padding: "8rem 0", background: "#fff", borderTop: "1px solid var(--color-muted)" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span className="accent-line" style={{ margin: "0 auto 1.5rem" }} />
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1.5rem", letterSpacing: "-0.03em" }}>The Engine Mindset vs.<br /> The <span style={{ color: "var(--color-accent)" }}>Campaign Mindset</span></h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", maxWidth: "65ch", margin: "0 auto", lineHeight: 1.8 }}>
              Most businesses treat marketing as a series of isolated sprints. I build interconnected machines. 
              The 15-point audit is a diagnostic tool designed to pinpoint exactly where your growth engine is leaking.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
             {/* Pillar 1 */}
             <div style={{ padding: "2rem", background: "var(--color-bg)", borderRadius: "12px", border: "1px solid var(--color-muted)" }}>
                <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                   <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem" }}>01</span>
                   Brand Infrastructure
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                   {[
                      { t: "ICP Definition", d: "Zeroing in on the high-intent buyers who profit most from your service." },
                      { t: "The 5-Second UVP", d: "Pass the 'squint test' — can a stranger understand your value in 5 seconds?" },
                      { t: "Market Resonance", d: "Messaging that mirrors the actual pain points your customers feel." },
                      { t: "Proof Hierarchy", d: "Leading with outcomes and quantifiable ROI, not just features." }
                   ].map((item, i) => (
                      <li key={i}>
                         <p style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.25rem", color: "var(--color-primary)" }}>{item.t}</p>
                         <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{item.d}</p>
                      </li>
                   ))}
                </ul>
             </div>

             {/* Pillar 2 */}
             <div style={{ padding: "2rem", background: "var(--color-bg)", borderRadius: "12px", border: "1px solid var(--color-muted)" }}>
                <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                   <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem" }}>02</span>
                   Conversion Funnel
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                   {[
                      { t: "The Value Hook", d: "Replacing 'cold asks' with high-value strategic exchanges." },
                      { t: "Landing Page Friction", d: "Optimizing the point of commitment by removing cognitive load." },
                      { t: "Mobile Velocity", d: "Ensuring 3-second load times on 4G — the speed of trust." },
                      { t: "The 'Thank You' Bridge", d: "Capturing intent immediately through Cal.com or WhatsApp." }
                   ].map((item, i) => (
                      <li key={i}>
                         <p style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.25rem", color: "var(--color-primary)" }}>{item.t}</p>
                         <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{item.d}</p>
                      </li>
                   ))}
                </ul>
             </div>

             {/* Pillar 3 */}
             <div style={{ padding: "2rem", background: "var(--color-bg)", borderRadius: "12px", border: "1px solid var(--color-muted)" }}>
                <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                   <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem" }}>03</span>
                   Traffic & Data
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                   {[
                      { t: "Pixel & API Health", d: "Securing the lifeblood of AI learning with robust server-side tracking." },
                      { t: "Commercial Intent", d: "Prioritizing buyers over browsers through diagnostic keyword targeting." },
                      { t: "Creative Fatigue", d: "A rigid refresh schedule to defeat ad decay every 21 days." },
                      { t: "Negative Filtering", d: "Purging junk clicks to protect your budget and AI training data." }
                   ].map((item, i) => (
                      <li key={i}>
                         <p style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.25rem", color: "var(--color-primary)" }}>{item.t}</p>
                         <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{item.d}</p>
                      </li>
                   ))}
                </ul>
             </div>
          </div>

          <div style={{ marginTop: "4rem", display: "flex", justifyContent: "center" }}>
             <div style={{ maxWidth: "500px", background: "var(--color-primary)", borderRadius: "12px", padding: "2.5rem", color: "#fff", textAlign: "center" }}>
                <h3 style={{ color: "#fff", marginBottom: "1rem" }}>The Profit Feedback Loop</h3>
                <p style={{ color: "var(--color-text-on-dark)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                   The final stage of the 15-point system: Closing the loop between your CRM and Ad Platforms. 
                   We stop scaling on vanity metrics (leads) and start scaling on real ROI (closed sales).
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
                   <div style={{ textAlign: "center" }}>
                      <p style={{ color: "var(--color-accent)", fontWeight: 800, fontSize: "1.25rem" }}>13</p>
                      <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Speed to Lead</p>
                   </div>
                   <div style={{ textAlign: "center" }}>
                      <p style={{ color: "var(--color-accent)", fontWeight: 800, fontSize: "1.25rem" }}>14</p>
                      <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Multi-Nurture</p>
                   </div>
                   <div style={{ textAlign: "center" }}>
                      <p style={{ color: "var(--color-accent)", fontWeight: 800, fontSize: "1.25rem" }}>15</p>
                      <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>ROI Closing</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Final Section for trust */}
      <section style={{ padding: "5rem 0", background: "var(--color-bg)" }}>
         <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>A Blueprint for Indian SMEs</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
               I spend ₹X Lakhs monthly for my clients. I know exactly where the money leaks. 
               Get the diagnostic before you spend your next ₹1.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn btn-primary"
            >
              Get My Audit Now <ArrowRight size={18} />
            </button>
         </div>
      </section>
    </>
  );
}
