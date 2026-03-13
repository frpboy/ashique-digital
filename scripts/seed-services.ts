import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-03-12",
});

const services = [
  {
    _id: "service-1",
    _type: "service",
    title: "Brand Strategy",
    slug: { _type: "slug", current: "brand-strategy" },
    outcome: "Define how you want to be known.",
    description: "We move you from a commodity to a category of one. By defining your unique value proposition and messaging framework, we ensure you attract the right clients at the right price point.",
    deliverables: ["Brand Positioning", "Messaging Guide", "ICP Definition", "Competitor Audit"],
    icon: "fingerprint",
    order: 1,
    featured: true
  },
  {
    _id: "service-2",
    _type: "service",
    title: "Digital Marketing Strategy",
    slug: { _type: "slug", current: "digital-marketing-strategy" },
    outcome: "Turn channels into a cohesive growth plan.",
    description: "Stop random acts of marketing. We build an integrated roadmap that connects your social, search, and content efforts into a single, high-performing engine.",
    deliverables: ["12-Month Roadmap", "Multi-Channel Plan", "Budget Allocation", "KPI Dashboard"],
    icon: "compass",
    order: 2,
    featured: true
  },
  {
    _id: "service-3",
    _type: "service",
    title: "Lead Generation Systems",
    slug: { _type: "slug", current: "lead-generation-systems" },
    outcome: "Build pipelines that never run dry.",
    description: "We engineer automated systems that identify, attract, and capture qualified leads 24/7. No more relying on manual outreach or word-of-mouth.",
    deliverables: ["Lead Magnet Creation", "Automated Outreach", "LinkedIn Strategy", "CRM Setup"],
    icon: "layers",
    order: 3,
    featured: true
  },
  {
    _id: "service-4",
    _type: "service",
    title: "Funnel Design",
    slug: { _type: "slug", current: "funnel-design" },
    outcome: "Convert visitors into paying customers.",
    description: "Traffic is a cost; conversion is an investment. We design high-converting landing pages and nurture sequences that guide strangers toward a booked call.",
    deliverables: ["Landing Page Architecture", "Email Nurture Flow", "CRO Audit", "Sales Scripting"],
    icon: "filter",
    order: 4,
    featured: true
  },
  {
    _id: "service-5",
    _type: "service",
    title: "Paid Ads Strategy",
    slug: { _type: "slug", current: "paid-ads-strategy" },
    outcome: "Make every rupee of ad spend count.",
    description: "We optimize your Meta and Google Ads for ROI, not just clicks. Using precise targeting and creative testing, we find your most profitable customers.",
    deliverables: ["Ad Creative Strategy", "Audience Research", "Pixel/API Setup", "Weekly Optimization"],
    icon: "zap",
    order: 5,
    featured: true
  },
  {
    _id: "service-6",
    _type: "service",
    title: "Growth Consulting",
    slug: { _type: "slug", current: "growth-consulting" },
    outcome: "Scale with a clear, data-backed roadmap.",
    description: "For businesses ready to hit the next level. We act as your fractional growth partner, analyzing data and optimizing every lever of your acquisition system.",
    deliverables: ["Revenue Modeling", "Retention Strategy", "Scaling Plan", "Executive Advisory"],
    icon: "trending-up",
    order: 6,
    featured: true
  }
];

async function seed() {
  console.log("🚀 Starting services seeding...");
  try {
    for (const service of services) {
      await client.createOrReplace(service);
      console.log(`✅ Seeded: ${service.title}`);
    }
    console.log("✨ All services seeded successfully!");
  } catch (err: any) {
    console.error("❌ Seeding failed:", JSON.stringify(err, null, 2));
    console.log("\nTIP: If you see 'permission create required', ensure your SANITY_API_TOKEN in .env.local has 'Editor' or 'Administrator' permissions.");
  }
}

seed();
