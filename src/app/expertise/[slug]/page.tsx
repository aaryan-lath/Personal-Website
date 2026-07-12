import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import { pageJsonLd } from '../../../data/structured-data';
import { getAllExpertise, getExpertiseBySlug } from '../../../lib/expertise';
import type { ExpertiseRecord } from '../../../data/expertise/schema';

// Template route for expertise records. Content lives in
// src/data/expertise/records/*.json; edit those, never this template.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllExpertise().map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const rec = getExpertiseBySlug(params.slug);
  if (!rec) return {};
  return {
    title: rec.metaTitle ?? rec.title,
    description: rec.metaDescription,
    alternates: { canonical: `/expertise/${rec.slug}` },
    openGraph: { title: rec.metaTitle ?? rec.title, description: rec.metaDescription },
  };
}

export default function ExpertisePage({ params }: { params: { slug: string } }) {
  const rec = getExpertiseBySlug(params.slug);
  if (!rec) notFound();

  const related = rec.relatedSlugs
    .map((s) => getExpertiseBySlug(s))
    .filter((r): r is ExpertiseRecord => Boolean(r));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <JsonLd
            data={pageJsonLd({
              path: `/expertise/${rec.slug}`,
              name: rec.title,
              description: rec.metaDescription,
              breadcrumbName: rec.shortTitle,
              extraCrumb: { name: 'Expertise', path: '/expertise' },
              dateModified: rec.lastReviewed,
            })}
          />

          {/* Visible breadcrumb (mirrors the BreadcrumbList JSON-LD) */}
          <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/expertise" className="hover:text-blue-600">Expertise</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{rec.shortTitle}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <Link
              href="/expertise"
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Expertise
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">{rec.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{rec.hero}</p>
            <div className="flex flex-wrap gap-3">
              {rec.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Evidence */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How Aaryan has used this</h2>
            <div className="space-y-6">
              {rec.evidence.map((e, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <p className="font-semibold text-gray-900 mb-2">{e.context}</p>
                  <p className="text-gray-700 mb-3">{e.whatIDid}</p>
                  <p className="text-gray-700 mb-3">
                    <span className="font-medium text-blue-700">Result: </span>
                    {e.outcome}
                  </p>
                  <Link
                    href={e.sourceUrl}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {e.sourceLabel}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Coursework + projects */}
          {(rec.courses.length > 0 || rec.projects.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {rec.courses.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Relevant coursework</h2>
                  <ul className="space-y-3">
                    {rec.courses.map((c) => (
                      <li key={c.code} className="text-gray-700">
                        <span className="font-medium text-gray-900">{c.code}: </span>
                        {c.note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {rec.projects.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related projects</h2>
                  <ul className="space-y-3">
                    {rec.projects.map((p) => (
                      <li key={p.name} className="text-gray-700">
                        {p.href ? (
                          <Link href={p.href} className="font-medium text-blue-600 hover:text-blue-800">
                            {p.name}
                          </Link>
                        ) : (
                          <span className="font-medium text-gray-900">{p.name}</span>
                        )}
                        <span>: {p.summary}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tools */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tools and methods</h2>
            <div className="flex flex-wrap gap-3">
              {rec.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Related expertise */}
          {related.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/expertise/${r.slug}`}
                    className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 mb-2 transition-colors">
                      {r.shortTitle}
                    </h3>
                    <p className="text-sm text-gray-600">{r.metaDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            {/* EDIT TEXT HERE: CTA line on every expertise page */}
            <p className="text-gray-700 mb-4">
              Working on something in this space? Aaryan would love to hear about it.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">Last reviewed {rec.lastReviewed}</p>
        </div>
      </div>
    </div>
  );
}
