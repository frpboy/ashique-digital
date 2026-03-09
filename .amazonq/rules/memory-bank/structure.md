# Project Structure

## Directory Organization

### `/app` - Next.js App Router
Core application structure using Next.js 16 App Router with route groups and API routes.

**Route Groups:**
- `(site)/` - Main website pages with shared layout
  - `about/` - Professional bio and credentials
  - `case-studies/` - Client success stories (list + dynamic [slug])
  - `contact/` - Contact form and Cal.com booking
  - `free-audit/` - Lead magnet landing page
  - `insights/` - Blog/articles (list + dynamic [slug])
  - `services/` - Service offerings detail pages

**API Routes:**
- `api/agent/` - AI chat widget backend (Gemini + Pinecone RAG)
- `api/contact/` - Contact form submission handler
- `api/newsletter/` - Newsletter subscription handler

**Root Files:**
- `layout.tsx` - Root layout with global providers and metadata
- `page.tsx` - Homepage with hero, services, case studies, testimonials
- `globals.css` - Global styles and Tailwind directives
- `favicon.ico` - Site favicon

### `/components` - React Components
Organized by component type and responsibility.

**`/AIWidget`**
- `AIOrb.tsx` - Floating chat orb with sliding panel interface

**`/sections`** - Homepage sections
- `Hero.tsx` - Hero section with headline and dual CTAs
- `TrustBar.tsx` - Client logos and trust indicators
- `ProblemBlock.tsx` - Problem statement copy
- `ServicesGrid.tsx` - 6 service cards grid
- `CaseStudyPreview.tsx` - Featured case studies carousel
- `StudyCard.tsx` - Individual case study card component
- `ProcessSteps.tsx` - 4-step process visualization
- `Testimonials.tsx` - Client testimonials section
- `FinalCTA.tsx` - Bottom CTA with Cal.com embed

**`/shared`** - Reusable layout components
- `Navbar.tsx` - Sticky navigation with active CTA
- `Footer.tsx` - Site footer with links and social

### `/lib` - Utilities & Integrations
Core business logic and third-party service integrations.

- `sanity.ts` - Sanity client configuration
- `sanity.queries.ts` - GROQ queries for content fetching
- `resend.ts` - Resend email client setup
- `types.ts` - TypeScript type definitions

### `/sanity` - CMS Schema
Sanity.io content model definitions.

**`/schemas`**
- `caseStudy.ts` - Case study content type schema
- `index.ts` - Schema registry

### `/.agent` - Development Documentation
Comprehensive project documentation and agent configurations.

**`/docs`** - Project documentation
- `PRD.md` - Product Requirements Document
- `APIs.md` - API specifications
- `Brand.md` - Brand guidelines
- `Design.md` - Design system
- `Security.md` - Security requirements
- `_Tracker.md` - Development tracker

**`/agents`** - Specialized agent prompts
- `frontend-specialist.md`, `backend-specialist.md`, etc.

**`/skills`** - Reusable skill modules
- `nextjs-react-expert/`, `api-patterns/`, `clean-code/`, etc.

**`/workflows`** - Development workflows
- `create.md`, `debug.md`, `test.md`, `deploy.md`, etc.

### `/public` - Static Assets
Public static files served directly.

- SVG icons and images
- Favicon and app icons

## Architectural Patterns

### App Router Architecture
- Server Components by default for optimal performance
- Client Components ('use client') only where interactivity needed
- Route groups for logical organization without URL nesting
- Parallel routes for complex layouts

### Data Fetching Strategy
- Server-side data fetching in page components
- Sanity.io as headless CMS with GROQ queries
- API routes for form submissions and AI interactions
- Rate limiting on all API endpoints (Upstash Redis)

### Component Hierarchy
```
layout.tsx (Root)
├── Navbar (Shared)
├── page.tsx (Route-specific)
│   ├── Hero (Section)
│   ├── TrustBar (Section)
│   ├── ServicesGrid (Section)
│   └── ...
├── Footer (Shared)
└── AIOrb (Global Widget)
```

### State Management
- React 19 features (use, useOptimistic, useFormStatus)
- Server Actions for form submissions
- URL state for filters and pagination
- Local state for UI interactions

### Styling Architecture
- Tailwind CSS 4 for utility-first styling
- CSS variables for theme tokens
- Component-scoped styles when needed
- Responsive design with mobile-first approach

## Core Relationships

**Content Flow:**
Sanity CMS → GROQ Queries → Server Components → Rendered Pages

**Lead Capture Flow:**
Form Submission → API Route → Resend Email → Ashique's Inbox

**AI Chat Flow:**
User Message → API Route → Gemini AI + Pinecone RAG → Streamed Response

**Deployment Flow:**
Git Push → Vercel Build → Edge Network → Live Site
