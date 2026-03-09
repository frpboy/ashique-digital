"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "@/lib/types";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

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
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
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
          content: "I'm having a moment — please try again or [book a call directly](https://cal.com/ashique/strategy).",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Orb Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 200,
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: open ? "var(--color-primary)" : "var(--color-accent)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: open ? "#fff" : "var(--color-primary)",
          boxShadow: "0 4px 20px rgba(0,194,203,0.4)",
          transition: "all 0.3s ease",
          animation: !open ? "orb-pulse 3s ease-in-out infinite" : "none",
        }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "5.5rem",
            right: "2rem",
            zIndex: 200,
            width: "min(380px, calc(100vw - 2rem))",
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
              gap: "0.75rem",
            }}
          >
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
                Powered by Gemini AI
              </p>
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
                  {msg.content || (loading && i === messages.length - 1 ? (
                    <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                  ) : "")}
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
        </div>
      )}

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
