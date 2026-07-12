import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import { pageJsonLd } from '../../../data/structured-data';

const description =
  'Chief engineer of Purdue\'s SAE Aero Design team through the 2026 East competition, plus AUVSI SUAS and AIAA Design/Build/Fly work: design, build, flight test.';

export const metadata: Metadata = {
  title: 'Purdue Aircraft Teams',
  description,
  alternates: { canonical: '/activities/purdue-aircraft-teams' },
};

export default function AircraftTeamsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: '/activities/purdue-aircraft-teams',
          name: 'Purdue Aircraft Teams',
          description,
          breadcrumbName: 'Purdue Aircraft Teams',
        })}
      />
      {children}
    </>
  );
}
