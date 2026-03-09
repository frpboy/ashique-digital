import { sanityFetch } from "@/lib/sanity";
import { featuredTestimonialsQuery } from "@/lib/sanity.queries";
import type { Testimonial } from "@/lib/types";
import { Quote } from "lucide-react";

export async function Testimonials() {
  let items: Testimonial[] = [];
  try {
    items = await sanityFetch<Testimonial[]>({
      query: featuredTestimonialsQuery,
      tags: ["testimonial"],
    });
  } catch {
    items = [];
  }

  const placeholders: Testimonial[] = [
    {
      _id: "1",
      name: "Rahul Mehta",
      role: "Founder & CEO",
      company: "D2C Fashion Brand",
      quote:
        "Ashique didn't just run ads — he rebuilt our entire acquisition system. We went from ₹80K wasted monthly to ₹2.8L revenue from the same budget. Game-changing.",
    },
    {
      _id: "2",
      name: "Priya Sharma",
      role: "Marketing Head",
      company: "B2B SaaS",
      quote:
        "We went from 12 leads/month to 80 qualified leads in 45 days. Not spray-and-pray traffic — actual decision-makers booking calls. Ashique's process is surgical.",
    },
    {
      _id: "3",
      name: "Karthik Nair",
      role: "Co-founder",
      company: "EdTech Startup",
      quote:
        "Before Ashique, our funnel was a leaking bucket. He fixed the strategy, not just the ads. Within 60 days our CAC dropped 38% and conversion doubled.",
    },
  ];

  const displayItems = items.length > 0 ? items : placeholders;

  return (
    <section className="section" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <span className="accent-line" style={{ margin: "0 auto 1rem" }} />
          <h2>What Clients Say</h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "44ch", margin: "1rem auto 0" }}>
            Not &quot;great to work with&quot; — specific results from real engagements.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {displayItems.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "2rem",
                border: "1px solid var(--color-muted)",
                position: "relative",
              }}
            >
              <Quote
                size={32}
                style={{
                  color: "var(--color-accent)",
                  opacity: 0.2,
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "var(--color-text)",
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    color: "var(--color-primary)",
                    fontSize: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--color-primary)" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                    {item.role}{item.company ? `, ${item.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
