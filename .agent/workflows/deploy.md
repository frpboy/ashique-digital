---
description: Deployment command for production releases to Vercel. Pre-flight checks and deployment execution for ashique.digital.
---

# /deploy — ashique.digital Production Deployment

$ARGUMENTS

---

## Sub-commands

```
/deploy            - Interactive deployment wizard
/deploy check      - Run pre-deployment checks only
/deploy preview    - Deploy to Vercel preview URL
/deploy production - Deploy to ashique.digital
/deploy rollback   - Rollback to previous Vercel deployment
```

---

## Pre-Deployment Checklist

Before any deployment, verify ALL of the following:

```markdown
## 🚀 Pre-Deploy Checklist — ashique.digital

### Code Quality

- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] ESLint passing (`npx eslint .`)
- [ ] No console.log in production code

### Security

- [ ] All API keys in Vercel env vars (not in code)
- [ ] `.env.local` NOT committed to git
- [ ] Rate limiting active on /api/contact, /api/agent, /api/newsletter
- [ ] `npm audit` returns 0 critical vulnerabilities
- [ ] HTTP security headers configured in next.config.ts

### Performance

- [ ] All images use next/image (no raw <img> tags)
- [ ] Lighthouse score ≥ 90 on homepage
- [ ] Bundle size checked (`ANALYZE=true npm run build`)

### CMS & Integrations

- [ ] Sanity Studio deployed (`npx sanity deploy`)
- [ ] CORS origins updated in Sanity for production domain
- [ ] Cal.com booking URL verified (cal.com/ashique/strategy)
- [ ] Resend email delivery tested
- [ ] AI widget tested end-to-end

### SEO

- [ ] generateMetadata() on all pages
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] robots.txt accessible at /robots.txt
- [ ] OG images present for each page

### Content

- [ ] At least 2 case studies seeded in Sanity
- [ ] At least 1 blog post seeded in Sanity
- [ ] Testimonials seeded in Sanity
- [ ] All 6 services populated
```

---

## Deployment Flow

```
Local Build Check
      ↓
npx tsc --noEmit && npm run build
      ↓
git push origin main
      ↓
Vercel auto-deploy triggered
      ↓
Check Vercel dashboard for build logs
      ↓
Visit ashique.digital → verify all pages
      ↓
Run Lighthouse audit
      ↓
✅ Complete
```

---

## Vercel CLI Commands

```bash
# Install Vercel CLI (once)
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Add environment variable
vercel env add SECRET_NAME

# List environment variables
vercel env ls

# View recent deployments
vercel ls

# Rollback to previous
vercel rollback
```

---

## Domain: ashique.digital

DNS is managed via Vercel. Nameservers:

- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

To update domain in Vercel project:

```
Vercel Dashboard → Project → Settings → Domains → ashique.digital
```

---

## Environment Variables to Set in Vercel

```bash
vercel env add SANITY_API_TOKEN
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
vercel env add GOOGLE_GENERATIVE_AI_API_KEY
vercel env add PINECONE_API_KEY
vercel env add PINECONE_INDEX
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
```

Public vars (set via Vercel dashboard):

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
```

---

## Post-Deploy Verification

After deploying, manually verify:

1. `https://ashique.digital` — homepage loads correctly
2. `https://ashique.digital/contact` — Cal.com embed shows
3. `https://ashique.digital/api/contact` — returns 405 (Method Not Allowed for GET)
4. `https://ashique.digital/sitemap.xml` — returns valid XML
5. `https://ashique.digital/robots.txt` — returns text file
6. Submit contact form and verify email received
7. Send an AI widget message and verify streamed response
