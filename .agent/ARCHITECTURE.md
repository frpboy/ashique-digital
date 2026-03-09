# ashique.digital — ARCHITECTURE.md
# Read this FIRST before any implementation

> **MANDATORY:** AI agents must read this file before modifying any part of this project.

---

## Project: ashique.digital

A conversion-focused personal brand + portfolio website for Ashique, a Brand Strategist & Lead Generation Consultant. Built to convert visitors into booked discovery calls.

---

## Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Framework    | Next.js 16 (App Router) + TypeScript    |
| Styling      | Tailwind CSS v4 + Custom CSS variables  |
| CMS          | Sanity.io (headless)                    |
| Email        | Resend                                  |
| AI Chat      | Google Gemini 3.1 Pro (streamed)        |
| Booking      | Cal.com embed                           |
| Analytics    | Vercel Analytics + PostHog              |
| Deployment   | Vercel (Hobby free tier)                |

---

## Agent System

| File                              | Purpose                                      |
| --------------------------------- | -------------------------------------------- |
| `.agent/CODEBASE.md`              | File dependency map + conventions (READ THIS)|
| `.agent/rules/GEMINI.md`          | AI behaviour rules and routing protocol       |
| `.agent/docs/AGENTS.md`           | Master build instruction file                 |
| `.agent/agents/frontend-specialist.md` | Web UI/UX specialist                    |
| `.agent/agents/backend-specialist.md`  | API + server logic specialist            |
| `.agent/agents/orchestrator.md`   | Multi-domain task coordinator                |
| `.agent/agents/debugger.md`       | Systematic debugging                         |
| `.agent/workflows/deploy.md`      | Vercel deployment workflow                   |
| `.agent/docs/`                    | All project documentation (PRD, TMA, etc.)   |

---

## Directory Structure

```
ashique.digital/
├── app/
│   ├── layout.tsx                  → Root layout (Navbar, Footer, AIWidget)
│   ├── page.tsx                    → Homepage (all sections)
│   ├── globals.css                 → Design system tokens + base styles
│   ├── (site)/
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── case-studies/page.tsx
│   │   ├── case-studies/[slug]/page.tsx
│   │   ├── insights/page.tsx
│   │   ├── insights/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   └── free-audit/page.tsx     → Standalone lead magnet (no navbar)
│   └── api/
│       ├── contact/route.ts        → Contact form → Resend
│       ├── agent/route.ts          → Gemini AI streaming
│       └── newsletter/route.ts     → Email capture → Resend
├── components/
│   ├── shared/
│   │   ├── Navbar.tsx              → Sticky, scrolled-state
│   │   └── Footer.tsx              → Newsletter + links
│   ├── sections/                   → Homepage sections
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ProblemBlock.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── CaseStudyPreview.tsx    → Async Server Component
│   │   ├── ProcessSteps.tsx
│   │   ├── Testimonials.tsx        → Async Server Component
│   │   └── FinalCTA.tsx
│   └── AIWidget/
│       └── AIOrb.tsx               → Floating chat widget
├── lib/
│   ├── sanity.ts                   → Sanity client + sanityFetch
│   ├── sanity.queries.ts           → All GROQ queries
│   ├── resend.ts                   → Email sending utility
│   └── types.ts                    → Shared TypeScript types
├── sanity/
│   └── schemas/
│       ├── caseStudy.ts
│       └── index.ts                → post, testimonial, service schemas
├── public/
│   └── og/                         → OG images (1200×630px)
├── .env.example                    → Variable template (copy to .env.local)
├── .agent/                         → AI agent system files
└── next.config.ts                  → Security headers + image domains
```

---

## Design System (MEMORIZE)

```
Primary:  #0D1B2A  (Deep Navy)
Accent:   #00C2CB  (Electric Teal)
BG:       #F8F9FA  (Off White)
Text:     #1A1A2E  (Near Black)
Heading:  Syne 700/800
Body:     Inter 400/500/600
BANNED:   Purple, violet, mesh gradients, glassmorphism
STYLE:    Editorial brutalism — sharp edges, large type, precise whitespace
```

---

## Coding Conventions

- Server Components by default — `'use client'` only for interactivity
- All images via `next/image` (no raw `<img>`)
- All API routes: Zod validation + rate limiting + honeypot
- TypeScript strict — no `any`, no `@ts-ignore`
- CSS via class utilities (`card`, `btn`, `section`, `container`) + inline style for specifics
- `@/*` import alias for all internal imports

---

## Reference Docs

See `.agent/docs/` for complete specifications:
- `PRD.md` → Product requirements + user stories
- `_TMA.md` → Full system architecture  
- `Design.md` → Color tokens + typography
- `0_Schema.md` → Sanity schemas + GROQ
- `APIs.md` → API route specs
- `Security.md` → Security checklist
- `AGENTS.md` → Master AI build instructions
