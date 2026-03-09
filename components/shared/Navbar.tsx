"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-muted)" : "1px solid transparent",
      }}
    >
      <div
        className="container mx-auto"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "5rem",
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 flex-shrink-0"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "1.25rem",
            color: "var(--color-primary)",
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          Ashique<span style={{ color: "var(--color-accent)" }}>-</span>Digital
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    color: "var(--color-primary)",
                    transition: "color 0.2s ease",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/frpboy/strategy"}
            className="btn btn-primary"
            style={{ fontSize: "0.875rem", padding: "0.65rem 1.5rem" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Free Call
          </Link>
        </nav>

        {/* Mobile / Tablet Toggle & Call (Tablet scale) */}
        <div className="flex lg:hidden items-center gap-4">
          <Link
            href={process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/frpboy/strategy"}
            className="btn btn-primary hidden sm:inline-flex"
            style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Now
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
            }}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            borderTop: "1px solid var(--color-muted)",
            padding: "2rem 1.5rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            zIndex: 99,
          }}
          className="lg:hidden"
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "1.125rem",
                    color: "var(--color-primary)",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/frpboy/strategy"}
            className="btn btn-primary"
            style={{ width: "100%", textAlign: "center", justifyContent: "center" }}
            onClick={() => setOpen(false)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Free Strategy Call
          </Link>
        </div>
      )}
    </header>
  );
}
