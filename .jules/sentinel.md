## 2026-10-28 - Missing Rate Limiting on Public Newsletter Endpoint
**Vulnerability:** The `/api/newsletter` route allowed unrestricted POST requests to trigger outgoing transactional emails via Resend without rate limiting, exposing the system to email bombing, API quota exhaustion, and spam abuse.
**Learning:** Public intake routes (`/api/contact`, `/api/free-audit`) implemented Upstash-backed rate limiting via `@/lib/ratelimit`, but `/api/newsletter` was missed during the initial endpoint rollout.
**Prevention:** Ensure any public API endpoint that triggers external side-effects (such as email delivery via Resend or mutations) extracts client IP via `x-forwarded-for` and enforces Upstash rate limiting before performing external API calls.
# Sentinel Security Journal

## 2026-11-02 - Reflected XSS via AI Assistant dangerouslySetInnerHTML
**Vulnerability:** In `components/AIWidget/AIOrb.tsx`, assistant messages were rendered using `dangerouslySetInnerHTML` with only markdown link regex replacement, leaving all user and model-generated HTML tags unescaped and executable in the DOM.
**Learning:** AI chat interfaces that format Markdown often resort to `dangerouslySetInnerHTML` for simplicity. When untrusted inputs or LLM outputs are reflected into chat streams without sanitization or escaping, stored or reflected Cross-Site Scripting (XSS) occurs.
**Prevention:** Avoid `dangerouslySetInnerHTML` for rendering chat messages. Parse supported markdown elements (such as links and newlines) directly into native React elements, ensuring text nodes are safely escaped by default and link protocols are strictly validated (`https?://`).

## 2026-11-10 - Unrestricted AI Inference and Vector Search in Public Streaming Endpoint
**Vulnerability:** The public `/api/agent` route allowed unauthenticated POST requests to invoke Pinecone vector queries and streaming Google Gemini LLM completions without Upstash rate limiting. This exposed the backend to denial of service, Pinecone search exhaustion, and rapid quota/financial drain on generative AI APIs.
**Learning:** While other intake forms were protected by rate limiting, streaming AI endpoints are often omitted because of streaming responses. AI generation endpoints are the most computationally and financially expensive endpoints in the application.
**Prevention:** Always gate public AI agent routes with IP-based sliding window rate limiters (e.g., `@upstash/ratelimit`) before parsing payloads or making downstream model/vector database calls.
