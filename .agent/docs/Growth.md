# Growth Strategy Document — ashique.digital

> **Version:** 1.0.0
> **Last Updated:** 2026-03-09

---

## 1. Growth Philosophy

Ashique's growth strategy is built on **earned authority, not paid attention**. The website acts as the hub for a content-driven flywheel:

```
Content (Insights Blog)
        ↓
SEO Traffic + LinkedIn Distribution
        ↓
Lead Magnet Capture
        ↓
Email Nurture Sequence
        ↓
Discovery Call Booked
        ↓
Client Win → New Case Study
        ↓
Back to Content ↑
```

---

## 2. Brand Positioning

### 2.1 Core Positioning Statement

> **"Ashique engineers growth systems — not just campaigns."**

This reframes Ashique from commodity ad-runner to strategic growth partner.

### 2.2 Headline Options (A/B Test)

| Version | Headline                                                              |
| ------- | --------------------------------------------------------------------- |
| A       | "Stop Running Ads. Start Building a Growth System."                   |
| B       | "I Help Ambitious Businesses Generate More Leads and Scale Smarter"   |
| C       | "Your full-stack growth partner: strategy, funnels, and paid traffic" |

### 2.3 Unique Value Proposition

> Ashique doesn't just set up campaigns — he designs the full system: strategy, funnel, traffic, and tracking — so your growth is predictable, not accidental.

### 2.4 Brand Personality

| Trait        | Expression                                        |
| ------------ | ------------------------------------------------- |
| Confident    | Speaks like a seasoned advisor, not a salesperson |
| Direct       | Leads with results and outcomes, not features     |
| Approachable | Avoids jargon, sounds human                       |
| Data-driven  | Backs every claim with metrics and frameworks     |

---

## 3. Target Audience

| Segment          | Profile                                             | Pain Points                                     |
| ---------------- | --------------------------------------------------- | ----------------------------------------------- |
| SME Owners       | ₹1Cr–₹20Cr revenue, 5–50 employees, digital-curious | Wasting ad budget, no predictable lead pipeline |
| Startup Founders | Pre-Series A, need GTM strategy                     | No brand presence, burn rate concerns           |
| Marketing Mgrs   | Mid-size companies, need external expertise         | Agency fatigue, want a strategic partner        |

---

## 4. SEO Strategy

### 4.1 Keyword Targets

#### Commercial Intent (Service Pages)

| Keyword                                   | Target Page | Difficulty |
| ----------------------------------------- | ----------- | ---------- |
| brand strategist for small business India | `/services` | Medium     |
| lead generation consultant freelancer     | `/`         | Medium     |
| digital marketing strategy for startups   | `/services` | Medium     |
| paid ads specialist India                 | `/services` | Medium     |
| funnel design consultant                  | `/services` | Low        |
| growth marketing freelancer India         | `/about`    | Low        |

#### Informational (Blog / Insights)

| Keyword                                          | Target Post Idea                                            |
| ------------------------------------------------ | ----------------------------------------------------------- |
| how to generate leads for small business India   | "The 5-Step Lead Gen Framework for Indian SMEs"             |
| best lead generation strategy startups 2026      | "Lead Gen in 2026: What's Working for Indian Startups"      |
| how to build a sales funnel for service business | "Build a Sales Funnel That Converts (Step-by-Step)"         |
| Google Ads vs Meta Ads for lead generation       | "Google vs Meta Ads: Which Wins for Lead Gen in India?"     |
| what is brand strategy for digital marketing     | "What is Brand Strategy? (And Why Your Business Needs One)" |

### 4.2 On-Page SEO Rules

| Element          | Rule                                                      |
| ---------------- | --------------------------------------------------------- | --------------------------------- |
| Title Tags       | `[Service/Topic]                                          | Ashique — Brand Strategist India` |
| Meta Description | 150–160 chars, includes primary keyword and clear benefit |
| H1               | One per page, contains primary keyword                    |
| H2-H3            | Semantic hierarchy, include secondary keywords            |
| Image Alt        | Descriptive, keyword-relevant, no "image1.jpg"            |
| Internal Links   | Every blog post links to 1–2 relevant service pages       |

### 4.3 Technical SEO Checklist

- [ ] `generateMetadata()` on all pages
- [ ] `sitemap.xml` auto-generated via `next-sitemap`
- [ ] `robots.txt` allows all, blocks `/api/`
- [ ] Canonical URLs on all pages
- [ ] JSON-LD structured data on homepage + case study pages
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 100ms
- [ ] Mobile-first — passes Google Mobile Usability test
- [ ] Image alt tags on all images

---

## 5. Content Strategy

### 5.1 Content Pillars

| Pillar           | Format          | Frequency    | Example                                              |
| ---------------- | --------------- | ------------ | ---------------------------------------------------- |
| Tactical How-tos | Long-form blog  | 2x/month     | "How to Build a WhatsApp Lead Funnel in 7 Days"      |
| Frameworks       | Blog + LinkedIn | 2x/month     | "The 4-Layer Lead Generation System Every SME Needs" |
| POV / Opinion    | Blog + LinkedIn | 1x/month     | "Why Indian Startups Waste 80% of Their Ad Budget"   |
| Case Studies     | Website + Blog  | As available | "How We 3.2x'd a D2C Brand's ROAS in 60 Days"        |
| Platform Reviews | Blog            | 1x/month     | "Meta Ads vs Google Ads 2026: Real Data from India"  |

### 5.2 Content Calendar (Month 1)

