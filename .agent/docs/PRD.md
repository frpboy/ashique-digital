# PRD — Product Requirements Document

# ashique.digital

> **Version:** 1.0.0
> **Owner:** Ashique
> **Status:** Active
> **Last Updated:** 2026-03-09

---

## 1. Project Overview

| Field         | Detail                                               |
| ------------- | ---------------------------------------------------- |
| Product Name  | ashique.digital                                      |
| Product Type  | Dynamic Personal Brand & Portfolio Website           |
| Owner         | Ashique                                              |
| Domain        | ashique.digital                                      |
| Hosting       | Vercel (Hobby — Free Tier)                           |
| CMS           | Sanity.io                                            |
| Target Launch | 4 weeks from project start                           |
| Primary Goal  | Convert website visitors into booked discovery calls |

---

## 2. Problem Statement

Ashique is a Brand Strategist and Lead Generation Consultant who needs a digital presence that:

- Positions him as a **strategic growth partner**, not a commodity freelancer
- Actively generates and captures leads **24/7** without manual effort
- Showcases **proof of results** through case studies
- Scales from solo freelancer → **agency** without rebuilding

---

## 3. Target Users

| Persona   | Description                                                     |
| --------- | --------------------------------------------------------------- |
| Primary   | SME owners (₹1Cr–₹20Cr revenue) struggling with lead generation |
| Secondary | Startup founders needing a go-to-market digital strategy        |
| Tertiary  | Marketing managers at mid-size companies needing consulting     |

---

## 4. User Stories

### 4.1 Visitor / Potential Client

| ID    | Story                                                                                        |
| ----- | -------------------------------------------------------------------------------------------- |
| US-01 | As a visitor, I want to understand what Ashique does within 5 seconds of landing on homepage |
| US-02 | As a visitor, I want to see proof of real results before reaching out                        |
| US-03 | As a visitor, I want to book a discovery call without back-and-forth emails                  |
| US-04 | As a visitor, I want to download a free resource to evaluate Ashique's expertise             |
| US-05 | As a visitor, I want to ask quick questions without filling a form (AI widget)               |
| US-06 | As a visitor on mobile, I want a fully responsive, fast-loading experience                   |

### 4.2 Ashique (Admin)

| ID    | Story                                                               |
| ----- | ------------------------------------------------------------------- |
| US-07 | As Ashique, I want to publish new case studies without a developer  |
| US-08 | As Ashique, I want to publish blog posts from a visual editor       |
| US-09 | As Ashique, I want contact form submissions emailed to me instantly |
| US-10 | As Ashique, I want to see visitor analytics and conversion data     |

---

## 5. Functional Requirements

### 5.1 Pages

#### Homepage `/`

| ID    | Requirement                                               |
| ----- | --------------------------------------------------------- |
| FR-01 | Hero section with headline, subheadline, dual CTA buttons |
| FR-02 | Trust indicator bar (logos/badges)                        |
| FR-03 | Problem statement copy block                              |
| FR-04 | Services overview grid (6 services, card layout)          |
| FR-05 | Case study preview cards (3 featured, pulled from Sanity) |
| FR-06 | 4-step process section                                    |
| FR-07 | Testimonials section (pulled from Sanity)                 |
| FR-08 | Final CTA section with Cal.com embed                      |
| FR-09 | Sticky navbar with active CTA button                      |

#### About `/about`

| ID    | Requirement                        |
| ----- | ---------------------------------- |
| FR-10 | Professional bio with photo        |
| FR-11 | Philosophy / working style section |
| FR-12 | Credentials, certifications, tools |
| FR-13 | Inline CTA — "Work With Me"        |

#### Services `/services`

| ID    | Requirement                                                                                                                               |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| FR-14 | 6 service cards: Brand Strategy, Digital Marketing Strategy, Lead Generation Systems, Funnel Design, Paid Ads Strategy, Growth Consulting |
| FR-15 | Each card: title, who it's for, problem solved, deliverables, outcome, mini case study reference, CTA                                     |
| FR-16 | Anchor links from homepage services grid                                                                                                  |

#### Case Studies `/case-studies` + `/case-studies/[slug]`

| ID    | Requirement                                                                               |
| ----- | ----------------------------------------------------------------------------------------- |
| FR-17 | List page: grid of all case study cards with metric callout                               |
| FR-18 | Dynamic detail page populated from Sanity                                                 |
| FR-19 | Fields: client industry, problem, strategy, execution, results metrics array, testimonial |
| FR-20 | CTA at bottom: "Want results like this? Book a Call"                                      |

