import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// General intake rate limiter: allows 3 requests per 10 minutes (for contact, audit, and newsletter forms)
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// AI Assistant rate limiter: allows 20 messages per minute per IP to prevent DoS, quota exhaustion, and billing abuse
export const agentRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit:agent",
});
