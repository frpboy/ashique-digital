import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const embeddingModel = genAI.getGenerativeModel({
  model: process.env.NEXT_PUBLIC_GEMINI_EMBEDDING_MODEL || "text-embedding-004",
});

export async function searchKnowledge(query: string, limit = 3) {
  try {
    const index = pc.Index(process.env.PINECONE_INDEX || "ashique-knowledge");

    // 1. Generate embedding for the query
    const result = await embeddingModel.embedContent(query);
    const embedding = result.embedding.values;

    // 2. Query Pinecone
    const queryResponse = await index.query({
      vector: embedding,
      topK: limit,
      includeMetadata: true,
    });

    // 3. Extract and join context
    const context = queryResponse.matches
      .map((match) => (match.metadata as any)?.text)
      .filter(Boolean)
      .join("\n\n---\n\n");

    return context;
  } catch (error) {
    console.error("[Pinecone Search Error]:", error);
    return "";
  }
}
