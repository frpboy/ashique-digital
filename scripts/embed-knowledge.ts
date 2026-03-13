import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX || "ashique-knowledge";
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const EMBEDDING_MODEL = process.env.NEXT_PUBLIC_GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";

if (!PINECONE_API_KEY || !GOOGLE_API_KEY) {
  console.error("❌ Missing environment variables. Check .env.local");
  process.exit(1);
}

const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });

async function embedKnowledge() {
  console.log("🚀 Starting Knowledge Base Injection...");

  // 1. Detect Dimension FIRST
  console.log(`📡 Detecting dimension for ${EMBEDDING_MODEL}...`);
  const testEmbedding = await model.embedContent("test");
  const dimension = testEmbedding.embedding.values.length;
  console.log(`📊 Detected Embedding Dimension: ${dimension}`);

  // 2. Ensure Index Exists with Correct Dimension
  const indexList = await pc.listIndexes();
  const existingIndex = indexList.indexes?.find((idx) => idx.name === PINECONE_INDEX);

  if (existingIndex) {
      if (existingIndex.dimension !== dimension) {
          console.log(`⚠️ Index exists with dimension ${existingIndex.dimension}. Expecting ${dimension}. Recreating...`);
          await pc.deleteIndex(PINECONE_INDEX);
          // Wait for deletion to complete
          let isDeleted = false;
          while (!isDeleted) {
              const list = await pc.listIndexes();
              if (!list.indexes?.some(i => i.name === PINECONE_INDEX)) {
                  isDeleted = true;
              } else {
                  console.log("...waiting for deletion...");
                  await new Promise(r => setTimeout(r, 5000));
              }
          }
      }
  }

  // Double check if we need to create
  const finalCheck = await pc.listIndexes();
  if (!finalCheck.indexes?.some(i => i.name === PINECONE_INDEX)) {
      console.log(`📡 Creating index ${PINECONE_INDEX} with dimension ${dimension}...`);
      await pc.createIndex({
        name: PINECONE_INDEX,
        dimension,
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      });
      console.log("⏳ Waiting for index to initialize...");
      // Poll for readiness instead of static sleep
      let isReady = false;
      while (!isReady) {
          const status = await pc.describeIndex(PINECONE_INDEX);
          if (status.status.ready) {
              isReady = true;
          } else {
              console.log(`...status: ${status.status.state}...`);
              await new Promise(r => setTimeout(r, 5000));
          }
      }
      console.log("✅ Index is ready.");
  }

  const index = pc.Index(PINECONE_INDEX);
  const knowledgeDir = path.join(process.cwd(), "knowledge");
  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(knowledgeDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // Split by headings
    const chunks = content
      .split(/\n(?=#{2,3}\s)/)
      .map((c) => c.trim())
      .filter((c) => c.length > 20);

    console.log(`Processing ${file}: Found ${chunks.length} chunks.`);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      try {
        process.stdout.write(`  - Embedding chunk ${i + 1}/${chunks.length}...\r`);
        const result = await model.embedContent(chunk);
        const embedding = result.embedding.values;

        const id = `${file}-${i}`;
        await index.upsert({
          records: [
            {
              id,
              values: embedding,
              metadata: {
                text: chunk,
                source: file,
              },
            },
          ],
        });
      } catch (err) {
        console.error(`\n  ❌ Error embedding chunk ${i}:`, err);
      }
    }
    console.log(`\n✅ Finished ${file}`);
  }

  console.log("🏁 Knowledge Base successfully indexed in Pinecone.");
}

embedKnowledge().catch(console.error);
