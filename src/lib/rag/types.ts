export interface SourceDoc {
  id: string;
  source: string;
  title: string;
  text: string;
}

export interface Chunk {
  id: string;
  source: string;
  title: string;
  text: string;
}

export interface IndexedChunk extends Chunk {
  embedding: number[];
}

export interface RagIndex {
  model: string;
  dim: number;
  builtAt: string;
  chunks: IndexedChunk[];
}
