# External profile snapshots

This folder holds verbatim snapshots of Aaryan's profiles on third-party sites
(Purdue AAE Ambassador page, LinkedIn, etc.). They exist so that Mach — the
chatbot on this site — can keep answering questions about that content even
if the original page is rotated, taken down, or behind auth.

## Conventions

- One file per source: `aae-ambassador.md`, `linkedin.md`, etc.
- Each file starts with frontmatter containing the source URL and a snapshot
  date (`YYYY-MM-DD`).
- Content is kept verbatim. Don't paraphrase — Mach's persona rule is to
  prefer Aaryan's exact words when available.
- After updating any file here, mirror the relevant content into
  `src/data/about-aaryan.ts` (under the matching section). The bot reads from
  that single TS file at runtime; these markdown files are the human-facing
  source of truth.

## When to refresh

- Ambassador page: when Aaryan rotates out of the Ambassador cohort or the
  page content meaningfully changes.
- LinkedIn: any time the profile gets a substantive update (new role,
  significant award).
- Other sources: whenever Aaryan is featured somewhere new that he wants the
  chatbot to know about.
