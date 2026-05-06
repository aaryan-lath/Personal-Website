import path from 'node:path';
import fs from 'node:fs/promises';
import { cosineSimilarity } from './embed';
import type { IndexedChunk, RagIndex } from './types';

let cachedIndex: RagIndex | null = null;
let loadPromise: Promise<RagIndex> | null = null;

const INDEX_PATH = path.join(process.cwd(), 'src', 'data', 'rag-index.json');

async function loadFromDisk(): Promise<RagIndex> {
  const raw = await fs.readFile(INDEX_PATH, 'utf8');
  const parsed = JSON.parse(raw) as RagIndex;
  if (!parsed.chunks || !Array.isArray(parsed.chunks)) {
    throw new Error('rag-index.json is malformed: missing chunks array');
  }
  return parsed;
}

export async function getIndex(): Promise<RagIndex> {
  if (cachedIndex) return cachedIndex;
  if (!loadPromise) {
    loadPromise = loadFromDisk().then((idx) => {
      cachedIndex = idx;
      return idx;
    });
  }
  return loadPromise;
}

export interface Retrieved {
  chunk: IndexedChunk;
  score: number;
}

export function retrieveTopK(
  index: RagIndex,
  queryEmbedding: number[],
  k: number
): Retrieved[] {
  const scored = index.chunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k);
}

export function formatRetrievedAsContext(retrieved: Retrieved[]): string {
  if (retrieved.length === 0) return '(no facts retrieved)';
  return retrieved
    .map((r) => {
      const score = r.score.toFixed(3);
      return `## ${r.chunk.title}  [source: ${r.chunk.source}, score: ${score}]\n${r.chunk.text}`;
    })
    .join('\n\n');
}
