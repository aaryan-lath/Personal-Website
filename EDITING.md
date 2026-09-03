# Editing this site

Plain-language guide to changing the words on aaryanlath.com. You almost never
need to touch the layout code: most text lives in data files under `src/content/`
and `src/data/`.

## Where the words are

| To change… | Edit this file |
|---|---|
| Home page: hero, section titles, job cards, course cards, activity cards, contact | `src/content/home.ts` |
| Awards and achievements (home preview + `/timeline`) | `src/data/timeline.ts` |
| Personal projects (CryptiQ, LuftCar, hackathons) | `src/data/personal-projects.ts` |
| CAD project cards and their galleries | `src/data/cad-projects.ts` |
| Focus-area pages (`/focus-areas/...`) | `src/data/expertise/records/<slug>.json` |
| What the Mach 0.96 assistant knows about you | `src/data/about-aaryan.ts` |
| Name, job titles and links in search-engine data | `src/data/structured-data.ts` |
| Summary for AI crawlers | `public/llms.txt` |

Pages that still hold their own words in the page file: `/academia`,
`/research/rethi`, `/activities/purdue-aircraft-teams`,
`/activities/purdue-space-program`, and the `/focus-areas` index intro. In those
files the text sits between `>` and `<` in the markup.

## How to open and edit a file

1. Open the project folder in your editor (VS Code: `code ~/Desktop/Personal-Website`,
   or drag the folder onto the VS Code icon). Any text editor works.
2. In the sidebar open `src` → `content` → `home.ts`.
3. Change the text **between the quotes**. Keep the quotes, the commas, and the
   square/curly brackets exactly where they are.
4. Save. If the dev server is running (`npm run dev`), the page in your browser
   updates by itself.

Quick sanity check after editing: run `npm run build`. If it prints an error
naming your file, a quote or comma went missing.

## The home page file, section by section

`src/content/home.ts` holds:

- `hero` — your name, the rotating words under it, and the intro paragraph.
- `sections` — the title, intro line, and button label for every band on the
  page (Personal Projects, Academia, Professional Experiences, Applied
  Engineering Projects, Awards, Resume & Contact).
- `experiences` — the job/research cards.
- `courseHighlights` — the four course cards in the Academia band.
- `activityCards` — the Purdue Aircraft Teams and Purdue Space Program cards.
- `resumeOptions` — the resume picker in the Resume & Contact band.
- `contact` — the email, LinkedIn link, location, and button labels.

### Adding a job card

Copy an existing `{ ... }` block inside `experiences`, paste it after, and edit:

```ts
{
  role: 'Job title',
  org: 'Company or university',
  dates: 'Month Year - Month Year',
  accent: 'indigo' as Accent,        // indigo | cyan | purple | teal
  icon: 'briefcase' as IconName,     // briefcase | lightbulb | beaker | shield | rocket | engine | car
  intro: 'Optional opening line above the bullets:',
  bullets: [
    'First bullet.',
    'Second bullet.',
  ],
  tags: ['Skill', 'Skill', 'Skill'],
},
```

Order in the list is the order on the page. The first three sit across the top
row; add `wide: true` to an entry to give it its own full-width row underneath
(that is how the RETHi research card is laid out). Add `linkHref` and
`linkLabel` to put a link in the card.

Two formatting helpers:

- `**text between double asterisks**` in an `intro` renders bold.
- `tags` are joined with bullets automatically, so write them as separate items.

### Adding a course card

Same idea inside `courseHighlights`. Drop `linkHref`/`linkLabel` if there is no
report to link.

### New icon or colour

Icons live in `src/components/CardIcon.tsx`; add an SVG there and its name to
`IconName` in `src/content/home.ts`. Colours live in the `ACCENTS` table at the
top of `src/app/page.tsx`.

## Focus-area pages

Each page under `/focus-areas` is one JSON file in
`src/data/expertise/records/`. The file name must match its `slug`. The build
enforces rules on these files so the pages cannot go thin or link to pages that
do not exist: at least 2 evidence blocks, at least ~1000 characters of prose,
lengths on each field, and every `sourceUrl` must point at a real route. If a
build fails it names the file and the field.

## Publishing

- Local preview: `npm run dev`, then open http://localhost:3000.
- Check it builds: `npm run build`.
- Live: commit and push to GitHub; Vercel redeploys in about a minute.
