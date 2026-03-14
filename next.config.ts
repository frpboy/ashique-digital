import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.posthog.com https://*.cal.com https://vercel.live https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://cdn.sanity.io https://*.posthog.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.sanity.io https://*.posthog.com https://*.google-analytics.com https://vitals.vercel-insights.com https://unpkg.com https://cdn.jsdelivr.net https://*.lottiefiles.com; frame-src https://*.cal.com https://vercel.live; worker-src 'self' blob:; child-src blob:;",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/growth-audit.pdf",
        destination: "https://cdn.sanity.io/files/htusynl3/production/6264e6e2a46e34574925916f5f07138a108c118a.pdf",
      },
      {
        source: "/lead-gen-audit.pdf",
        destination: "/lead-gen-audit.pdf", // legacy support or public fallback
      },
    ];
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
