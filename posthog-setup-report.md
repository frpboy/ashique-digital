<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into ashique.digital. PostHog is now initialized client-side via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to improve reliability and bypass ad blockers. A server-side PostHog client (`lib/posthog-server.ts`) captures critical business events from API routes. User identification is performed on both the client and server at key conversion moments (contact form, free audit, newsletter signup).

| Event Name | Description | File |
|---|---|---|
| `hero_cta_clicked` | User clicks a CTA button in the Hero section (Book Strategy Call or See My Work) | `components/sections/Hero.tsx` |
| `ai_widget_opened` | User opens the AI assistant widget | `components/AIWidget/AIOrb.tsx` |
| `ai_message_sent` | User sends a message to Ashique's AI assistant | `components/AIWidget/AIOrb.tsx` |
| `newsletter_subscribed` | User successfully subscribes to the weekly growth newsletter | `components/shared/Footer.tsx` |
| `contact_form_submitted` | User successfully submits the contact form | `app/(site)/contact/page.tsx` |
| `free_audit_submitted` | User submits the free 15-point lead generation audit form | `app/(site)/free-audit/page.tsx` |
| `contact_form_received` | Server-side: contact form validated and processed | `app/api/contact/route.ts` |
| `newsletter_signup_received` | Server-side: newsletter signup validated and processed | `app/api/newsletter/route.ts` |
| `ai_agent_invoked` | Server-side: AI agent received and streamed a response | `app/api/agent/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/337067/dashboard/1345704
- **Lead Generation Conversions** (trend): https://us.posthog.com/project/337067/insights/KjfqSdOP
- **Hero to Lead Conversion Funnel**: https://us.posthog.com/project/337067/insights/Zdq0NqCZ
- **AI Widget Engagement** (trend): https://us.posthog.com/project/337067/insights/DbrE2Ujc
- **Hero CTA Breakdown** (pie): https://us.posthog.com/project/337067/insights/nTp6L0Mw
- **Free Audit to Contact Funnel**: https://us.posthog.com/project/337067/insights/5Kwy3lEw

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
