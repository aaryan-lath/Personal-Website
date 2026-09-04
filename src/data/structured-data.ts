// Single source of truth for sitewide schema.org entities. The root layout
// renders both nodes on every page; page-level JSON-LD references them by @id.

export const SITE_URL = 'https://www.aaryanlath.com';

// Base list; expertise records merge their own knowsAbout terms in Phase 2.
export const baseKnowsAbout = [
  'Aerospace Engineering',
  'Aircraft Design',
  'Aerodynamics',
  'Multidisciplinary Design Optimization',
  'Aerospace Propulsion',
  'Systems Engineering',
  'Aerospace Structures',
  'CAD and PLM',
  'Post-Quantum Cryptography',
  'Advanced Air Mobility',
];

export function personJsonLd(knowsAbout: string[] = baseKnowsAbout) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Aaryan Lath',
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.jpeg`,
    jobTitle: [
      'Mechanical Engineer and Product Designer at Siemens Smart Infrastructure',
      'Cofounder of CryptiQ',
      'SkyBase Manager at LuftCar',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Purdue University',
      department: 'School of Aeronautics and Astronautics',
      sameAs: 'https://www.purdue.edu',
    },
    worksFor: [
      { '@type': 'Organization', name: 'Siemens Smart Infrastructure', url: 'https://www.siemens.com' },
      { '@type': 'Organization', name: 'CryptiQ', url: 'https://cryptiqsecurity.com' },
      { '@type': 'Organization', name: 'LuftCar', url: 'https://www.luftcar.com' },
    ],
    founder: [
      { '@type': 'Organization', name: 'CryptiQ', url: 'https://cryptiqsecurity.com' },
    ],
    sameAs: [
      'https://www.linkedin.com/in/aaryan-lath/',
      'https://cryptiqsecurity.com',
      'https://www.luftcar.com',
    ],
    knowsAbout,
  };
}

// WebPage + BreadcrumbList graph for a leaf page. Used by the per-route
// layout.tsx files so each page carries its own nodes referencing #person.
export function pageJsonLd(opts: {
  path: string; // e.g. '/academia'
  name: string;
  description: string;
  breadcrumbName: string;
  extraCrumb?: { name: string; path: string }; // optional middle crumb
  dateModified?: string;
}) {
  const pageUrl = `${SITE_URL}${opts.path}`;
  const crumbs = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    ...(opts.extraCrumb
      ? [{ '@type': 'ListItem', position: 2, name: opts.extraCrumb.name, item: `${SITE_URL}${opts.extraCrumb.path}` }]
      : []),
    {
      '@type': 'ListItem',
      position: opts.extraCrumb ? 3 : 2,
      name: opts.breadcrumbName,
      item: pageUrl,
    },
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: opts.name,
        description: opts.description,
        about: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: crumbs,
      },
    ],
  };
}

export const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Aaryan Lath',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#person` },
};
