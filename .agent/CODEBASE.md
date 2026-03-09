# CODEBASE.md — ashique.digital

> AI agents must read this file to understand the project structure before modifying any file.
> **Last Updated:** 2026-03-10

---

## Project Identity

| Field      | Value                                                |
| ---------- | ---------------------------------------------------- |
| Product    | ashique.digital — Personal Brand & Portfolio Website |
| Owner      | Ashique (Brand Strategist & Lead Gen Consultant)     |
| Domain     | ashique.digital                                      |
| Framework  | Next.js 16 (App Router) + TypeScript                 |
| Styling    | Tailwind CSS v4                                      |
| CMS        | Sanity.io                                            |
| Deployment | Vercel (Hobby — Free)                                |
| Goal       | Convert visitors → booked discovery calls            |

---

## Design System Tokens (MEMORIZE THESE)

```
Primary:   #0D1B2A  (Deep Navy)
Accent:    #00C2CB  (Electric Teal)
BG:        #F8F9FA  (Off White)
Text:      #1A1A2E  (Near Black)
Muted:     #E9ECEF  (Light Gray)
Heading:   Syne 700/800 (Google Fonts)
Body:      Inter 400/500 (Google Fonts)
Accent:    Playfair Display (quotes only)
BANNED:    Purple, violet, indigo, mesh gradients, glassmorphism
```

---

## File Dependency Map

### Core Config Files

| File                 | Depends On                    | Depended By                                  |
| -------------------- | ----------------------------- | -------------------------------------------- |
| `next.config.ts`     | —                             | Everything (build config)                    |
| `tailwind.config.ts` | `globals.css`                 | All component files                          |
| `app/layout.tsx`     | `globals.css`, Navbar, Footer | All page routes                              |
| `.env.local`         | —                             | `lib/sanity.ts`, `lib/resend.ts`, API routes |
| `tsconfig.json`      | —                             | All TypeScript files                         |

### Library Files (`lib/`)

| File                    | Exports                           | Used By                                              |
| ----------------------- | --------------------------------- | ---------------------------------------------------- |
| `lib/sanity.ts`         | `client`, `urlFor`, `sanityFetch` | All Sanity data components, API routes               |
| `lib/sanity.queries.ts` | GROQ query strings                | `lib/sanity.ts`, all page components with CMS data   |
| `lib/resend.ts`         | `sendEmail()`                     | `/api/contact`, `/api/newsletter`, `/api/free-audit` |
| `lib/pinecone.ts`       | `searchKnowledge()`               | `/api/agent`                                         |

### API Routes (`app/api/`)

| Route                     | Reads From                     | Sends To        |
| ------------------------- | ------------------------------ | --------------- |
| `api/contact/route.ts`    | Request body                   | Resend API      |
| `api/agent/route.ts`      | Request body, Pinecone, Gemini | Client (stream) |
| `api/newsletter/route.ts` | Request body                   | Resend API      |
| `api/free-audit/route.ts` | Request body                   | Resend API      |

### Page Routes (`app/(site)/`)

| Page                           | CMS Data?   | Key Components                                                                                     |
| ------------------------------ | ----------- | -------------------------------------------------------------------------------------------------- |
| `page.tsx` (Homepage)          | ✅ Yes      | Hero, TrustBar, ProblemBlock, ServicesGrid, CaseStudyPreview, ProcessSteps, Testimonials, FinalCTA |
| `about/page.tsx`               | ❌ Static   | Bio, Philosophy, Credentials, InlineCTA                                                            |
| `services/page.tsx`            | ✅ Optional | ServiceDetail x6                                                                                   |
| `case-studies/page.tsx`        | ✅ Yes      | CaseStudyCard (grid)                                                                               |
| `case-studies/[slug]/page.tsx` | ✅ Yes      | CaseStudyDetail                                                                                    |
| `insights/page.tsx`            | ✅ Yes      | PostCard (grid), TagFilter                                                                         |
| `insights/[slug]/page.tsx`     | ✅ Yes      | PortableText renderer, RelatedPosts                                                                |
| `contact/page.tsx`             | ❌ Static   | CalEmbed, ContactForm                                                                              |
| `free-audit/page.tsx`          | ❌ Static   | FreeAuditForm (standalone, no navbar)                                                              |

### Component Dependency Tree