| Week | Content                                                | Channel            |
| ---- | ------------------------------------------------------ | ------------------ |
| 1    | "The 5-Step Lead Gen Framework for Indian SMEs" (blog) | Website + LinkedIn |
| 2    | Case Study #1 published                                | Website + LinkedIn |
| 3    | "Why Your Ads Aren't Working" (blog + lead magnet)     | Website + LinkedIn |
| 4    | "Google vs Meta Ads India 2026" (blog)                 | Website + LinkedIn |

### 5.3 Distribution Channels

| Content Type | Primary Channel | Repurposed As                    |
| ------------ | --------------- | -------------------------------- |
| Blog Post    | ashique.digital | LinkedIn article + carousel      |
| Case Study   | ashique.digital | LinkedIn post + email newsletter |
| Quick tip    | LinkedIn        | Twitter/X thread                 |
| Framework    | Blog            | LinkedIn carousel (10 slides)    |

---

## 6. Lead Magnet Strategy

### 6.1 Primary Lead Magnet

**"The 15-Point Lead Generation Audit Checklist"** (PDF)

- Gated behind Free Audit form (`/free-audit`)
- Delivered via Resend email with PDF attachment
- Covers: ads account, funnel, CRM, tracking, landing pages

### 6.2 Secondary Lead Magnets (Post-Launch)

| Lead Magnet                        | Format  | Capture Point       |
| ---------------------------------- | ------- | ------------------- |
| "5-Step Lead Generation Framework" | PDF     | Blog sidebar opt-in |
| "Your Ads ROI Calculator"          | Web app | Blog post embed     |
| "Free Funnel Audit Checklist"      | PDF     | Exit-intent popup   |

### 6.3 Email Nurture Sequence (Post-Opt-In)

| Email | Timing | Subject                                        | Goal                   |
| ----- | ------ | ---------------------------------------------- | ---------------------- |
| 1     | Day 0  | Your free audit is here 👇                     | Deliver lead magnet    |
| 2     | Day 2  | The #1 mistake I see in SME marketing          | Value + trust building |
| 3     | Day 5  | Case Study: How we 3.2x'd a brand's ROAS       | Social proof           |
| 4     | Day 7  | How Ashique works (and if we're a good fit)    | Pre-qualify leads      |
| 5     | Day 10 | Ready to build your growth system? Book a call | Conversion CTA         |

---

## 7. LinkedIn Strategy

LinkedIn is Ashique's primary organic distribution channel.

### 7.1 Content Types (Weekly)

| Day       | Content Type                    |
| --------- | ------------------------------- |
| Monday    | Tactical tip (short post)       |
| Wednesday | Framework or opinion (carousel) |
| Friday    | Case study result or data post  |

### 7.2 Engagement Protocol

- Reply to every comment within 24 hours
- Engage with 5–10 posts daily in target audience's network
- Comment on industry conversations before posting own content

---

## 8. Conversion Rate Optimization (CRO)

### 8.1 CTA Hierarchy

| Commitment | CTA                             | Placement                             |
| ---------- | ------------------------------- | ------------------------------------- |
| Low        | "Download Free Audit Checklist" | Blog posts, exit-intent popup         |
| Medium     | "Read Case Study"               | Homepage, services page               |
| High       | "Book a Free Strategy Call"     | Navbar, hero, final CTA, contact page |

### 8.2 Social Proof Elements

- **Micro-trust badges** in hero: "50+ Brands Scaled", "₹2Cr+ Revenue Generated"
- **Bold metric callouts** on case study cards: "3.2x ROAS", "220% more leads"
- **Specific testimonials** — not "great to work with" but "went from 12→80 leads/month"
- **Industry logos** in trust bar (anonymized if needed)

### 8.3 A/B Testing Plan (Month 2+)

| Test          | Variant A                 | Variant B                        | Metric       |
| ------------- | ------------------------- | -------------------------------- | ------------ |
| Hero CTA      | "Book a Free Call"        | "Get Your Free Strategy Session" | Click rate   |
| Hero headline | (see positioning options) | (see positioning options)        | Scroll depth |
| CTA color     | Electric Teal `#00C2CB`   | Energetic Orange `#FF6B35`       | Conv. rate   |

---

## 9. Analytics & KPI Tracking

### 9.1 Primary KPIs

| Metric                 | Target (Month 1) | Target (Month 3) |
| ---------------------- | ---------------- | ---------------- |
| Organic sessions/month | 200              | 1,000            |
| Discovery calls booked | 5                | 15               |
| Email list signups     | 20               | 100              |
| Bounce rate            | < 60%            | < 50%            |
| Avg. session duration  | > 2 min          | > 3 min          |
| Case study page views  | 50/month         | 300/month        |

### 9.2 Tracking Setup

| Tool                  | What it Tracks                             |
| --------------------- | ------------------------------------------ |
| Vercel Analytics      | Page views, Core Web Vitals                |
| PostHog               | User sessions, click maps, funnel analysis |
| Google Search Console | Rankings, impressions, CTR                 |
| Cal.com dashboard     | Bookings, conversion rates                 |

---

## 10. Authority Building Timeline

| Month | Activity                                              |
| ----- | ----------------------------------------------------- |
| 1     | Publish 4 blog posts, 1 case study, 12 LinkedIn posts |
| 2     | Guest post on 1 Indian marketing blog                 |
| 3     | Launch email newsletter (weekly)                      |
| 4     | Publish video case study (YouTube/LinkedIn)           |
| 6     | Apply for speaking at 1 startup/marketing event       |
| 12    | Launch a free mini-course or micro-product            |
