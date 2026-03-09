# TMA — Technical Master Architecture

# ashique.digital

> **Version:** 1.0.0
> **Status:** Active
> **Last Updated:** 2026-03-09

---

## 1. System Overview

ashique.digital is a **Next.js 16 App Router** application deployed on **Vercel**, powered by **Sanity.io** as a headless CMS. It features an AI-powered assistant widget built with **Gemini 1.5 Flash** and **Pinecone RAG**, transactional email via **Resend**, and booking via **Cal.com**.

---

## 2. Tech Stack

| Layer           | Tool                           | Rationale                                               |
| --------------- | ------------------------------ | ------------------------------------------------------- |
| Framework       | Next.js 16 (App Router)        | Best Vercel integration, RSC, SEO, streaming            |
| Language        | TypeScript                     | Type safety, developer experience                       |
| Styling         | Tailwind CSS v4                | Utility-first, fast, responsive                         |
| UI Components   | shadcn/ui + Aceternity UI      | Pre-built premium animated components                   |
| Animations      | Framer Motion                  | Smooth scroll reveals, micro-interactions               |
| CMS             | Sanity.io                      | Visual editing, blog, case studies — generous free tier |
| AI Widget       | Gemini 1.5 Flash + RAG         | Floating AI assistant that answers client questions     |
| Vector DB       | Pinecone (free tier)           | Powers AI widget knowledge base                         |
| Forms / Booking | Cal.com + React Hook Form      | Discovery call booking + contact forms                  |
| Email           | Resend + React Email           | Transactional emails on form submit                     |
| Analytics       | Vercel Analytics + PostHog     | Page performance + user behavior tracking               |
| Deployment      | Vercel (Hobby — Free)          | Auto-deploys from GitHub, custom domain support         |
| Domain          | ashique.digital (purchased ✅) | Connected via Vercel DNS                                |

---

## 3. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │ Next.js  │  │  AI Widget   │  │    Cal.com Embed          │  │
│  │ App UI   │  │  Chat Panel  │  │    (Booking)              │  │
│  └────┬─────┘  └──────┬───────┘  └───────────────────────────┘  │
└───────┼───────────────┼─────────────────────────────────────────┘
        │               │
        ▼               ▼
┌───────────────────────────────────────────────────┐
│              VERCEL EDGE NETWORK                  │
│  ┌────────────────────────────────────────────┐   │
│  │          Next.js 16 App Router             │   │
│  │  ┌─────────────┐  ┌──────────────────────┐ │   │
│  │  │ React Server│  │  API Routes          │ │   │
│  │  │ Components  │  │  /api/contact        │ │   │
│  │  │             │  │  /api/agent          │ │   │
│  │  │             │  │  /api/newsletter     │ │   │
│  │  └─────────────┘  └──────────────────────┘ │   │
│  └────────────────────────────────────────────┘   │
└──────────────────────┬────────────────────────────┘
                       │
        ┌──────────────┼──────────────────────┐
        ▼              ▼                      ▼
┌───────────┐  ┌───────────────┐  ┌──────────────────┐
│  Sanity   │  │  Gemini 1.5   │  │     Resend       │
│   (CMS)   │  │  Flash + API  │  │   (Email API)    │
└───────────┘  └───────┬───────┘  └──────────────────┘
                       │
               ┌───────▼───────┐
               │    Pinecone   │
               │  (Vector DB)  │
               └───────────────┘