```
app/layout.tsx
├── components/shared/Navbar.tsx          (CTAButton)
├── components/shared/Footer.tsx          (newsletter form → /api/newsletter)
└── components/AIWidget/AIOrb.tsx
    └── components/AIWidget/ChatPanel.tsx
        └── components/AIWidget/ChatMessage.tsx

app/(site)/page.tsx
├── components/sections/Hero.tsx
├── components/sections/TrustBar.tsx
├── components/sections/ProblemBlock.tsx
├── components/sections/ServicesGrid.tsx
├── components/sections/CaseStudyPreview.tsx  (lib/sanity.ts)
├── components/sections/ProcessSteps.tsx
├── components/sections/Testimonials.tsx      (lib/sanity.ts)
└── components/sections/FinalCTA.tsx          (Cal.com embed)
```

### Sanity Schema Dependencies

| Schema File      | Used By                                                   |
| ---------------- | --------------------------------------------------------- |
| `caseStudy.ts`   | `/case-studies`, `/case-studies/[slug]`, homepage preview |
| `blogPost.ts`    | `/insights`, `/insights/[slug]`                           |
| `testimonial.ts` | Homepage testimonials section                             |
| `service.ts`     | `/services` page                                          |

---

## Conventions

### Naming

- **Components:** PascalCase (`CTAButton.tsx`, `ServicesGrid.tsx`)
- **Pages:** `page.tsx` (Next.js App Router convention)
- **API routes:** `route.ts` (Next.js App Router convention)
- **Utilities:** camelCase (`sanityFetch`, `urlFor`, `sendEmail`)
- **Types:** PascalCase with `Type` suffix if needed (`CaseStudyType`, `PostType`)
- **CSS variables:** `--color-primary`, `--font-heading` (kebab-case)

### Component Rules

- **Server Components by default** — use `'use client'` only when needed
- **No `any` types** — strict TypeScript everywhere
- **All images via `next/image`** — never raw `<img>`
- **Zod for all form validation** — never trust raw req.body
- **Rate limiting on all API routes** — before any business logic

### Import Aliases

```typescript
// tsconfig.json path alias
@/* → root directory

// Usage
import { client } from '@/lib/sanity'
import { CTAButton } from '@/components/shared/CTAButton'
```

---

## Environment Variables Reference

```env
# Required in .env.local — NEVER commit this file
NEXT_PUBLIC_SANITY_PROJECT_ID=     # Sanity project ID (safe to be public)
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                  # READ-ONLY Sanity token (server only)
RESEND_API_KEY=                    # Email sending (server only)
CONTACT_EMAIL=ashique@ashique.digital
GOOGLE_GENERATIVE_AI_API_KEY=      # Gemini (server only)
PINECONE_API_KEY=                  # Vector DB (server only)
PINECONE_INDEX=ashique-knowledge
UPSTASH_REDIS_REST_URL=            # Rate limiting (server only)
UPSTASH_REDIS_REST_TOKEN=          # Rate limiting (server only)
```

---

## Key URLs

| Resource         | URL                              |
| ---------------- | -------------------------------- |
| Production       | https://ashique.digital          |
| Sanity Studio    | https://ashique.sanity.studio    |
| Vercel Dashboard | https://vercel.com/dashboard     |
| Cal.com Booking  | https://cal.com/ashique/strategy |
| Resend Dashboard | https://resend.com/dashboard     |
| Pinecone Console | https://app.pinecone.io          |
| Google AI Studio | https://aistudio.google.com      |

---

## Quick Commands

```bash
npm run dev          # Start dev server → localhost:3000
npx sanity dev       # Start Sanity Studio → localhost:3333
npx sanity deploy    # Deploy Sanity Studio
vercel --prod        # Deploy to production
npm run lint         # Run ESLint
npx tsc --noEmit     # TypeScript check
npm run build        # Production build
```

---

## What NOT to Do

- ❌ Use `purple`, `violet`, `indigo` as brand colors
- ❌ Use raw `<img>` tags — always `next/image`
- ❌ Use `NEXT_PUBLIC_` prefix on secret API keys
- ❌ Commit `.env.local`
- ❌ Use mesh gradients or glassmorphism in components
- ❌ Default to "Standard Hero Split" layout (left text, right image)
- ❌ Use `dangerouslySetInnerHTML` with user input
- ❌ Create API routes without Zod validation + rate limiting
- ❌ Leave `console.log` in production code
