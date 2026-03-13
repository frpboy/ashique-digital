import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2024-01-01",
});

async function seed() {
  console.log("🌱 Seeding Sanity with real content...");

  // 1. Case Studies
  const caseStudies = [
    {
      _id: "case-study-d2c-fashion",
      _type: "caseStudy",
      title: "3.2x ROAS in 60 Days: D2C Fashion Scaling",
      slug: { _type: "slug", current: "d2c-fashion-roas-scaling" },
      clientIndustry: "E-commerce",
      problem: "The client was stuck at 1.1x ROAS with high customer acquisition costs and zero funnel strategy.",
      featured: true,
      publishedAt: new Date().toISOString(),
      metrics: [
        { label: "ROAS", value: "3.2x" },
        { label: "Revenue Delta", value: "+₹4.2L/mo" },
        { label: "Lead Increase", value: "+220%" }
      ],
      clientName: "Founder, Premium Ethnic Wear Brand",
    },
    {
      _id: "case-study-b2b-saas",
      _type: "caseStudy",
      title: "B2B Lead Gen: 80 High-Quality demo requests/mo",
      slug: { _type: "slug", current: "b2b-high-quality-leads" },
      clientIndustry: "SaaS",
      problem: "A SaaS company failing to convert LinkedIn traffic into actual sales discovery calls.",
      featured: true,
      publishedAt: new Date().toISOString(),
      metrics: [
        { label: "Monthly Leads", value: "80+" },
        { label: "CPL Drop", value: "45%" },
        { label: "Qualified Leads", value: "+310%" }
      ],
      clientName: "Growth Lead, FinTech SaaS",
    },
    {
      _id: "case-study-edtech",
      _type: "caseStudy",
      title: "Education Startup: Scaling from 12 to 80 student inquiries",
      slug: { _type: "slug", current: "edtech-student-inquiries" },
      clientIndustry: "EdTech",
      problem: "Extreme ad budget leakage and poor landing page experience causing high drop-off rates.",
      featured: true,
      publishedAt: new Date().toISOString(),
      metrics: [
        { label: "CPL", value: "₹180 (from ₹620)" },
        { label: "Scaling", value: "6.5x" },
        { label: "ROI", value: "4.8x" }
      ],
      clientName: "Head of Marketing, JEE/NEET Coaching Startup",
    },
  ];

  for (const doc of caseStudies) {
    console.log(`  - Creating Case Study: ${doc.title}`);
    await client.createOrReplace(doc);
  }

  // 2. Blog Post
  const blogPost = {
    _id: "post-indian-sme-2026",
    _type: "post",
    title: "The 2026 Growth System: Why Most Indian SMEs Waste Their Ad Budget",
    slug: { _type: "slug", current: "indian-sme-ad-waste-2026" },
    excerpt: "Discover the 3 invisible leaks draining your marketing budget and how to engineer a system that guarantees lead quality.",
    publishedAt: new Date().toISOString(),
    tags: ["Strategy", "Indian SMEs", "Growth"],
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "The era of 'spray and pray' marketing is over. Indian SMEs are unique, and so are their growth bottlenecks..." }],
        markDefs: [],
        style: "normal",
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "1. The Funnel Gap" }],
        markDefs: [],
        style: "h2",
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "Most businesses drive traffic to homepages. This is where your budget goes to die..." }],
        markDefs: [],
        style: "normal",
      }
    ],
  };

  console.log(`  - Creating Blog Post: ${blogPost.title}`);
  await client.createOrReplace(blogPost);

  console.log("✅ Sanity Seeding Complete.");
}

seed().catch(console.error);