#### Blog / Insights `/insights` + `/insights/[slug]`

| ID    | Requirement                                            |
| ----- | ------------------------------------------------------ |
| FR-21 | List page with post cards (title, excerpt, tags, date) |
| FR-22 | Dynamic post page from Sanity portable text            |
| FR-23 | Tags/category filter                                   |
| FR-24 | Related posts section at bottom                        |

#### Contact `/contact`

| ID    | Requirement                                              |
| ----- | -------------------------------------------------------- |
| FR-25 | Cal.com discovery call embed (primary CTA)               |
| FR-26 | Contact form: name, email, business type, message        |
| FR-27 | Form submits to `/api/contact` → Resend email to Ashique |

#### Free Audit `/free-audit`

| ID    | Requirement                                                            |
| ----- | ---------------------------------------------------------------------- |
| FR-28 | Lead magnet landing page (standalone, no navbar distractions)          |
| FR-29 | Form: name, email, business name, monthly ad budget, biggest challenge |
| FR-30 | On submit: deliver PDF via Resend, add to email list                   |

---

## 6. Non-Functional Requirements

| Requirement           | Target                                                     |
| --------------------- | ---------------------------------------------------------- |
| Performance           | Lighthouse score ≥ 90 on all pages                         |
| Mobile Responsiveness | Fully responsive, tested on 375px–1440px                   |
| Page Load Speed       | LCP < 2.5 seconds                                          |
| SEO                   | `generateMetadata()` on all pages, sitemap.xml, robots.txt |
| Accessibility         | WCAG 2.1 AA compliant (alt tags, aria labels, contrast)    |
| Security              | Rate limiting on all API routes, no exposed API keys       |
| 3D Performance        | Lazy-loaded via next/dynamic; SSR disabled (NFR-08)        |
| Uptime                | Vercel managed — 99.9% uptime guaranteed                   |

---

## 7. AI Widget Requirements

| ID    | Requirement                                                          |
| ----- | -------------------------------------------------------------------- |
| FR-31 | Floating chat orb — bottom-right corner, always visible              |
| FR-32 | Opens sliding chat panel on click                                    |
| FR-33 | Answers questions about services, process, pricing approach, results |
| FR-34 | Powered by Gemini 3.1 Pro + Pinecone RAG                           |
| FR-35 | Fallback: "Book a free call for specific advice" with booking link   |
| FR-36 | Streamed responses (no loading lag feel)                             |
| FR-37 | Chat history maintained during session                               |

---

## 8. CMS Requirements (Sanity.io)

| Content Type | Fields                                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Case Study   | title, slug, clientIndustry, problem, strategy, execution, metrics[], testimonial, clientName, coverImage, publishedAt |
| Blog Post    | title, slug, excerpt, body (portable text), coverImage, tags[], publishedAt, seoTitle, seoDescription                  |
| Testimonial  | name, role, company, quote, photo                                                                                      |
| Service      | title, slug, description, deliverables[], outcome, icon, featured                                                      |

---

## 9. Integrations

| Integration      | Purpose                | Free Tier        |
| ---------------- | ---------------------- | ---------------- |
| Sanity.io        | Headless CMS           | ✅               |
| Cal.com          | Discovery call booking | ✅               |
| Resend           | Transactional email    | ✅ 3K/mo         |
| Gemini 3.1 Pro  | AI widget              | ✅ 1M tokens/day |
| Pinecone         | Vector DB for RAG      | ✅               |
| Vercel Analytics | Traffic + performance  | ✅               |
| PostHog          | User behavior tracking | ✅               |

---

## 10. Release Milestones

| Week | Milestone                                               |
| ---- | ------------------------------------------------------- |
| 1    | Project setup, design system, Sanity schemas            |
| 2    | Homepage, About, Services pages (static)                |
| 3    | Dynamic pages (Case Studies, Blog), Forms, AI Widget    |
| 4    | SEO layer, performance audit, deploy to ashique.digital |

---

## 11. Success Metrics

| Metric                 | Target (Month 1) |
| ---------------------- | ---------------- |
| Discovery calls booked | ≥ 5/month        |
| Email captures         | ≥ 20/month       |
| Lighthouse score       | ≥ 90             |
| Bounce rate            | < 60%            |
| Avg. session duration  | > 2 minutes      |
