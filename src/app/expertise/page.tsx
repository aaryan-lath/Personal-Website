import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { SITE_URL } from '../../data/structured-data';
import { getAllExpertise } from '../../lib/expertise';

const description =
  'Topic deep-dives into what Aaryan Lath actually works on: aerodynamics and CFD, CAD and PLM, and more, each grounded in coursework, teams, and projects.';

export const metadata: Metadata = {
  title: 'Engineering Expertise',
  description,
  alternates: { canonical: '/expertise' },
};

export default function ExpertiseIndexPage() {
  const records = getAllExpertise();
  const pageUrl = `${SITE_URL}/expertise`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'CollectionPage',
                  '@id': `${pageUrl}#webpage`,
                  url: pageUrl,
                  name: 'Engineering Expertise',
                  description,
                  about: { '@id': `${SITE_URL}/#person` },
                  isPartOf: { '@id': `${SITE_URL}/#website` },
                  breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': `${pageUrl}#breadcrumb`,
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                    { '@type': 'ListItem', position: 2, name: 'Expertise', item: pageUrl },
                  ],
                },
              ],
            }}
          />

          <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Expertise</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Engineering Expertise</h1>
            {/* EDIT TEXT HERE: Index intro line */}
            <p className="text-lg text-gray-600">
              Deep-dives into the areas Aaryan works in, each grounded in real coursework, team
              leadership, research, and projects you can verify elsewhere on this site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {records.map((r) => (
              <Link
                key={r.slug}
                href={`/expertise/${r.slug}`}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 mb-2 transition-colors">
                  {r.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">{r.metaDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {r.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-700 mb-4">
              Want the full picture? The resume and contact details live on the home page.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
