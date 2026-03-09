# Design Spec — ashique.digital

> **Version:** 1.0.0
> **Last Updated:** 2026-03-09

---

## 1. Design Philosophy

The visual identity communicates **premium, strategic, and modern** — not playful or generic. Every design decision should reinforce Ashique's positioning as a senior growth strategist, not a commodity freelancer.

**Core Principles:**

- **Clarity over decoration** — every element earns its place
- **Generous whitespace** — premium brands breathe
- **Bold typographic hierarchy** — let type do the heavy lifting
- **Purposeful motion** — animation adds meaning, not noise

---

## 2. Color Palette

### 2.1 Primary Colors

| Name          | Hex       | CSS Variable      | Usage                                    |
| ------------- | --------- | ----------------- | ---------------------------------------- |
| Deep Navy     | `#0D1B2A` | `--color-primary` | Primary backgrounds, headings, authority |
| Electric Teal | `#00C2CB` | `--color-accent`  | CTAs, highlights, hover states, links    |
| Off White     | `#F8F9FA` | `--color-bg`      | Page background, light sections          |
| Light Gray    | `#E9ECEF` | `--color-muted`   | Borders, dividers, card backgrounds      |
| Near Black    | `#1A1A2E` | `--color-text`    | Body text, paragraphs                    |

### 2.2 Extended Palette

| Name          | Hex       | Usage                       |
| ------------- | --------- | --------------------------- |
| Navy Light    | `#162C40` | Dark section backgrounds    |
| Teal Dark     | `#009CA3` | Hover state for teal accent |
| Success Green | `#10B981` | Form success states         |
| Warning Amber | `#F59E0B` | Badges, warnings            |
| Error Red     | `#EF4444` | Form error states           |

### 2.3 Gradient Definitions

```css
/* Hero gradient — navy to transparent */
--gradient-hero: linear-gradient(
  135deg,
  #0d1b2a 0%,
  #162c40 50%,
  rgba(13, 27, 42, 0) 100%
);

/* Accent gradient — teal shimmer */
--gradient-accent: linear-gradient(90deg, #00c2cb, #009ca3);

/* Card shimmer — on hover */
--gradient-card: linear-gradient(
  135deg,
  rgba(0, 194, 203, 0.05) 0%,
  rgba(13, 27, 42, 0.03) 100%
);
```

---

## 3. Typography

### 3.1 Font Stack

| Role     | Font             | Import Source | Weight  | CSS Variable     |
| -------- | ---------------- | ------------- | ------- | ---------------- |
| Headings | Syne             | Google Fonts  | 700–800 | `--font-heading` |
| Body     | Inter            | Google Fonts  | 400–500 | `--font-body`    |
| Accent   | Playfair Display | Google Fonts  | 400–700 | `--font-accent`  |

### 3.2 Type Scale

| Level | Element  | Size (Desktop)  | Size (Mobile) | Weight | Line Height |
| ----- | -------- | --------------- | ------------- | ------ | ----------- |
| H1    | Hero     | `5rem` (80px)   | `2.5rem`      | 800    | 1.1         |
| H2    | Section  | `3rem` (48px)   | `2rem`        | 700    | 1.2         |
| H3    | Cards    | `1.5rem` (24px) | `1.25rem`     | 700    | 1.3         |
| Body  | Content  | `1.125rem`      | `1rem`        | 400    | 1.7         |
| Small | Captions | `0.875rem`      | `0.875rem`    | 500    | 1.5         |

### 3.3 Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&display=swap"
/>
```

---

## 4. Spacing System

Uses an 8px base grid:

| Token | Value   | Usage                      |
| ----- | ------- | -------------------------- |
| `xs`  | `4px`   | Inline gaps, small padding |
| `sm`  | `8px`   | Component internal spacing |
| `md`  | `16px`  | Card padding, section gaps |
| `lg`  | `24px`  | Section separators         |
| `xl`  | `48px`  | Section padding            |
| `2xl` | `80px`  | Page section padding       |
| `3xl` | `120px` | Hero padding               |

---

## 5. Component Library

### 5.1 Buttons

```css
/* Primary CTA Button */
.btn-primary {
  background: #00c2cb;
  color: #0d1b2a;
  padding: 14px 28px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 194, 203, 0.3);
}
.btn-primary:hover {
  background: #009ca3;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 194, 203, 0.4);
}

