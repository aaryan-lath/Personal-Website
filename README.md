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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Mach (AI chat widget)

"Mach" is the floating chat widget on every page; it calls `/api/chat`, which uses the Google Gemini API.

1. Get a free API key from <https://aistudio.google.com/apikey> (no credit card required).
2. Locally, create `.env.local` in the project root with:
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. On Vercel, add the same `GEMINI_API_KEY` env var to the Production and Preview environments.

The chatbot's knowledge of Aaryan lives in `src/data/about-aaryan.ts` — edit that file whenever the home page content changes (or to add new personal details). Per-IP rate limiting (10 requests / hour, in-memory) lives in `src/lib/rate-limit.ts`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
