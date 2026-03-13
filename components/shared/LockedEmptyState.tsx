"use client";

import { motion } from "framer-motion";
import { Lock, Calendar } from "lucide-react";
import Link from "next/link";

export default function LockedEmptyState({ 
  type = "Case Studies" 
}: { 
  type?: "Case Studies" | "Insights" 
}) {
  return (
    <div className="w-full">
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: type === "Case Studies" ? "repeat(auto-fill, minmax(320px, 1fr))" : "1fr",
          gap: "1.5rem",
          opacity: 0.6
        }}
      >
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="card"
            style={{ 
              background: type === "Case Studies" ? "var(--color-primary)" : "var(--color-bg)", 
              border: type === "Insights" ? "1px solid var(--color-muted)" : "none",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Skeleton Lines */}
            <div className="w-full space-y-3 px-4">
               <div className="h-4 w-1/4 rounded bg-gray-200/20 animate-pulse" />
               <div className="h-6 w-3/4 rounded bg-gray-200/10 animate-pulse" />
               <div className="h-4 w-5/6 rounded bg-gray-200/5 animate-pulse" />
            </div>

            {/* Locked Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-2">
                <Lock size={20} className="text-white/40" />
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Confidential</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Block */}
      <div 
        style={{ 
          marginTop: "3rem", 
          textAlign: "center",
          padding: "2rem",
          background: "rgba(0,194,203,0.03)",
          borderRadius: "12px",
          border: "1px dashed rgba(0,194,203,0.2)"
        }}
      >
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.25rem", fontSize: "1.0625rem" }}>
          Want to see a preview of my current confidential projects?
        </p>
        <Link href="https://cal.com/frpboy/strategy" target="_blank" className="btn btn-secondary">
          <Calendar size={16} />
          Book a Discovery Call
        </Link>
      </div>
    </div>
  );
}
