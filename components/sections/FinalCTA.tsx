import { ArrowRight, CalendarDays } from "lucide-react";
import BookingEmbed from "@/components/shared/BookingEmbed";

export function FinalCTA() {
  return (
    <section
      className="dark-section section"
      style={{ textAlign: "center", padding: "6rem 0" }}
    >
      <div className="container">
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <CalendarDays
            size={36}
            style={{ color: "var(--color-accent)", marginBottom: "1.5rem" }}
          />
          <h2 style={{ color: "#fff", marginBottom: "1rem" }}>
            Ready to turn your marketing into a{" "}
            <span style={{ color: "var(--color-accent)" }}>growth engine?</span>
          </h2>
          <p
            style={{
              color: "var(--color-text-on-dark)",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            Book a free 30-minute strategy call. No commitment. No pitch.
            Just clarity on what&apos;s working, what&apos;s broken, and your next best move.
          </p>
          <div style={{ marginTop: "3rem", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem", overflow: "hidden" }}>
            <BookingEmbed />
          </div>
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            No credit card. No cold call. Just a real conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
