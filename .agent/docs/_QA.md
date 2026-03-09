# QA Document — ashique.digital

> **Version:** 1.0.0
> **Last Updated:** 2026-03-09

---

## 1. QA Strategy

### 1.1 Testing Pyramid

```
          ┌─────────────┐
          │   E2E Tests  │  ← Playwright (critical user flows)
          ├─────────────┤
          │ Integration  │  ← API routes, Sanity queries
          ├─────────────┤
          │ Unit Tests   │  ← Utilities, helpers, hooks
          └─────────────┘
```

### 1.2 Tools

| Tool       | Purpose                     |
| ---------- | --------------------------- |
| Vitest     | Unit & integration tests    |
| Playwright | E2E browser tests           |
| Lighthouse | Performance & accessibility |
| axe-core   | Accessibility testing       |

---

## 2. Browser & Device Matrix

### 2.1 Desktop Browsers

| Browser | Version | Priority | Status |
| ------- | ------- | -------- | ------ |
| Chrome  | Latest  | P1       | ☐      |
| Firefox | Latest  | P1       | ☐      |
| Safari  | 16+     | P1       | ☐      |
| Edge    | Latest  | P2       | ☐      |

### 2.2 Mobile Devices

| Device             | OS      | Viewport  | Priority | Status |
| ------------------ | ------- | --------- | -------- | ------ |
| iPhone 14 Pro      | iOS 17  | 390×844   | P1       | ☐      |
| iPhone SE          | iOS 16  | 375×667   | P1       | ☐      |
| Samsung Galaxy S23 | Android | 360×780   | P1       | ☐      |
| iPad Pro           | iPadOS  | 1024×1366 | P2       | ☐      |

### 2.3 Viewport Breakpoints

| Breakpoint | Range           | Status |
| ---------- | --------------- | ------ |
| Mobile S   | 320px – 375px   | ☐      |
| Mobile M   | 376px – 428px   | ☐      |
| Tablet     | 768px – 1024px  | ☐      |
| Desktop    | 1024px – 1440px | ☐      |
| Wide       | 1440px+         | ☐      |

---

## 3. Functional Test Cases

### 3.1 Homepage

| ID     | Test Case                                        | Expected Result                      | Status |
| ------ | ------------------------------------------------ | ------------------------------------ | ------ |
| TC-001 | Page loads without errors                        | HTTP 200, no console errors          | ☐      |
| TC-002 | Sticky navbar visible on scroll                  | Navbar stays fixed with blur bg      | ☐      |
| TC-003 | Hero section CTA "Book a Free Call" is clickable | Redirects to `/contact` or opens Cal | ☐      |
| TC-004 | Services grid renders 6 cards                    | Exactly 6 service cards visible      | ☐      |
| TC-005 | Case study preview shows 3 featured cards        | 3 cards from Sanity data             | ☐      |
| TC-006 | Testimonials section renders                     | At least 1 testimonial quote visible | ☐      |
| TC-007 | Footer newsletter form accepts email input       | Input field functional               | ☐      |
| TC-008 | All nav links navigate to correct pages          | No 404s on nav click                 | ☐      |

### 3.2 Contact Page

| ID     | Test Case                                   | Expected Result                    | Status |
| ------ | ------------------------------------------- | ---------------------------------- | ------ |
| TC-009 | Cal.com embed loads successfully            | Booking widget visible             | ☐      |
| TC-010 | Contact form — all fields required          | Validation errors on empty submit  | ☐      |
| TC-011 | Contact form — valid submission sends email | Success message, email received    | ☐      |
| TC-012 | Contact form — invalid email shows error    | "Invalid email" validation message | ☐      |
| TC-013 | Rate limiting on `/api/contact`             | 429 after 5 requests/min           | ☐      |

### 3.3 Free Audit Page

| ID     | Test Case                           | Expected Result                          | Status |
| ------ | ----------------------------------- | ---------------------------------------- | ------ |
| TC-014 | Page has no navbar (standalone)     | No navigation visible                    | ☐      |
| TC-015 | Form renders all 5 fields           | name, email, business, budget, challenge | ☐      |
| TC-016 | Valid submission triggers PDF email | Email with PDF attachment received       | ☐      |
| TC-017 | Duplicate email submission          | Handled gracefully (no crash)            | ☐      |

### 3.4 Case Studies

| ID     | Test Case                                      | Expected Result                   | Status |
| ------ | ---------------------------------------------- | --------------------------------- | ------ |
| TC-018 | List page renders all case studies from Sanity | Cards match Sanity content        | ☐      |
| TC-019 | Dynamic slug page loads for each case study    | All key fields displayed          | ☐      |
| TC-020 | Invalid slug shows 404                         | Custom 404 page                   | ☐      |
| TC-021 | Bottom CTA links to booking                    | "Book a Call" navigates correctly | ☐      |

### 3.5 Blog / Insights

| ID     | Test Case                                    | Expected Result                 | Status |
| ------ | -------------------------------------------- | ------------------------------- | ------ |
| TC-022 | Blog list renders posts from Sanity          | Post cards visible              | ☐      |
| TC-023 | Tag filter works                             | Filters posts by selected tag   | ☐      |
| TC-024 | Dynamic blog post page renders portable text | Full content rendered correctly | ☐      |
| TC-025 | Related posts section shows ≤ 3 posts        | Related posts visible at bottom | ☐      |

