# API Reference — ashique.digital

> **Version:** 1.0.0
> **Base URL:** `https://ashique.digital`
> **Last Updated:** 2026-03-09

---

## Overview

All API routes are Next.js 16 App Router `route.ts` files located in `app/api/`.
All routes implement:

- **Rate limiting** via Upstash or edge middleware
- **Input validation** via Zod
- **Error handling** with typed responses

---

## 1. Contact Form — `POST /api/contact`

Handles contact form submissions and sends an email notification to Ashique.

### Request

```typescript
// Content-Type: application/json
{
  name: string,          // required, min 2 chars
  email: string,         // required, valid email format
  businessType: string,  // required, min 2 chars
  message: string        // required, min 10 chars
}
```

### Response — Success `200`

```json
{
  "success": true,
  "message": "Your message has been sent. Ashique will get back to you within 24 hours."
}
```

### Response — Validation Error `400`

```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email address",
    "message": "Message must be at least 10 characters"
  }
}
```

### Response — Rate Limited `429`

```json
{
  "success": false,
  "error": "Too many requests. Please try again in a few minutes."
}
```

### Implementation

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  businessType: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        details: result.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { name, email, businessType, message } = result.data;

  await resend.emails.send({
    from: "website@ashique.digital",
    to: process.env.CONTACT_EMAIL!,
    subject: `New Contact: ${name} — ${businessType}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p>
           <p><strong>Business Type:</strong> ${businessType}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`,
  });

  return NextResponse.json({ success: true, message: "Message sent." });
}
```

---

## 2. AI Widget — `POST /api/agent`

Handles AI chat completion with Pinecone RAG context. Returns a **streamed** response.

### Request

```typescript
// Content-Type: application/json
{
  message: string,       // required, user's latest message
  history: Array<{
    role: 'user' | 'assistant',
    content: string
  }>                     // optional, conversation history
}
```

### Response — Stream `200`

Returns a `ReadableStream` with `text/plain` content-type (SSE-compatible).
Characters stream progressively as Gemini generates them.

### Response — Rate Limited `429`

```json
{
  "error": "Too many requests. Please slow down."
}
```

### Implementation

```typescript
// app/api/agent/route.ts
import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

const SYSTEM_PROMPT = `You are Ashique's professional assistant on ashique.digital.
You help potential clients understand how Ashique can help grow their business.
Be concise, outcome-focused, and encourage booking a free strategy call.
Never fabricate results. If unsure, say:
"I'd recommend discussing this directly with Ashique — 
book a free call here: https://cal.com/ashique/strategy"`;

export async function POST(req: NextRequest) {
  const { message, history = [] } = await req.json();

  // 1. Embed query and search Pinecone
  const embeddingModel = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  const embeddingResult = await embeddingModel.embedContent(message);
  const queryEmbedding = embeddingResult.embedding.values;

  const index = pinecone.index(process.env.PINECONE_INDEX!);
  const searchResult = await index.query({
    vector: queryEmbedding,
    topK: 3,
    includeMetadata: true,
  });

  const context = searchResult.matches
    .map((m) => m.metadata?.text ?? "")
    .join("\n\n");

  // 2. Build prompt with context
  const contextualPrompt = `${SYSTEM_PROMPT}

Relevant knowledge base context:
${context}

Answer the user's question based on the above context.`;

  // 3. Stream response
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    history: history.map((h: any) => ({
      role: h.role,
      parts: [{ text: h.content }],
    })),
    systemInstruction: contextualPrompt,
  });

  const result = await chat.sendMessageStream(message);
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        controller.enqueue(new TextEncoder().encode(chunk.text()));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

---

## 3. Newsletter — `POST /api/newsletter`

Captures email addresses for the newsletter list, sends a welcome email.

### Request

```typescript
// Content-Type: application/json
{
  email: string,  // required, valid email
  name?: string   // optional
}
```

### Response — Success `200`

```json
{
  "success": true,
  "message": "You're on the list! Check your email for a welcome message."
}
```

### Response — Duplicate `409`

```json
{
  "success": false,
  "error": "This email is already subscribed."
}
```

### Implementation

```typescript
// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 },
    );
  }

  const { email, name } = result.data;
  const firstName = name?.split(" ")[0] || "there";

  // Send welcome email
  await resend.emails.send({
    from: "ashique@ashique.digital",
    to: email,
    subject: "Welcome — You're on the growth list 🚀",
    html: `<p>Hey ${firstName},</p>
           <p>Thanks for subscribing to Ashique's growth newsletter.</p>
           <p>Every week, I share practical lead generation and brand strategy
              insights for SME owners and startup founders.</p>
           <p>Talk soon,<br>Ashique</p>`,
  });

  // Also notify Ashique
  await resend.emails.send({
    from: "website@ashique.digital",
    to: process.env.CONTACT_EMAIL!,
    subject: `New subscriber: ${email}`,
    text: `New newsletter signup: ${name || "N/A"} — ${email}`,
  });

  return NextResponse.json({ success: true, message: "You're on the list!" });
}
```

---

## 4. Free Audit Form — `POST /api/free-audit`

Handles the lead magnet form submission. Delivers the audit PDF via email.

### Request

```typescript
{
  name: string,           // required
  email: string,          // required, valid email
  businessName: string,   // required
  monthlyAdBudget: string,// e.g. "₹50K–₹1L"
  biggestChallenge: string// required, min 10 chars
}
```

### Response — Success `200`

```json
{
  "success": true,
  "message": "Your free audit is on its way! Check your email in the next few minutes."
}
```

---

## 5. Rate Limiting Configuration

All routes use rate limiting. Recommended implementation with Upstash Redis:

```typescript
// lib/ratelimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const contactRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
});

export const agentRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 m"), // 20 messages per minute
});

export const newsletterRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"), // 3 per minute
});
```

---

## 6. HTTP Security Headers

Configure in `next.config.ts`:

```typescript
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://cdn.sanity.io",
      "connect-src 'self' https://api.resend.com https://generativelanguage.googleapis.com",
    ].join("; "),
  },
];
```
