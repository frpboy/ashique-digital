
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function main() {
  try {
    const query = `*[_type == "settings"][0]{ "url": auditPdf.asset->url }`;
    const result = await client.fetch(query);
    console.log('PDF_URL:', result?.url);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
