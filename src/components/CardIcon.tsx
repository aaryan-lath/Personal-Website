import type { ReactNode } from 'react';
import type { IconName } from '../content/home';

// The small round icons on the home-page cards. Content files pick one by
// name (e.g. icon: 'beaker'); add an entry here to make a new name available.
const ICONS: Record<IconName, ReactNode> = {
  briefcase: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"
    />
  ),
  lightbulb: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  ),
  beaker: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  ),
  rocket: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L10 6h4L12 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 18l-2 2M16 18l2 2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18h4" />
    </>
  ),
  engine: (
    <>
      <circle cx="12" cy="12" r="2.5" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v3M12 17v3M4 12h3M17 12h3" />
      <circle cx="7" cy="7" r="1.5" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.5" strokeWidth="2" />
      <circle cx="7" cy="17" r="1.5" strokeWidth="2" />
      <circle cx="17" cy="17" r="1.5" strokeWidth="2" />
    </>
  ),
  car: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10h14l-1-4H6l-1 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10v6h14v-6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16h10" />
      <circle cx="8" cy="18" r="1.5" strokeWidth="2" />
      <circle cx="16" cy="18" r="1.5" strokeWidth="2" />
    </>
  ),
};

export default function CardIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {ICONS[name]}
    </svg>
  );
}
