import { expertiseRecordSchema, type ExpertiseRecord } from '../data/expertise/schema';
import { rawExpertiseRecords } from '../data/expertise';
import { cadProjects } from '../data/cad-projects';

// Build-time loader and single import point for expertise data. Everything
// here throws on bad data so the build fails loudly with the file and field.

function fail(message: string): never {
  throw new Error(`[expertise] ${message}`);
}

const parsed: ExpertiseRecord[] = rawExpertiseRecords.map(({ file, raw }) => {
  const result = expertiseRecordSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join('.') || '(record)'}: ${i.message}`)
      .join('; ');
    fail(`Invalid expertise record ${file}: ${issues}`);
  }
  if (file !== `${result.data.slug}.json`) {
    fail(`Record file ${file} must be named after its slug (${result.data.slug}.json)`);
  }
  return result.data;
});

// Set-level integrity checks.
const slugs = new Set(parsed.map((r) => r.slug));
if (slugs.size !== parsed.length) fail('duplicate slugs across records');
for (const field of ['title', 'metaDescription'] as const) {
  const values = parsed.map((r) => r[field]);
  if (new Set(values).size !== values.length) fail(`duplicate ${field} across records`);
}

// Internal links must point at routes that actually exist.
const knownBasePaths = new Set<string>([
  '/',
  '/academia',
  '/timeline',
  '/research/rethi',
  '/research/zucrow',
  '/activities/purdue-aircraft-teams',
  '/activities/purdue-space-program',
  '/expertise',
  ...cadProjects.map((p) => `/project/${p.slug}`),
  ...parsed.map((r) => `/expertise/${r.slug}`),
]);

function assertKnownPath(path: string, where: string) {
  const base = path.split('#')[0] || '/';
  if (!knownBasePaths.has(base)) {
    fail(`${where} links to unknown route "${path}"`);
  }
}

for (const rec of parsed) {
  for (const related of rec.relatedSlugs) {
    if (!slugs.has(related)) {
      fail(`${rec.slug}: relatedSlugs entry "${related}" does not resolve to a record`);
    }
  }
  rec.evidence.forEach((e, i) =>
    assertKnownPath(e.sourceUrl, `${rec.slug}: evidence[${i}].sourceUrl`)
  );
  rec.projects.forEach((p, i) => {
    if (p.href) assertKnownPath(p.href, `${rec.slug}: projects[${i}].href`);
  });
}

export function getAllExpertise(): ExpertiseRecord[] {
  return parsed;
}

export function getExpertiseBySlug(slug: string): ExpertiseRecord | undefined {
  return parsed.find((r) => r.slug === slug);
}
