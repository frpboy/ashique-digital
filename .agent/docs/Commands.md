# Dev Commands Reference — ashique.digital

> **Version:** 1.0.0
> **Shell:** PowerShell (Windows) / bash (Mac/Linux)
> **Last Updated:** 2026-03-09

---

## 1. Project Setup

### 1.1 Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-org/ashique-digital.git
cd ashique-digital

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Then fill in your values in .env.local
```

### 1.2 First-Time Setup

```bash
# Install all required packages
npm install next@latest react@latest react-dom@latest
npm install typescript @types/node @types/react @types/react-dom
npm install tailwindcss @tailwindcss/typography postcss autoprefixer
npm install framer-motion
npm install @sanity/client @sanity/image-url next-sanity
npm install sanity
npm install resend react-email
npm install react-hook-form @hookform/resolvers zod
npm install @google/generative-ai
npm install @pinecone-database/pinecone
npm install @upstash/ratelimit @upstash/redis
npm install lucide-react
npm install next-sitemap
npm install posthog-js

# Install shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card dialog sheet input textarea badge
```

---

## 2. Development Server

```bash
# Start dev server (default: http://localhost:3000)
npm run dev

# Start on a specific port
npm run dev -- -p 3001

# Start with turbopack (faster HMR)
npm run dev --turbo
```

---

## 3. Build & Production

```bash
# Build for production
npm run build

# Start production server (after build)
npm start

# Analyze bundle size
ANALYZE=true npm run build
```

---

## 4. Sanity CMS Commands

### 4.1 Studio Development

```bash
# Start Sanity Studio in development (usually runs on :3333)
npx sanity dev

# Or if sanity is in a subfolder
cd sanity && npx sanity dev
```

### 4.2 Schema Deployment

```bash
# Deploy Sanity Studio to hosted URL (sanity.studio)
npx sanity deploy

# Check current Sanity project info
npx sanity projects list

# CORS — add allowed origin for your domain
npx sanity cors add https://ashique.digital
npx sanity cors add http://localhost:3000
```

### 4.3 Sanity Dataset Management

```bash
# List datasets
npx sanity dataset list

# Export dataset backup
npx sanity dataset export production ./backup.tar.gz

# Import dataset (careful — this overwrites!)
npx sanity dataset import ./backup.tar.gz production
```

---

## 5. AI Widget — Pinecone Setup

```bash
# Install Pinecone CLI (optional)
npm install -g @pinecone-database/cli

# Run the knowledge base embedding script
# (After creating and filling knowledge-base/*.md files)
node scripts/embed-knowledge.js

# Or with TypeScript
npx ts-node scripts/embed-knowledge.ts
```

### 5.1 Knowledge Base Embedding Script

```typescript
// scripts/embed-knowledge.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

async function embedAndUpload() {
  const index = pinecone.index(process.env.PINECONE_INDEX!);
  const knowledgeDir = path.join(process.cwd(), "knowledge-base");
  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));

  const embeddingModel = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });

  for (const file of files) {
    const content = fs.readFileSync(path.join(knowledgeDir, file), "utf-8");

    // Chunk content into ~500 char segments
    const chunks = content.match(/.{1,500}/gs) || [];

    const vectors = await Promise.all(
      chunks.map(async (chunk, i) => {
        const result = await embeddingModel.embedContent(chunk);
        return {
          id: `${file}-chunk-${i}`,
          values: result.embedding.values,
          metadata: { text: chunk, source: file },
        };
      }),
    );

    await index.upsert(vectors);
    console.log(`✅ Embedded ${file} (${chunks.length} chunks)`);
  }
}

embedAndUpload();
```

---

## 6. Vercel Deployment

### 6.1 Initial Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 6.2 Environment Variables (via CLI)

```bash
# Add env var to Vercel project
vercel env add RESEND_API_KEY
vercel env add SANITY_API_TOKEN
vercel env add GOOGLE_GENERATIVE_AI_API_KEY
vercel env add PINECONE_API_KEY
vercel env add PINECONE_INDEX
vercel env add CONTACT_EMAIL

# List all env vars
vercel env ls

# Pull env vars to local
vercel env pull .env.local
```

### 6.3 Domain Connection

```bash
# Add custom domain
vercel domains add ashique.digital

# Check domain status
vercel domains inspect ashique.digital
```

---

## 7. Git Workflow

```bash
# Create a new feature branch
git checkout -b feature/homepage-hero

# Stage and commit
git add .
git commit -m "feat(homepage): add hero section with dual CTAs"

# Push and create PR
git push origin feature/homepage-hero

# Merge and deploy (via GitHub PR → Vercel auto-deploy)
```

### Commit Convention

```
feat(scope): short description     → New feature
fix(scope): short description      → Bug fix
style(scope): short description    → CSS/UI changes
refactor(scope): short description → Code refactoring
docs(scope): short description     → Documentation
chore(scope): short description    → Dependencies, config
```

---

## 8. Code Quality

```bash
# Run ESLint
npm run lint

# Run ESLint and auto-fix
npm run lint -- --fix

# Run TypeScript type check
npx tsc --noEmit

# Format with Prettier
npx prettier --write .
```

---

## 9. Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run Playwright E2E tests
npx playwright test

# Run Playwright with UI
npx playwright test --ui

# Run single Playwright test file
npx playwright test tests/contact-form.spec.ts
```

---

## 10. Performance Audit

```bash
# Run Lighthouse via CLI
npx lighthouse https://ashique.digital --output html --output-path ./lighthouse-report.html

# Run Lighthouse on localhost
npx lighthouse http://localhost:3000 --output html

# Check bundle size
npm run build && npx bundlewatch
```

---

## 11. Useful One-Liners

```bash
# Clear Next.js cache
rm -rf .next

# Check for unused dependencies
npx depcheck

# Check for security vulnerabilities
npm audit
npx better-npm-audit audit

# Find all TODO comments in codebase
grep -r "TODO\|FIXME\|HACK" --include="*.ts" --include="*.tsx" .

# Check which Next.js version is installed
npx next --version

# Generate sitemap (after build)
npx next-sitemap

# Check environment variables are set
node -e "console.log(Object.keys(process.env).filter(k => k.includes('SANITY') || k.includes('RESEND')))"
```

---

## 12. Environment Setup Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] `.env.local` created with all required variables
- [ ] Sanity project created and `NEXT_PUBLIC_SANITY_PROJECT_ID` set
- [ ] Resend account created and `RESEND_API_KEY` set
- [ ] Gemini API key obtained from Google AI Studio
- [ ] Pinecone account created, index created as `ashique-knowledge`
- [ ] Cal.com account set up at `cal.com/ashique/strategy`
- [ ] GitHub repository created and code pushed
- [ ] Vercel project connected to GitHub repo
