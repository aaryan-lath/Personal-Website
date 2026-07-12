import { z } from 'zod';

// Schema for agent-generated expertise records. The docs mirror lives at
// docs/expertise-record.schema.json; this file is the enforcement gate.
// Records are validated at build time by src/lib/expertise.ts and any
// violation fails the build with the file and field path.

// Site-relative link: "/research/rethi", "/#internships", "/project/..."
const internalPath = z
  .string()
  .regex(/^\/[a-z0-9\-/]*(#[a-z0-9\-]+)?$/, 'site-relative path starting with /');

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'kebab-case slug');

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD');

export const evidenceItemSchema = z.object({
  // Where and when the work happened; names the org, course, or program.
  context: z.string().min(60).max(300),
  // The concrete work. Specific nouns, no invented numbers or dates.
  whatIDid: z.string().min(120).max(600),
  // Result or artifact. Numbers and placements only if a source states them.
  outcome: z.string().min(40).max(300),
  // Internal page where a visitor can verify or see more.
  sourceUrl: internalPath,
  sourceLabel: z.string().min(3).max(60),
  // Repo files that ground this claim. Powers the fact-check pass; not rendered.
  groundedIn: z.array(z.string().min(4)).min(1),
});

export const expertiseRecordSchema = z
  .object({
    slug,
    title: z.string().min(8).max(70), // page H1
    shortTitle: z.string().min(3).max(28), // breadcrumb + related-card label
    metaTitle: z.string().min(8).max(55).optional(), // <title> override
    metaDescription: z.string().min(70).max(160),
    hero: z.string().min(120).max(360), // intro paragraph under the H1
    tags: z.array(z.string().min(2).max(32)).min(3).max(6),
    evidence: z.array(evidenceItemSchema).min(3).max(6),
    courses: z
      .array(
        z.object({
          code: z.string().min(3).max(70), // "AAE 514: Intermediate Aerodynamics"
          note: z.string().min(20).max(280),
        })
      )
      .max(6)
      .default([]),
    projects: z
      .array(
        z.object({
          name: z.string().min(3).max(80),
          summary: z.string().min(30).max(300),
          href: internalPath.optional(),
        })
      )
      .max(5)
      .default([]),
    tools: z.array(z.string().min(2).max(40)).min(3).max(12),
    relatedSlugs: z.array(slug).min(1).max(4),
    knowsAbout: z.string().min(3).max(60), // merges into Person.knowsAbout
    sameAs: z.array(z.url()).max(3).default([]),
    lastReviewed: isoDate,
  })
  .superRefine((rec, ctx) => {
    // Thin-content guard: the rendered prose must clear ~300 words.
    const prose =
      rec.hero.length +
      rec.evidence.reduce(
        (n, e) => n + e.context.length + e.whatIDid.length + e.outcome.length,
        0
      ) +
      rec.courses.reduce((n, c) => n + c.note.length, 0) +
      rec.projects.reduce((n, p) => n + p.summary.length, 0);
    if (prose < 1800) {
      ctx.addIssue({
        code: 'custom',
        message: `record renders only ${prose} chars of prose; minimum is 1800 (thin-content guard)`,
      });
    }
    if (rec.relatedSlugs.includes(rec.slug)) {
      ctx.addIssue({ code: 'custom', message: 'relatedSlugs must not include self' });
    }
  });

export type ExpertiseRecord = z.infer<typeof expertiseRecordSchema>;
