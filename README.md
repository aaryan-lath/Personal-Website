The server is live on aaryanlath.com


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To change the words on the site, edit the content files described in [EDITING.md](EDITING.md) — the home page reads its text from `src/content/home.ts`. Layout and section order live in `src/app/page.tsx`. The page auto-updates as you edit.

## Mach (AI chat widget)

"Mach 0.96" is the floating chat widget on every page; it calls `/api/chat`, which routes through a **provider fallback chain**: Gemini models in order, then Groq as a safety net. Each Gemini model has its own free-tier daily bucket, so the chain extends usable headroom from one model's 20/day to ~100+/day across the chain plus Groq's much larger quota.

### Required env

- `GEMINI_API_KEY` — free from <https://aistudio.google.com/apikey> (no credit card). Primary provider.

### Recommended env

- `GROQ_API_KEY` — free from <https://console.groq.com> (no credit card). Final fallback when all Gemini models exhaust. Daily quotas are significantly higher than Gemini free tier.

### Optional env (persistent exhaustion tracking)

For production, exhausted-model state should survive across Vercel cold starts and across Lambda instances. Enable **Upstash Redis** from the Vercel Marketplace (Storage → Marketplace → Upstash Redis). Vercel will inject:

- `KV_REST_API_URL` (or `UPSTASH_REDIS_REST_URL`)
- `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_TOKEN`)

If these are absent, the route falls back to a per-Lambda in-memory cache — still functional, just less efficient (each new instance pays one 429 to rediscover an exhausted model).

### Local setup

Create `.env.local` in the project root:
```
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here    # optional but recommended
```

Then `npm run dev`. The chatbot's knowledge of Aaryan lives in `src/data/about-aaryan.ts` — edit it whenever content changes; no rebuild needed. Per-IP rate limiting (10 requests / hour, in-memory) lives in `src/lib/rate-limit.ts`. Provider chain definition lives in `src/lib/providers/registry.ts`.

The response includes an `x-mach-provider` header so you can see which model actually served a given request (useful for debugging).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
