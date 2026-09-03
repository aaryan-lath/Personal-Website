import Link from 'next/link';
import type { ReactNode } from 'react';
import { getAllExpertise } from '../lib/expertise';
import { personalProjects } from '../data/personal-projects';

// Global site footer: a curated map of key subpages, grouped by the homepage
// sections. Expertise and ventures come from the data layer, then a curated
// subset is surfaced here. Server component; the column labels use the site's
// mono face as instrument-panel-style labels.

// Kept OUT of the footer on purpose. These pages/ventures still live on the site
// and in the sitemap; they are just not surfaced in this nav. Edit these sets to
// change what shows.
const FOOTER_HIDDEN_EXPERTISE = new Set([
  'aerodynamic-design',
  'aircraft-design',
  'aerospace-propulsion',
  'structures-mechanisms',
  'post-quantum-cryptography',
]);
const FOOTER_HIDDEN_VENTURES = new Set(['starkhacks-cadence-labs']);

function FooterGroup({
  label,
  className = '',
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <nav aria-label={label} className={className}>
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-400">
        <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-blue-500" />
        {label}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </nav>
  );
}

function FooterLink({
  href,
  children,
  external = false,
  muted = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  muted?: boolean;
}) {
  const cls = `text-sm transition-colors ${
    muted ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-white'
  }`;
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </li>
  );
}

export default function Footer() {
  const expertise = getAllExpertise().filter((r) => !FOOTER_HIDDEN_EXPERTISE.has(r.slug));
  const ventures = personalProjects.filter((p) => !FOOTER_HIDDEN_VENTURES.has(p.id));
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="relative bg-gray-950 text-gray-400">
      {/* Blue hairline tying the footer to the site accent */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-blue-600/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Identity + quick contact */}
          <div className="lg:col-span-3">
            <p className="text-lg font-semibold text-white">Aaryan Lath</p>
            <p className="mt-2 max-w-xs text-sm text-gray-400">
              Aerospace engineering at Purdue, cofounder of CryptiQ.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-gray-500">
              Dallas, TX
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <a
                href="mailto:aaryanlath05@gmail.com"
                className="text-gray-300 transition-colors hover:text-blue-400"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/aaryan-lath/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-blue-400"
              >
                LinkedIn
              </a>
              <a
                href="/Aaryan_Lath-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-blue-400"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Ventures + the remaining top-level sections (before Expertise) */}
          <div className="space-y-8 lg:col-span-3">
            <FooterGroup label="Ventures">
              {ventures.map((p) =>
                p.href ? (
                  <FooterLink key={p.id} href={p.href} external>
                    {p.title}
                  </FooterLink>
                ) : null
              )}
            </FooterGroup>
            <FooterGroup label="More">
              <FooterLink href="/academia">Academia</FooterLink>
              <FooterLink href="/#internships">Internships</FooterLink>
              <FooterLink href="/timeline">Achievements</FooterLink>
              <FooterLink href="/#contact">Contact</FooterLink>
            </FooterGroup>
          </div>

          {/* Expertise: a curated subset of the topic pages */}
          <FooterGroup label="Expertise" className="lg:col-span-3">
            {expertise.map((r) => (
              <FooterLink key={r.slug} href={`/expertise/${r.slug}`}>
                {r.shortTitle}
              </FooterLink>
            ))}
            <FooterLink href="/expertise" muted>
              All expertise
            </FooterLink>
          </FooterGroup>

          {/* Research + Hands-On */}
          <div className="space-y-8 lg:col-span-3">
            <FooterGroup label="Research">
              <FooterLink href="/research/rethi">RETHi</FooterLink>
            </FooterGroup>
            <FooterGroup label="Hands-On">
              <FooterLink href="/activities/purdue-aircraft-teams">Purdue Aircraft Teams</FooterLink>
              <FooterLink href="/activities/purdue-space-program">Purdue Space Program</FooterLink>
            </FooterGroup>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-500">© {year} Aaryan Lath. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-gray-600">
            Purdue AAE · Builder
          </p>
        </div>
      </div>
    </footer>
  );
}
