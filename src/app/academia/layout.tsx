import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pageJsonLd } from '../../data/structured-data';

const description =
  'Purdue AAE coursework and highlights from Aaryan Lath: GPA 3.73, graduate courses like AAE 550 MDO and AAE 514 Intermediate Aerodynamics, plus course reports.';

export const metadata: Metadata = {
  title: 'Academic Coursework at Purdue',
  description,
  alternates: { canonical: '/academia' },
};

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: '/academia',
          name: 'Academic Coursework at Purdue',
          description,
          breadcrumbName: 'Academia',
        })}
      />
      {children}
    </>
  );
}
