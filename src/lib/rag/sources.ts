import path from 'node:path';
import fs from 'node:fs/promises';
import { factSections } from '../../data/about-aaryan';
import { hackathons } from '../../data/hackathons';
import type { SourceDoc } from './types';

const projectRoot = path.resolve(__dirname, '..', '..', '..');

function factSectionsAsSources(): SourceDoc[] {
  return factSections.map((s) => ({
    id: `about:${s.id}`,
    source: `about-aaryan.ts#${s.id}`,
    title: s.title,
    text: s.text,
  }));
}

function hackathonsAsSources(): SourceDoc[] {
  return hackathons.map((h) => {
    const lines = [
      `Hackathon: ${h.name} (${h.date}${h.location ? `, ${h.location}` : ''}).`,
      `Project: "${h.project}" — ${h.role}.`,
      h.description,
      h.achievement ? `Result: ${h.achievement}.` : '',
      `Tech stack: ${h.technologies.join(', ')}.`,
      h.href ? `Link: ${h.href}` : '',
    ].filter(Boolean);
    return {
      id: `hackathon:${h.id}`,
      source: `hackathons.ts#${h.id}`,
      title: `Hackathon — ${h.name}`,
      text: lines.join('\n'),
    };
  });
}

const PDFS_TO_INDEX: { file: string; title: string }[] = [
  { file: 'Aaryan_Lath-Resume.pdf', title: 'Resume' },
  { file: 'Aaryan_Lath-Transcript.pdf', title: 'Transcript' },
  { file: 'Aaryan-Lath_Portfolio.pdf', title: 'Portfolio' },
];

async function pdfsAsSources(): Promise<SourceDoc[]> {
  const { PDFParse } = await import('pdf-parse');

  const out: SourceDoc[] = [];
  for (const entry of PDFS_TO_INDEX) {
    const filePath = path.join(projectRoot, 'public', entry.file);
    try {
      const buf = await fs.readFile(filePath);
      const parser = new PDFParse({ data: new Uint8Array(buf) });
      const result = await parser.getText();
      const text = (result.text ?? '').replace(/\n{3,}/g, '\n\n').trim();
      if (text.length > 0) {
        out.push({
          id: `pdf:${entry.file}`,
          source: `public/${entry.file}`,
          title: entry.title,
          text,
        });
      }
    } catch (err) {
      console.warn(`[sources] skipping ${entry.file}: ${(err as Error).message}`);
    }
  }
  return out;
}

const PAGES_TO_INDEX: { file: string; title: string }[] = [
  { file: 'src/app/research/zucrow/page.tsx', title: 'Research — Zucrow Labs' },
  { file: 'src/app/research/rethi/page.tsx', title: 'Research — RETHi' },
  { file: 'src/app/activities/purdue-aircraft-teams/page.tsx', title: 'Activity — Purdue Aircraft Teams' },
  { file: 'src/app/activities/purdue-space-program/page.tsx', title: 'Activity — Purdue Space Program' },
  { file: 'src/app/academia/page.tsx', title: 'Academia — coursework & highlights' },
  { file: 'src/app/timeline/page.tsx', title: 'Awards & Achievements timeline' },
];

function extractJsxText(source: string): string {
  let s = source;
  s = s.replace(/\/\*[\s\S]*?\*\//g, ' ');
  s = s.replace(/\/\/[^\n]*/g, ' ');
  s = s.replace(/^\s*import[^;]*;?$/gm, ' ');
  s = s.replace(/^\s*export\s+(default\s+)?(function|const|interface|type)[\s\S]*?\{/m, ' ');
  s = s.replace(/className=(["'])[\s\S]*?\1/g, ' ');
  s = s.replace(/(href|src|alt|style|onClick|onMouseEnter|onMouseLeave|key|id|target|rel|aria-[a-z-]+)=(["'])[\s\S]*?\2/g, ' ');
  s = s.replace(/(href|src|alt|style|onClick|onMouseEnter|onMouseLeave|key|id|target|rel|aria-[a-z-]+)=\{[^}]*\}/g, ' ');
  s = s.replace(/<[A-Za-z][^>]*\/>/g, ' ');
  s = s.replace(/<\/?[A-Za-z][^>]*>/g, ' ');
  s = s.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
  const stringLiterals = (s.match(/(?:"[^"]{4,}"|'[^']{4,}'|`[^`]{4,}`)/g) ?? [])
    .map((q) => q.slice(1, -1))
    .filter((t) => /[a-zA-Z]/.test(t) && !/^[a-z-]+(\s[a-z-]+)*$/.test(t.trim()));
  const jsxText = s
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/[{};=]/g, ' ')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 3 && /[a-zA-Z]/.test(l));
  return [...stringLiterals, ...jsxText].join('\n').replace(/\s+/g, ' ').replace(/\n+/g, '\n').trim();
}

async function pagesAsSources(): Promise<SourceDoc[]> {
  const out: SourceDoc[] = [];
  for (const entry of PAGES_TO_INDEX) {
    const filePath = path.join(projectRoot, entry.file);
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const text = extractJsxText(raw);
      if (text.length > 100) {
        out.push({
          id: `page:${entry.file}`,
          source: entry.file,
          title: entry.title,
          text,
        });
      }
    } catch (err) {
      console.warn(`[sources] skipping ${entry.file}: ${(err as Error).message}`);
    }
  }
  return out;
}

export async function loadAllSources(): Promise<SourceDoc[]> {
  const [pdfs, pages] = await Promise.all([pdfsAsSources(), pagesAsSources()]);
  return [
    ...factSectionsAsSources(),
    ...hackathonsAsSources(),
    ...pdfs,
    ...pages,
  ];
}