```

---

## 4. Project Folder Structure

```
ashique.digital/
├── app/
│   ├── (site)/
│   │   ├── page.tsx                    → Homepage
│   │   ├── about/page.tsx              → About page
│   │   ├── services/page.tsx           → Services page
│   │   ├── case-studies/
│   │   │   ├── page.tsx                → All case studies list
│   │   │   └── [slug]/page.tsx         → Dynamic case study detail
│   │   ├── insights/
│   │   │   ├── page.tsx                → Blog list
│   │   │   └── [slug]/page.tsx         → Dynamic blog post
│   │   ├── contact/page.tsx            → Contact page
│   │   └── free-audit/page.tsx         → Lead magnet page
│   ├── api/
│   │   ├── contact/route.ts            → Form submission handler
│   │   ├── agent/route.ts              → AI widget API route
│   │   └── newsletter/route.ts         → Email capture
│   └── layout.tsx                      → Root layout
├── components/
│   ├── ui/                             → shadcn/ui base components
│   ├── sections/                       → Homepage sections
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ProblemBlock.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── CaseStudyPreview.tsx
│   │   ├── ProcessSteps.tsx
│   │   ├── Testimonials.tsx
│   │   └── FinalCTA.tsx
│   ├── AIWidget/                       → Floating AI assistant
│   │   ├── AIOrb.tsx                   → Floating button
│   │   ├── ChatPanel.tsx               → Slide-in panel
│   │   └── ChatMessage.tsx             → Message component
│   └── shared/                         → Global components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── CTAButton.tsx
├── lib/
│   ├── sanity.ts                       → Sanity client config
│   ├── sanity.queries.ts               → GROQ queries
│   ├── pinecone.ts                     → RAG vector search
│   └── resend.ts                       → Email utility
├── sanity/
│   ├── schemas/
│   │   ├── index.ts                    → Schema registry
│   │   ├── caseStudy.ts
│   │   ├── service.ts
│   │   ├── blogPost.ts
│   │   └── testimonial.ts
│   └── sanity.config.ts
├── public/
│   ├── images/
│   ├── og/                             → OG images
│   └── favicon.ico
├── styles/
│   └── globals.css
├── .env.local                          → All secrets (never committed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Design System

### 5.1 Color Palette

| Token       | Hex       | Usage                         |
| ----------- | --------- | ----------------------------- |
| `--primary` | `#0D1B2A` | Deep Navy — authority & trust |
| `--accent`  | `#00C2CB` | Electric Teal — CTAs & energy |
| `--bg`      | `#F8F9FA` | Off White — base background   |
| `--muted`   | `#E9ECEF` | Light Gray — borders/dividers |
| `--text`    | `#1A1A2E` | Near Black — body text        |

### 5.2 Typography

| Role     | Font             | Weight  |
| -------- | ---------------- | ------- |
| Headings | Syne             | 700–800 |
| Body     | Inter            | 400–500 |
| Accent   | Playfair Display | 400–700 |

### 5.3 UI Principles

- **Editorial minimal** — generous white space, bold typographic hierarchy
- **Subtle card shadows** — `box-shadow: 0 4px 24px rgba(13,27,42,0.08)`
- **Asymmetric content blocks** on desktop, stacked on mobile
- **Framer Motion** scroll-triggered reveal animations on all sections

---

## 6. API Routes

### 6.1 `POST /api/contact`

```typescript
// Request
{ name: string, email: string, businessType: string, message: string }

// Response
{ success: boolean, message: string }

// Action: Send email via Resend to ashique@ashique.digital
```

### 6.2 `POST /api/agent`

```typescript
// Request
{ message: string, history: Message[] }

// Response: ReadableStream (SSE)

// Action:
// 1. Search Pinecone for top-3 relevant chunks
// 2. Inject into Gemini 1.5 Flash prompt
// 3. Stream response back
```

### 6.3 `POST /api/newsletter`

```typescript
// Request
{ email: string, name?: string }

// Response
{ success: boolean }

// Action: Save to mailing list + send welcome email via Resend
```

---

## 7. Sanity CMS Architecture

### 7.1 GROQ Queries

```typescript
// Case Studies list
*[_type == "caseStudy"] | order(publishedAt desc) {
  title, slug, clientIndustry, metrics, coverImage, publishedAt
}

// Blog posts with tags filter
*[_type == "post" && $tag in tags] | order(publishedAt desc) {
  title, slug, excerpt, tags, coverImage, publishedAt
}
```

### 7.2 Real-time Previews

- Use Sanity's visual editing for live preview in Studio
- Server-side fetching with `next: { revalidate: 60 }` (ISR)

---

## 8. AI Widget Architecture

### 8.1 RAG Knowledge Base (Pinecone)

| File          | Content                                          |
| ------------- | ------------------------------------------------ |
| `services.md` | Full service descriptions and outcomes           |
| `process.md`  | 4-step process explained in detail               |
| `faq.md`      | 20 common client questions + answers             |
| `results.md`  | Anonymized case study metrics                    |
| `about.md`    | Ashique's background, certifications, philosophy |

### 8.2 System Prompt

```
You are Ashique's professional assistant on ashique.digital.
You help potential clients understand how Ashique can help
grow their business. Be concise, outcome-focused, and always
encourage booking a free strategy call for specific advice.
Never fabricate results. If unsure, say:
"I'd recommend discussing this directly with Ashique —
book a free call here: [cal.com/ashique/strategy]"
```

### 8.3 Streaming Flow

```
Client Message
     ↓
POST /api/agent
     ↓
Pinecone similarity search (top-3 chunks)
     ↓
Build Gemini prompt (system + context + history + message)
     ↓
Gemini 1.5 Flash streaming response
     ↓
SSE stream → ChatPanel UI
```

---

## 9. SEO Architecture

| Element         | Implementation                             |
| --------------- | ------------------------------------------ |
| Metadata        | `generateMetadata()` on every page route   |
| OG Images       | Static per page in `/public/og/`           |
| Structured Data | JSON-LD on homepage + case study pages     |
| Sitemap         | Auto-generated by `next-sitemap`           |
| Robots          | `robots.txt` → allow all, disallow `/api/` |
| Canonical URLs  | Set in metadata config                     |

---

## 10. Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Resend (Email)
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=ashique@ashique.digital

# AI Widget
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX=ashique-knowledge

# Analytics (auto-injected by Vercel)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto
```

---

## 11. Performance Requirements

| Metric                 | Target          |
| ---------------------- | --------------- |
| Lighthouse Performance | ≥ 90            |
| LCP                    | < 2.5s          |
| FID / INP              | < 100ms         |
| CLS                    | < 0.1           |
| Bundle Size            | < 300KB gzipped |

### Optimization Strategies

- **Server Components by default** — minimize client bundle
- **`next/image`** with lazy loading and AVIF/WebP formats
- **Suspense boundaries** around Sanity data fetches
- **ISR** (Incremental Static Regeneration) — `revalidate: 60`
- **Edge Runtime** on API routes for lower latency

---

## 12. Deployment Architecture

```
GitHub (main branch)
        ↓ push
Vercel CI/CD Pipeline
        ↓ build
Next.js Production Build
        ↓ deploy
Vercel Edge Network (CDN)
        ↓
ashique.digital (Custom Domain)
```

### 12.1 Domain Setup

1. Vercel → Settings → Domains → Add `ashique.digital`
2. Update nameservers in registrar to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. Wait 10–30 mins for DNS propagation

### 12.2 Auto-Deploy

- **Every push to `main`** → production deploy
- **Every PR** → preview URL auto-generated
- **Vercel Analytics** enabled in project dashboard

---

## 13. Free Tier Cost Breakdown

| Service      | Free Tier Limit                    | Sufficient? |
| ------------ | ---------------------------------- | ----------- |
| Vercel Hobby | 100GB bandwidth, unlimited deploys | ✅          |
| Sanity.io    | 10GB storage, 2 users              | ✅          |
| Pinecone     | 5 indexes, 100K vectors            | ✅          |
| Resend       | 3,000 emails/month                 | ✅          |
| Cal.com      | Unlimited bookings                 | ✅          |
| Gemini API   | 1M tokens/day free                 | ✅          |
| PostHog      | 1M events/month                    | ✅          |

> **Total cost: ₹0/month** until Ashique scales significantly.
