import { PostHog } from "posthog-node";

// Creates a fresh PostHog client per invocation.
// Next.js API routes are short-lived; we set flushAt=1 and flushInterval=0
// so events are flushed immediately, and call shutdown() to ensure delivery.
export function getPostHogClient(): PostHog {
  return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: "https://us.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
}
