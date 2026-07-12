import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import { pageJsonLd } from '../../../data/structured-data';

const description =
  'Multidisciplinary design optimization for electric aircraft, an AIAA Aviation Forum 2026 abstract, and high speed compressor lab work at Purdue\'s Zucrow Labs.';

export const metadata: Metadata = {
  title: 'MDO and Propulsion Research at Zucrow Labs',
  description,
  alternates: { canonical: '/research/zucrow' },
};

export default function ZucrowLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: '/research/zucrow',
          name: 'MDO and Propulsion Research at Zucrow Labs',
          description,
          breadcrumbName: 'Zucrow Research',
        })}
      />
      {children}
    </>
  );
}
