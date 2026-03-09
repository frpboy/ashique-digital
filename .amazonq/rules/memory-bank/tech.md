# Technology Stack

## Core Technologies

### Framework & Runtime
- **Next.js**: 16.1.6 (App Router, React Server Components, Server Actions)
- **React**: 19.2.3 (Latest with new hooks: use, useOptimistic, useFormStatus)
- **TypeScript**: ^5 (Strict mode enabled)
- **Node.js**: Compatible with Next.js 16 requirements

### Styling & UI
- **Tailwind CSS**: ^4 (Utility-first CSS framework)
- **PostCSS**: ^4 (@tailwindcss/postcss)
- **Framer Motion**: ^12.35.2 (Animation library)
- **Lucide React**: ^0.577.0 (Icon library)

### Content Management
- **Sanity.io**: ^5.13.0 (Headless CMS)
- **@sanity/client**: ^7.16.0 (Sanity API client)
- **@sanity/image-url**: ^2.0.3 (Image URL builder)
- **next-sanity**: ^12.1.1 (Next.js integration)

### AI & Vector Database
- **@google/generative-ai**: ^0.24.1 (Gemini 1.5 Flash integration)
- **@pinecone-database/pinecone**: ^7.1.0 (Vector database for RAG)

### Forms & Validation
- **react-hook-form**: ^7.71.2 (Form state management)
- **@hookform/resolvers**: ^5.2.2 (Validation resolvers)
- **zod**: ^4.3.6 (Schema validation)

### Email & Communication
- **resend**: ^6.9.3 (Transactional email service)

### Rate Limiting & Caching
- **@upstash/ratelimit**: ^2.0.8 (Rate limiting)
- **@upstash/redis**: ^1.36.4 (Serverless Redis)

### SEO & Optimization
- **next-sitemap**: ^4.2.3 (Sitemap generation)

### Development Tools
- **ESLint**: ^9 (Code linting)
- **eslint-config-next**: 16.1.6 (Next.js ESLint config)
- **babel-plugin-react-compiler**: 1.0.0 (React Compiler)

## TypeScript Configuration

### Compiler Options
- **Target**: ES2017
- **Module**: ESNext with bundler resolution
- **JSX**: react-jsx (React 19 transform)
- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` maps to project root

### Included Files
- All `.ts`, `.tsx`, `.mts` files
- Next.js type definitions
- Generated types from `.next/types/`

## Development Commands

### Local Development
```bash
npm run dev          # Start development server on localhost:3000
```

### Production Build
```bash
npm run build        # Create optimized production build
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint on codebase
```

## Environment Variables

### Required Variables (`.env.local`)
```
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# AI Integration
GOOGLE_GENERATIVE_AI_API_KEY=
PINECONE_API_KEY=
PINECONE_INDEX_NAME=

# Email Service
RESEND_API_KEY=

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Cal.com (optional)
NEXT_PUBLIC_CAL_LINK=
```

## Build System

### Next.js Configuration
- **TypeScript**: Enabled with strict type checking
- **ESLint**: Integrated with Next.js rules
- **Turbopack**: Available for faster dev builds (Next.js 16)
- **React Compiler**: Enabled via Babel plugin

### Deployment Target
- **Platform**: Vercel (Hobby/Free Tier)
- **Region**: Auto-selected based on user location
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: Auto-detected from package.json

## Performance Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Score**: ≥ 90 on all pages

### Optimization Features
- Automatic image optimization (Next.js Image)
- Font optimization (next/font with Geist)
- Code splitting and lazy loading
- Server Components for zero JS by default
- Edge runtime for API routes where applicable

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Minimum viewport: 375px width
- Maximum tested: 1440px width

## API Integrations

### External Services
- **Sanity.io**: Content delivery via GROQ queries
- **Google Gemini**: AI chat responses
- **Pinecone**: Vector search for RAG
- **Resend**: Email delivery
- **Upstash Redis**: Rate limiting and caching
- **Cal.com**: Meeting scheduling (embedded)

### Rate Limits
- API routes protected with Upstash rate limiting
- Configurable per-endpoint limits
- IP-based and token-based limiting strategies
