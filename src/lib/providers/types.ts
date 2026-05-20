export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GenerateRequest {
  systemInstruction: string;
  messages: ChatMessage[];
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GenerateChunk {
  text?: string;
  safetyBlocked?: boolean;
  blockReason?: string;
}

export interface Provider {
  name: string;
  vendor: 'gemini' | 'groq';
  generate(req: GenerateRequest): AsyncIterable<GenerateChunk>;
}

export class QuotaExhaustedError extends Error {
  constructor(
    public provider: string,
    public retryAfterMs: number,
    public scope: 'minute' | 'day' | 'unknown',
    cause?: unknown
  ) {
    super(`Quota exhausted for ${provider} (scope: ${scope}, retry in ${Math.round(retryAfterMs / 1000)}s)`);
    this.name = 'QuotaExhaustedError';
    this.cause = cause;
  }
}

export class OverloadedError extends Error {
  constructor(public provider: string, cause?: unknown) {
    super(`${provider} is overloaded`);
    this.name = 'OverloadedError';
    this.cause = cause;
  }
}
