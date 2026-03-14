"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "@/lib/types";
import { X, Send, Loader2 } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "framer-motion";

const WELCOME = "Hi! I'm Ashique's assistant. I can answer questions about his services, process, and past results — or help you book a free strategy call. What would you like to know?";

export function AIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    if (typeof window !== 'undefined' && posthog) {
      posthog.capture("ai_message_sent", {
        message_length: msg.length,
        conversation_turn: messages.filter((m) => m.role === "user").length + 1,
      });
    }

    const userMessage: ChatMessage = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const assistantMessage: ChatMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: messages.slice(1), // skip welcome
          fax_number: "", // Honeypot (must stay empty)
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // Check if link was provided at the end
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.content.includes("/free-audit") && typeof window !== 'undefined' && posthog) {
              posthog.capture("audit_link_provided_by_ai");
            }
            return prev;
          });
          break;
        }
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "I'm having a moment — please try again or [book a call directly](https://cal.com/frpboy/strategy).",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Bot Button */}
      <motion.button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next && typeof window !== 'undefined' && posthog) {
            posthog.capture("ai_widget_opened");
          }
        }}
        animate={loading && !open ? {
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0 0px rgba(0, 194, 203, 0)",
            "0 0 0 15px rgba(0, 194, 203, 0.15)",
            "0 0 0 0px rgba(0, 194, 203, 0)"
          ]
        } : { scale: 1 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-label="Toggle AI Assistant"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 200,
          width: "94px",
          height: "94px",
          borderRadius: "50%",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease",
          padding: 0,
        }}
      >
        {open ? (
          <div style={{ 
            background: "var(--color-primary)", 
            width: "64px", 
            height: "64px", 
            borderRadius: "50%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: "#fff",
            boxShadow: "0 8px 25px rgba(13,27,42,0.2)"
          }}>
            <X size={28} />
          </div>
        ) : (
          <div style={{ width: "94px", height: "94px", position: "relative" }}>
            {loading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle, rgba(0,194,203,0.3) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: -1
                }}
              />
            )}
            <DotLottieReact
              src="/lottie/growth-bot.lottie"
              loop
              autoplay
            />
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: "fixed",
              bottom: "min(6.5rem, 85vh)",
              zIndex: 200,
              // Mobile specific realignment
              left: window.innerWidth < 640 ? "1rem" : "auto",
              right: window.innerWidth < 640 ? "1rem" : "2rem",
              width: window.innerWidth < 640 ? "calc(100vw - 2rem)" : "380px",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 16px 60px rgba(13,27,42,0.18)",
              border: "1px solid var(--color-muted)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
          {/* Panel Header */}
            <div
              style={{
                background: "var(--color-primary)",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    color: "var(--color-primary)",
                    fontSize: "1rem",
                  }}
                >
                  A
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.9375rem" }}>
                    Ashique&apos;s Assistant
                  </p>
                  <p style={{ color: "var(--color-accent)", fontSize: "0.75rem" }}>
                    Ashique&apos;s Strategic Brain
                  </p>
                </div>
              </div>

              {/* Trusted Advisor Badge */}
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,194,203,0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-accent)" }} />
                <span style={{ fontSize: "0.65rem", color: "#fff", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Trusted Advisor</span>
              </div>
            </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxHeight: "360px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "0.625rem 0.875rem",
                    borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    background: msg.role === "user" ? "var(--color-primary)" : "var(--color-bg)",
                    color: msg.role === "user" ? "#fff" : "var(--color-text)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    border: msg.role === "assistant" ? "1px solid var(--color-muted)" : "none",
                  }}
                >
                  {msg.role === "assistant" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: (msg.content || (loading && i === messages.length - 1 ? "..." : ""))
                          .replace(
                            /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
                            '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent); text-decoration: underline; font-weight: 600;">$1</a>'
                          )
                          .replace(/\n/g, "<br />")
                      }}
                    />
                  ) : (
                    msg.content
                  )}
                  {loading && i === messages.length - 1 && !msg.content && (
                    <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.875rem",
              borderTop: "1px solid var(--color-muted)",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              disabled={loading}
              style={{
                flex: 1,
                padding: "0.625rem 0.875rem",
                border: "1.5px solid var(--color-muted)",
                borderRadius: "6px",
                fontSize: "0.875rem",
                outline: "none",
                color: "var(--color-text)",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                padding: "0.625rem 0.875rem",
                background: loading || !input.trim() ? "var(--color-muted)" : "var(--color-accent)",
                color: "var(--color-primary)",
                border: "none",
                borderRadius: "6px",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s",
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      <style>{`
        @keyframes orb-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,194,203,0.4); }
          50% { box-shadow: 0 4px 32px rgba(0,194,203,0.7), 0 0 0 8px rgba(0,194,203,0.1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

// Re-export with original name expected by layout
export { AIWidget as AIOrb };
