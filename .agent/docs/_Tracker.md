# Project Tracker — ashique.digital

> **Version:** 1.0.0
> **Sprint Length:** 1 Week
> **Status Legend:** 🔲 Todo | 🔄 In Progress | ✅ Done | ❌ Blocked

---

## Sprint Overview

| Sprint   | Dates  | Focus                                    | Status  |
| -------- | ------ | ---------------------------------------- | ------- |
| Sprint 1 | Week 1 | Setup, design system, Sanity schemas     | 🔲 Todo |
| Sprint 2 | Week 2 | Static pages (Homepage, About, Services) | 🔲 Todo |
| Sprint 3 | Week 3 | Dynamic pages, Forms, AI Widget          | 🔲 Todo |
| Sprint 4 | Week 4 | SEO, Performance, Deploy                 | 🔲 Todo |

---

## Sprint 1 — Foundation Setup

### Environment & Tooling

| ID    | Task                                   | Owner | Status  | Notes                  |
| ----- | -------------------------------------- | ----- | ------- | ---------------------- |
| T-001 | Initialize Next.js 16 project          | Dev   | 🔲 Todo |                        |
| T-002 | Configure TypeScript                   | Dev   | 🔲 Todo |                        |
| T-003 | Install & configure Tailwind CSS v4    | Dev   | 🔲 Todo |                        |
| T-004 | Install shadcn/ui                      | Dev   | 🔲 Todo |                        |
| T-005 | Install Framer Motion                  | Dev   | 🔲 Todo |                        |
| T-006 | Install Aceternity UI components       | Dev   | 🔲 Todo |                        |
| T-007 | Set up `.env.local` with all variables | Dev   | 🔲 Todo | Never commit this file |
| T-008 | Push initial project to GitHub         | Dev   | 🔲 Todo |                        |

### Design System

| ID    | Task                                        | Owner | Status  | Notes                       |
| ----- | ------------------------------------------- | ----- | ------- | --------------------------- |
| T-009 | Configure design tokens in `globals.css`    | Dev   | 🔲 Todo | Colors, fonts, spacing vars |
| T-010 | Set up Google Fonts (Syne, Inter, Playfair) | Dev   | 🔲 Todo |                             |
| T-011 | Create Tailwind config with custom colors   | Dev   | 🔲 Todo |                             |

### Sanity CMS

| ID    | Task                                       | Owner | Status  | Notes           |
| ----- | ------------------------------------------ | ----- | ------- | --------------- |
| T-012 | Create Sanity project                      | Dev   | 🔲 Todo |                 |
| T-013 | Define `caseStudy.ts` schema               | Dev   | 🔲 Todo | See 0_Schema.md |
| T-014 | Define `blogPost.ts` schema                | Dev   | 🔲 Todo |                 |
| T-015 | Define `testimonial.ts` schema             | Dev   | 🔲 Todo |                 |
| T-016 | Define `service.ts` schema                 | Dev   | 🔲 Todo |                 |
| T-017 | Deploy Sanity Studio                       | Dev   | 🔲 Todo |                 |
| T-018 | Configure Sanity client in `lib/sanity.ts` | Dev   | 🔲 Todo |                 |

---

## Sprint 2 — Static Pages

### Shared Components

| ID    | Task                            | Owner | Status  | Notes                          |
| ----- | ------------------------------- | ----- | ------- | ------------------------------ |
| T-019 | Build `Navbar.tsx` component    | Dev   | 🔲 Todo | Sticky, blur on scroll, CTA    |
| T-020 | Build `Footer.tsx` component    | Dev   | 🔲 Todo | Links, social, newsletter form |
| T-021 | Build `CTAButton.tsx` component | Dev   | 🔲 Todo | Primary + secondary variants   |

### Homepage Sections

