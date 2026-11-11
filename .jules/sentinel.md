## 2026-10-28 - Missing Rate Limiting on Public Newsletter Endpoint
**Vulnerability:** The `/api/newsletter` route allowed unrestricted POST requests to trigger outgoing transactional emails via Resend without rate limiting, exposing the system to email bombing, API quota exhaustion, and spam abuse.
**Learning:** Public intake routes (`/api/contact`, `/api/free-audit`) implemented Upstash-backed rate limiting via `@/lib/ratelimit`, but `/api/newsletter` was missed during the initial endpoint rollout.
**Prevention:** Ensure any public API endpoint that triggers external side-effects (such as email delivery via Resend or mutations) extracts client IP via `x-forwarded-for` and enforces Upstash rate limiting before performing external API calls.
# Sentinel Security Journal

## 2026-11-06 - Missing Rate Limiting on Public AI Agent Streaming Endpoint
**Vulnerability:** The `/api/agent` route allowed unauthenticated and unthrottled POST requests to initiate Pinecone vector search queries and Google Generative AI (Gemini) streaming sessions, leaving the application vulnerable to DoS attacks, API quota exhaustion, and runaway infrastructure costs.
**Learning:** While other public intake routes (`/api/contact`, `/api/newsletter`, `/api/free-audit`) implemented rate limiting via `@/lib/ratelimit`, streaming endpoints like `/api/agent` are often overlooked because they return chunked `ReadableStream` responses rather than JSON. Unthrottled LLM endpoints present high financial and availability risks.
**Prevention:** Always pair LLM and vector search endpoints with IP-based rate limiting (such as `agentRatelimit` using a sliding window) and reject excessive traffic with a `429 Too Many Requests` status before initiating vector queries or model completions.

## 2026-11-02 - Reflected XSS via AI Assistant dangerouslySetInnerHTML
**Vulnerability:** In `components/AIWidget/AIOrb.tsx`, assistant messages were rendered using `dangerouslySetInnerHTML` with only markdown link regex replacement, leaving all user and model-generated HTML tags unescaped and executable in the DOM.
**Learning:** AI chat interfaces that format Markdown often resort to `dangerouslySetInnerHTML` for simplicity. When untrusted inputs or LLM outputs are reflected into chat streams without sanitization or escaping, stored or reflected Cross-Site Scripting (XSS) occurs.
**Prevention:** Avoid `dangerouslySetInnerHTML` for rendering chat messages. Parse supported markdown elements (such as links and newlines) directly into native React elements, ensuring text nodes are safely escaped by default and link protocols are strictly validated (`https?://`).
