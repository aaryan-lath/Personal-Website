/* Build-time RAG indexer.
 *
 * Reads sources (curated facts, hackathons, page text, PDFs), chunks them,
 * embeds each chunk via Gemini text-embedding-004, and writes the resulting
 * vectors to src/data/rag-index.json.
 *
 * Run with: npm run build:index
 * Required env: GEMINI_API_KEY
 */

import path from 'node:path';
import fs from 'node:fs/promises';
import { GoogleGenAI } from '@google/genai';
import { chunkAllDocs } from '../src/lib/rag/chunker';
import { embedTexts, EMBED_DIM, EMBED_MODEL } from '../src/lib/rag/embed';
import { loadAllSources } from '../src/lib/rag/sources';
import type { IndexedChunk, RagIndex } from '../src/lib/rag/types';

const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'rag-index.json');

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[build-index] GEMINI_API_KEY is not set. Aborting.');
    process.exit(1);
  }

  console.log('[build-index] Loading sources…');
  const docs = await loadAllSources();
  console.log(`[build-index] Loaded ${docs.length} source documents.`);

  console.log('[build-index] Chunking…');
  const chunks = chunkAllDocs(docs);
  console.log(`[build-index] Produced ${chunks.length} chunks.`);

  if (chunks.length === 0) {
    console.error('[build-index] No chunks to embed. Aborting.');
    process.exit(1);
  }

  console.log(`[build-index] Embedding with ${EMBED_MODEL}…`);
  const ai = new GoogleGenAI({ apiKey });
  const start = Date.now();
  const embeddings = await embedTexts(
    ai,
    chunks.map((c) => `# ${c.title}\n\n${c.text}`)
  );
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`[build-index] Embedded ${embeddings.length} chunks in ${elapsed}s.`);

  if (embeddings.length !== chunks.length) {
    console.error(
      `[build-index] Embedding count mismatch: ${embeddings.length} embeddings for ${chunks.length} chunks. Aborting.`
    );
    process.exit(1);
  }

  const indexedChunks: IndexedChunk[] = chunks.map((c, i) => ({
    ...c,
    embedding: embeddings[i],
  }));

  const index: RagIndex = {
    model: EMBED_MODEL,
    dim: EMBED_DIM,
    builtAt: new Date().toISOString(),
    chunks: indexedChunks,
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(index));

  const sizeKB = ((await fs.stat(OUTPUT_PATH)).size / 1024).toFixed(1);
  console.log(`[build-index] Wrote ${OUTPUT_PATH} (${sizeKB} KB).`);
  console.log('[build-index] Source breakdown:');
  const bySource = new Map<string, number>();
  for (const c of chunks) {
    const key = c.source.split('#')[0];
    bySource.set(key, (bySource.get(key) ?? 0) + 1);
  }
  for (const [source, count] of [...bySource.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${count.toString().padStart(3)} chunks  ${source}`);
  }
}

main().catch((err) => {
  console.error('[build-index] Failed:', err);
  process.exit(1);
});
