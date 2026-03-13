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

const aiStrategistPost = {
  _type: "post",
  title: "Why I Built a 24/7 AI Strategist for My Website",
  slug: { _type: "slug", current: "why-i-built-ai-strategist" },
  excerpt: "In a world of static contact forms, I decided to build a 'Strategic Brain' that answers client questions in real-time. Here is the logic behind the Ashique Digital AI.",
  publishedAt: new Date().toISOString(),
  tags: ["AI", "CX", "Future of Search"],
  body: [
    {
      _key: "block1",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "The traditional agency website is a graveyard of dead information. You read a few case studies, look at a services list, and then—if you're patient enough—you fill out a contact form and wait 24 to 48 hours for a response. In the world of high-growth SMEs, that delay is a leak."
        }
      ]
    },
    {
      _key: "block2",
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "From Passive Info to Active Strategy" }]
    },
    {
      _key: "block3",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "I built the AI Strategist on this site because I wanted to weaponize my knowledge. It’s not just a chatbot; it’s a RAG-powered (Retrieval-Augmented Generation) system trained on my 15-Point Audit, my past case studies, and my specific growth methodology."
        }
      ]
    },
    {
      _key: "block4",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "The goal is simple: to provide diagnostic value before the first meeting. If a founder asks about 'Scaling problems' or 'High CAC,' the AI doesn't just give a generic answer. It reasons through the bottleneck and offers a relevant insight from my framework."
        }
      ]
    },
    {
      _key: "block5",
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "Efficiency as a Brand Value" }]
    },
    {
      _key: "block6",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Ultimately, I built this to respect your time. By the time we hop on a strategy call, the AI has already answered your basic questions, explained my process, and even recommended the Free Audit. This allows us to spend our 30 minutes on deep strategy rather than basic introductions."
        }
      ]
    },
    {
      _key: "block7",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Try it out. Ask the robot in the corner anything about my lead gen systems. It’s the closest thing to having me in the room, 24/7."
        }
      ]
    }
  ],
};

async function seed() {
  try {
    const result = await client.create(aiStrategistPost);
    console.log(`✅ AI Strategist post created: ${result._id}`);
  } catch (err: any) {
    console.error("❌ Seeding failed:", JSON.stringify(err, null, 2));
    console.log("\nTIP: If you see 'permission create required', please ensure your SANITY_API_TOKEN in .env.local has 'Editor' or 'Administrator' permissions.");
  }
}

seed();