/* Secondary Button (Outline) */
.btn-secondary {
  background: transparent;
  color: #0d1b2a;
  border: 2px solid #0d1b2a;
  padding: 12px 26px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: #0d1b2a;
  color: #f8f9fa;
}
```

### 5.2 Service Cards

```css
.service-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
}
.service-card:hover {
  border-color: #00c2cb;
  box-shadow: 0 8px 32px rgba(0, 194, 203, 0.1);
  transform: translateY(-4px);
}
```

### 5.3 Case Study Cards

```css
.case-study-card {
  background: #0d1b2a;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}
.case-study-metric {
  font-size: 2.5rem;
  font-weight: 800;
  font-family: var(--font-heading);
  color: #00c2cb;
}
```

---

## 6. Page-Level Design Specs

### 6.1 Homepage Sections

| Section            | Background                   | Layout                        | Notes                          |
| ------------------ | ---------------------------- | ----------------------------- | ------------------------------ |
| Navbar             | White/transparent (scrolled) | Fixed top, 100% wide          | Blurs on scroll                |
| Hero               | `#F8F9FA`                    | 2-col: text left, photo right | Large H1, dual CTA             |
| Trust Bar          | `#F8F9FA`                    | Full-width logo strip         | Grayscale logos, teal on hover |
| Problem Block      | `#0D1B2A`                    | Centered copy, max 700px w    | White text, teal accent line   |
| Services Grid      | `#F8F9FA`                    | 3-col card grid               | Hover lift effect              |
| Case Study Preview | `#F8F9FA`                    | 3-col card grid               | Dark cards, metric callouts    |
| Process Steps      | `#FFFFFF`                    | Horizontal timeline desktop   | Vertical on mobile             |
| Testimonials       | `#F8F9FA`                    | 2-3 quote cards               | Pull-quote design with photo   |
| Final CTA          | `#0D1B2A`                    | Centered, full-width          | Teal CTA button, white text    |
| Footer             | `#0D1B2A`                    | 4-col grid + bottom bar       | Links, social, newsletter      |

### 6.2 Navbar Spec

```
[Logo: Ashique · Digital]    [Services] [Case Studies] [Insights] [Contact]    [Book a Free Call →]
```

- Sticky position, `backdrop-filter: blur(12px)` on scroll
- Logo: Syne 700, `#0D1B2A`
- Nav links: Inter 500, `#1A1A2E` → `#00C2CB` on hover
- CTA: Primary button style

---

## 7. Animation System (Framer Motion)

### 7.1 Section Reveal

```tsx
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};
```

### 7.2 Staggered Children

```tsx
const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};
```

### 7.3 Card Hover

```tsx
// Framer Motion whileHover
whileHover={{ y: -4, transition: { duration: 0.2 } }}
```

### 7.4 AI Orb Pulse

```css
@keyframes orb-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(0, 194, 203, 0.4);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(0, 194, 203, 0);
  }
}
```

---

## 8. Responsive Breakpoints

| Breakpoint | Width  | Layout Changes                |
| ---------- | ------ | ----------------------------- |
| `sm`       | 640px  | Stack all 2-col layouts       |
| `md`       | 768px  | 2-col grids become 1-col      |
| `lg`       | 1024px | Full desktop layout activated |
| `xl`       | 1280px | Max content width applied     |
| `2xl`      | 1536px | Content capped at `max-w-7xl` |

---

## 9. Iconography

- **Library:** Lucide React (lightweight, consistent)
- **Size:** 24px default, 20px in dense UIs
- **Color:** Matches text color or `#00C2CB` for accent icons
- **Service icons:** Custom SVG or Phosphor Icons for uniqueness

---

## 10. Imagery Guidelines

- **No stock photos** of generic business people
- **Ashique's real photos** — professional, candid, in-context
- **Aspect ratios:**
  - Hero photo: 3:4 portrait
  - Case study covers: 16:9 landscape
  - Blog post covers: 16:9 landscape
  - Team/about photo: 1:1 square
- **Format:** WebP via `next/image` with AVIF fallback
- **Optimization:** Width/height always specified to prevent CLS

---

## 11. Dark Section Text Rules

When on dark navy (`#0D1B2A`) backgrounds:

| Element   | Color     |
| --------- | --------- |
| Headings  | `#FFFFFF` |
| Body text | `#CBD5E1` |
| Accent    | `#00C2CB` |
| Muted     | `#94A3B8` |

---

## 12. v0.dev Prompt (Rapid UI Scaffolding)

Use this on [v0.dev](https://v0.dev) to generate the homepage UI:

```
Build a modern, minimal portfolio homepage for Ashique,
a Brand Strategist and Lead Generation Consultant.

Design system:
- Background: #F8F9FA, Primary: #0D1B2A, Accent: #00C2CB
- Font: Syne for headings, Inter for body
- Style: editorial, generous whitespace, bold typography

Include these sections in order:
1. Sticky navbar: logo "Ashique · Digital", nav links
   (Services, Case Studies, Insights, Contact),
   CTA button "Book a Free Call" in teal
2. Hero: Large headline, subheadline, two CTA buttons,
   space for professional photo on right
3. Trust bar: horizontal strip of 5 client logo placeholders
4. Services grid: 3-column card layout, 6 service cards
5. Case study preview: 3 dark cards with metric callout
6. 4-step process: horizontal timeline on desktop
7. Testimonials: 2 quote cards with name, company type
8. CTA section: dark navy background, teal CTA button
9. Footer: links, social icons, newsletter signup

Use Tailwind CSS, shadcn/ui, and Framer Motion animations.
Fully responsive. No purple/violet colors.
```