| ID    | Task                                 | Owner | Status  | Notes                         |
| ----- | ------------------------------------ | ----- | ------- | ----------------------------- |
| T-022 | Build `Hero.tsx` section             | Dev   | 🔲 Todo | Large H1, photo, dual CTAs    |
| T-023 | Build `TrustBar.tsx` section         | Dev   | 🔲 Todo | Logo strip, 5–6 badges        |
| T-024 | Build `ProblemBlock.tsx` section     | Dev   | 🔲 Todo | Dark navy bg, copy block      |
| T-025 | Build `ServicesGrid.tsx` section     | Dev   | 🔲 Todo | 3-col, 6 cards                |
| T-026 | Build `CaseStudyPreview.tsx` section | Dev   | 🔲 Todo | 3 dark cards, metric callouts |
| T-027 | Build `ProcessSteps.tsx` section     | Dev   | 🔲 Todo | 4-step timeline               |
| T-028 | Build `Testimonials.tsx` section     | Dev   | 🔲 Todo | 2–3 quote cards               |
| T-029 | Build `FinalCTA.tsx` section         | Dev   | 🔲 Todo | Dark section, Cal.com embed   |
| T-030 | Assemble `app/(site)/page.tsx`       | Dev   | 🔲 Todo | Wire all sections together    |

### About Page

| ID    | Task                                   | Owner | Status  | Notes                  |
| ----- | -------------------------------------- | ----- | ------- | ---------------------- |
| T-031 | Build About page layout                | Dev   | 🔲 Todo | Bio, photo, philosophy |
| T-032 | Add credentials/certifications section | Dev   | 🔲 Todo |                        |
| T-033 | Add inline CTA "Work With Me"          | Dev   | 🔲 Todo |                        |

### Services Page

| ID    | Task                                 | Owner | Status  | Notes                       |
| ----- | ------------------------------------ | ----- | ------- | --------------------------- |
| T-034 | Build Services page layout           | Dev   | 🔲 Todo | 6 full-detail service cards |
| T-035 | Wire anchor links from homepage grid | Dev   | 🔲 Todo |                             |

---

## Sprint 3 — Dynamic Pages & Integrations

### Case Studies (Dynamic)

| ID    | Task                                   | Owner | Status  | Notes               |
| ----- | -------------------------------------- | ----- | ------- | ------------------- |
| T-036 | Write GROQ query for case studies list | Dev   | 🔲 Todo |                     |
| T-037 | Build `/case-studies/page.tsx` (list)  | Dev   | 🔲 Todo |                     |
| T-038 | Build `/case-studies/[slug]/page.tsx`  | Dev   | 🔲 Todo | Dynamic from Sanity |
| T-039 | Add bottom CTA on case study detail    | Dev   | 🔲 Todo |                     |

### Blog / Insights (Dynamic)

| ID    | Task                              | Owner | Status  | Notes                  |
| ----- | --------------------------------- | ----- | ------- | ---------------------- |
| T-040 | Write GROQ query for blog posts   | Dev   | 🔲 Todo |                        |
| T-041 | Build `/insights/page.tsx` (list) | Dev   | 🔲 Todo |                        |
| T-042 | Build `/insights/[slug]/page.tsx` | Dev   | 🔲 Todo | Portable text renderer |
| T-043 | Add tag/category filter           | Dev   | 🔲 Todo |                        |
| T-044 | Add related posts section         | Dev   | 🔲 Todo |                        |

### Forms & Email

| ID    | Task                                    | Owner | Status  | Notes                       |
| ----- | --------------------------------------- | ----- | ------- | --------------------------- |
| T-045 | Build Contact page with Cal.com embed   | Dev   | 🔲 Todo |                             |
| T-046 | Build contact form with React Hook Form | Dev   | 🔲 Todo | Zod validation              |
| T-047 | Build `POST /api/contact` route         | Dev   | 🔲 Todo | Resend integration          |
| T-048 | Build Free Audit page (lead magnet)     | Dev   | 🔲 Todo | Standalone, no navbar       |
| T-049 | Build `POST /api/newsletter` route      | Dev   | 🔲 Todo | Resend + list management    |
| T-050 | Add rate limiting to all API routes     | Dev   | 🔲 Todo | `upstash/ratelimit` or edge |

### AI Widget

