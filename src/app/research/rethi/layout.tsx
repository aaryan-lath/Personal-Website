import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import { pageJsonLd } from '../../../data/structured-data';

const description =
  'Research at the Resilient Extraterrestrial Habitat Institute: safety control trade studies, lunar habitat disruption analysis, FEA, and Vectran strap testing.';

export const metadata: Metadata = {
  title: 'RETHi Deep-Space Habitat Research',
  description,
  alternates: { canonical: '/research/rethi' },
};

export default function RethiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: '/research/rethi',
          name: 'RETHi Deep-Space Habitat Research',
          description,
          breadcrumbName: 'RETHi Research',
        })}
      />
      {children}
    </>
  );
}
