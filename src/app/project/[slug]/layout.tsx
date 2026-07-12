import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import { pageJsonLd } from '../../../data/structured-data';
import { cadProjects } from '../../../data/cad-projects';

// Prerender exactly the known project slugs; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return cadProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = cadProjects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.metaDescription,
    alternates: { canonical: `/project/${project.slug}` },
  };
}

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const project = cadProjects.find((p) => p.slug === params.slug);
  return (
    <>
      {project && (
        <JsonLd
          data={pageJsonLd({
            path: `/project/${project.slug}`,
            name: project.title,
            description: project.metaDescription,
            breadcrumbName: project.title,
          })}
        />
      )}
      {children}
    </>
  );
}
