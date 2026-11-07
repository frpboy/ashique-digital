# Sentinel Security Journal

## 2026-10-28 - Missing Rate Limiting on Public Newsletter Endpoint
**Vulnerability:** The `/api/newsletter` route allowed unrestricted POST requests to trigger outgoing transactional emails via Resend without rate limiting, exposing the system to email bombing, API quota exhaustion, and spam abuse.
**Learning:** Public intake routes (`/api/contact`, `/api/free-audit`) implemented Upstash-backed rate limiting via `@/lib/ratelimit`, but `/api/newsletter` was missed during the initial endpoint rollout.
**Prevention:** Ensure any public API endpoint that triggers external side-effects (such as email delivery via Resend or mutations) extracts client IP via `x-forwarded-for` and enforces Upstash rate limiting before performing external API calls.

## 2026-11-02 - Reflected XSS via AI Assistant dangerouslySetInnerHTML
**Vulnerability:** In `components/AIWidget/AIOrb.tsx`, assistant messages were rendered using `dangerouslySetInnerHTML` with only markdown link regex replacement, leaving all user and model-generated HTML tags unescaped and executable in the DOM.
**Learning:** AI chat interfaces that format Markdown often resort to `dangerouslySetInnerHTML` for simplicity. When untrusted inputs or LLM outputs are reflected into chat streams without sanitization or escaping, stored or reflected Cross-Site Scripting (XSS) occurs.
**Prevention:** Avoid `dangerouslySetInnerHTML` for rendering chat messages. Parse supported markdown elements (such as links and newlines) directly into native React elements, ensuring text nodes are safely escaped by default and link protocols are strictly validated (`https?://`).

## 2026-11-07 - Missing Rate Limiting on LLM/RAG Assistant Endpoint
**Vulnerability:** `/api/agent` accepted unthrottled POST requests, triggering costly downstream Pinecone vector queries and streaming Google Gemini generative model completions, creating an acute denial-of-wallet and API exhaustion risk.
**Learning:** While static contact endpoints often receive rate limiting scrutiny, dynamic AI streaming endpoints are frequently left unprotected due to chunked streaming complexities. Because LLM and vector database API calls incur proportional latency and financial cost per invocation, they are high-value targets for resource starvation and billing denial-of-service.
**Prevention:** Always gate public LLM/RAG routes with token-bucket or sliding-window rate limiters keyed by client IP before executing vector embeddings or LLM completions, and gracefully handle HTTP 429 in the chat client UI.
