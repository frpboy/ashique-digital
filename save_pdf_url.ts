
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function main() {
  const query = `*[_type == "settings"][0]{ "url": auditPdf.asset->url }`;
  const result = await client.fetch(query);
  fs.writeFileSync('pdf_url.txt', result?.url || 'NOT_FOUND');
}

main();