### 3.6 AI Widget

| ID     | Test Case                                    | Expected Result                    | Status |
| ------ | -------------------------------------------- | ---------------------------------- | ------ |
| TC-026 | AI orb visible on all pages                  | Floating button bottom-right       | ☐      |
| TC-027 | Clicking orb opens chat panel                | Panel slides in smoothly           | ☐      |
| TC-028 | Sending a message receives streamed response | Characters stream in progressively | ☐      |
| TC-029 | Unknown question triggers booking fallback   | Booking link shown in response     | ☐      |
| TC-030 | Chat history persists during session         | Previous messages remain visible   | ☐      |
| TC-031 | Rate limiting on `/api/agent`                | 429 after threshold                | ☐      |

---

## 4. Performance Test Cases

| ID     | Test Case                       | Target          | Tool        | Status |
| ------ | ------------------------------- | --------------- | ----------- | ------ |
| TC-032 | Homepage Lighthouse Performance | ≥ 90            | Lighthouse  | ☐      |
| TC-033 | Homepage LCP                    | < 2.5s          | Lighthouse  | ☐      |
| TC-034 | Homepage FID/INP                | < 100ms         | Lighthouse  | ☐      |
| TC-035 | Homepage CLS                    | < 0.1           | Lighthouse  | ☐      |
| TC-036 | JS bundle size                  | < 300KB gzipped | Analyzer    | ☐      |
| TC-037 | All images use `next/image`     | No `<img>` tags | Code review | ☐      |

---

## 5. SEO Test Cases

| ID     | Test Case                       | Expected Result                 | Status |
| ------ | ------------------------------- | ------------------------------- | ------ |
| TC-038 | All pages have title tag        | `<title>` present on all pages  | ☐      |
| TC-039 | All pages have meta description | `<meta description>` present    | ☐      |
| TC-040 | OG image present for each page  | `og:image` meta tag set         | ☐      |
| TC-041 | Structured data on homepage     | JSON-LD validates on schema.org | ☐      |
| TC-042 | sitemap.xml accessible          | Returns valid XML               | ☐      |
| TC-043 | robots.txt accessible           | Correct allow/disallow rules    | ☐      |
| TC-044 | Canonical URLs set on all pages | No duplicate content            | ☐      |

---

## 6. Accessibility Test Cases (WCAG 2.1 AA)

| ID     | Test Case                                         | Expected Result           | Status |
| ------ | ------------------------------------------------- | ------------------------- | ------ |
| TC-045 | All images have alt text                          | No empty `alt` attributes | ☐      |
| TC-046 | Color contrast ratio ≥ 4.5:1 for body text        | axe-core passes           | ☐      |
| TC-047 | Keyboard navigation works throughout              | Tab order logical         | ☐      |
| TC-048 | ARIA labels on interactive elements               | Screen reader accessible  | ☐      |
| TC-049 | Form labels associated with inputs                | No unlabeled inputs       | ☐      |
| TC-050 | Focus indicator visible on all focusable elements | Ring/outline visible      | ☐      |

---

## 7. Security Test Cases

| ID     | Test Case                            | Expected Result                | Status |
| ------ | ------------------------------------ | ------------------------------ | ------ |
| TC-051 | No API keys exposed in client bundle | No secrets in browser source   | ☐      |
| TC-052 | CSRF protection on form routes       | Token validation active        | ☐      |
| TC-053 | Rate limiting on all API routes      | 429 after threshold per IP     | ☐      |
| TC-054 | XSS — malicious input sanitized      | `<script>` tags stripped       | ☐      |
| TC-055 | HTTP security headers present        | CSP, X-Frame-Options, HSTS set | ☐      |
| TC-056 | Form honeypot field blocks bots      | Bot submissions rejected       | ☐      |

---

## 8. Test Execution Checklist (Pre-Launch)

### Week 3 — Internal QA

- [ ] All functional test cases passed
- [ ] Mobile responsiveness verified on 3 devices
- [ ] Lighthouse ≥ 90 on all pages
- [ ] AI widget end-to-end tested
- [ ] All API routes tested with Postman/Hoppscotch

### Week 4 — Pre-Launch QA

- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] All SEO meta tags verified
- [ ] Accessibility audit via axe DevTools
- [ ] Security headers checked via securityheaders.com
- [ ] DNS propagation confirmed for ashique.digital
- [ ] Vercel Analytics enabled and tracking

---

## 9. Bug Severity Classification

| Severity      | Definition                            | SLA to Fix  |
| ------------- | ------------------------------------- | ----------- |
| P0 — Blocker  | Site down, booking broken, data loss  | Immediate   |
| P1 — Critical | Core feature broken (form, AI widget) | Same day    |
| P2 — Major    | Non-critical feature broken           | 48 hours    |
| P3 — Minor    | Visual inconsistency, minor UX issue  | Next sprint |
| P4 — Trivial  | Cosmetic issue, typo                  | Backlog     |
