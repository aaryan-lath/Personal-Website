import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import { pageJsonLd } from '../../../data/structured-data';

const description =
  'Structures, Mechanisms and Thermals member on the PSP Satellites team, deputy systems director, and secretary for the 10-team Purdue Space Program.';

export const metadata: Metadata = {
  title: 'Purdue Space Program',
  description,
  alternates: { canonical: '/activities/purdue-space-program' },
};

export default function SpaceProgramLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: '/activities/purdue-space-program',
          name: 'Purdue Space Program',
          description,
          breadcrumbName: 'Purdue Space Program',
        })}
      />
      {children}
    </>
  );
}
