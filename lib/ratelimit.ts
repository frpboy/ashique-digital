import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// General intake rate limiter: allows 3 requests per 10 minutes
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// AI Assistant rate limiter: allows 20 requests per 1 minute to prevent denial-of-wallet and API quota abuse
export const agentRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit:agent",
});