| ID    | Task                                       | Owner   | Status  | Notes                        |
| ----- | ------------------------------------------ | ------- | ------- | ---------------------------- |
| T-051 | Create Pinecone index `ashique-knowledge`  | Dev     | 🔲 Todo |                              |
| T-052 | Prepare knowledge base docs (5 .md files)  | Ashique | 🔲 Todo | services, faq, process, etc. |
| T-053 | Build embedding + upload script (Pinecone) | Dev     | 🔲 Todo |                              |
| T-054 | Build `POST /api/agent` streaming route    | Dev     | 🔲 Todo | Gemini + Pinecone RAG        |
| T-055 | Build `AIOrb.tsx` floating button          | Dev     | 🔲 Todo |                              |
| T-056 | Build `ChatPanel.tsx` slide-in panel       | Dev     | 🔲 Todo |                              |
| T-057 | Wire streaming response to chat UI         | Dev     | 🔲 Todo |                              |
| T-058 | Test AI widget end-to-end                  | Dev     | 🔲 Todo |                              |

---

## Sprint 4 — SEO, Performance & Deploy

### SEO Layer

| ID    | Task                                        | Owner  | Status  | Notes                  |
| ----- | ------------------------------------------- | ------ | ------- | ---------------------- |
| T-059 | Add `generateMetadata()` to all page routes | Dev    | 🔲 Todo |                        |
| T-060 | Create OG images for each page              | Design | 🔲 Todo | Store in `/public/og/` |
| T-061 | Add JSON-LD structured data to homepage     | Dev    | 🔲 Todo |                        |
| T-062 | Add JSON-LD to case study pages             | Dev    | 🔲 Todo |                        |
| T-063 | Generate `sitemap.xml` via next-sitemap     | Dev    | 🔲 Todo |                        |
| T-064 | Create `robots.txt`                         | Dev    | 🔲 Todo |                        |

### Performance

| ID    | Task                                        | Owner | Status  | Notes |
| ----- | ------------------------------------------- | ----- | ------- | ----- |
| T-065 | Audit all images — use `next/image`         | Dev   | 🔲 Todo |       |
| T-066 | Add Suspense boundaries on Sanity fetches   | Dev   | 🔲 Todo |       |
| T-067 | Configure ISR `revalidate: 60` on CMS pages | Dev   | 🔲 Todo |       |
| T-068 | Run Lighthouse on all pages (target ≥ 90)   | Dev   | 🔲 Todo |       |

### Deployment

| ID    | Task                                        | Owner   | Status  | Notes                 |
| ----- | ------------------------------------------- | ------- | ------- | --------------------- |
| T-069 | Connect GitHub repo to Vercel               | Dev     | 🔲 Todo |                       |
| T-070 | Add all env vars to Vercel project settings | Dev     | 🔲 Todo |                       |
| T-071 | Deploy to Vercel                            | Dev     | 🔲 Todo |                       |
| T-072 | Connect `ashique.digital` domain            | Dev     | 🔲 Todo | Update nameservers    |
| T-073 | Enable Vercel Analytics                     | Dev     | 🔲 Todo |                       |
| T-074 | Enable PostHog tracking                     | Dev     | 🔲 Todo |                       |
| T-075 | Seed Sanity with 2–3 case studies           | Ashique | 🔲 Todo |                       |
| T-076 | Seed Sanity with 1–2 blog posts             | Ashique | 🔲 Todo |                       |
| T-077 | Final QA across all pages                   | Dev     | 🔲 Todo | See \_QA.md checklist |

---

## Backlog (Post-Launch)

| ID    | Task                                      | Priority | Notes                   |
| ----- | ----------------------------------------- | -------- | ----------------------- |
| B-001 | Exit-intent popup for lead magnet         | Medium   | Email capture           |
| B-002 | Payment integration (Razorpay/Stripe)     | Low      | See Payments.md         |
| B-003 | Email newsletter sequences (Resend)       | Medium   | Welcome + drip campaign |
| B-004 | Video case studies                        | Low      |                         |
| B-005 | Testimonial video section                 | Low      |                         |
| B-006 | Multi-language support (English/regional) | Low      |                         |
| B-007 | A/B testing CTAs                          | Medium   | PostHog experiments     |
