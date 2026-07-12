import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pageJsonLd } from '../../data/structured-data';

const description =
  'Milestones from Aaryan Lath\'s aerospace journey: SAE Aero Design East 2026, a Siemens internship, research presentations, and Purdue Space Day.';

export const metadata: Metadata = {
  title: 'Awards and Achievements Timeline',
  description,
  alternates: { canonical: '/timeline' },
};

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: '/timeline',
          name: 'Awards and Achievements Timeline',
          description,
          breadcrumbName: 'Achievements',
        })}
      />
      {children}
    </>
  );
}
