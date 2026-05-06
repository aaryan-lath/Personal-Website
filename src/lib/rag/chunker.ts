import type { SourceDoc, Chunk } from './types';

const TARGET_CHARS = 1500;
const OVERLAP_CHARS = 150;
const MIN_TAIL_CHARS = 200;

export function chunkDoc(doc: SourceDoc): Chunk[] {
  const text = doc.text.trim();
  if (text.length === 0) return [];

  if (text.length <= TARGET_CHARS) {
    return [{ id: doc.id, source: doc.source, title: doc.title, text }];
  }

  const chunks: Chunk[] = [];
  let start = 0;
  let n = 0;

  while (start < text.length) {
    const naiveEnd = Math.min(text.length, start + TARGET_CHARS);
    let end = naiveEnd;

    if (naiveEnd < text.length) {
      const window = text.slice(start, naiveEnd);
      const lastDoubleBreak = window.lastIndexOf('\n\n');
      const lastSentence = Math.max(window.lastIndexOf('. '), window.lastIndexOf('.\n'));
      const lastBreak = window.lastIndexOf('\n');
      const minCut = Math.floor(TARGET_CHARS * 0.5);
      const candidate = Math.max(lastDoubleBreak, lastSentence, lastBreak);
      if (candidate >= minCut) end = start + candidate + 1;
    }

    const piece = text.slice(start, end).trim();
    if (piece.length >= MIN_TAIL_CHARS || start === 0) {
      chunks.push({ id: `${doc.id}#${n}`, source: doc.source, title: doc.title, text: piece });
      n++;
    } else if (chunks.length > 0) {
      const last = chunks[chunks.length - 1];
      chunks[chunks.length - 1] = { ...last, text: `${last.text}\n\n${piece}`.trim() };
    }

    if (end >= text.length) break;
    start = Math.max(end - OVERLAP_CHARS, start + 1);
  }

  return chunks;
}

export function chunkAllDocs(docs: SourceDoc[]): Chunk[] {
  return docs.flatMap(chunkDoc);
}
