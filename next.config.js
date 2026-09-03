/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The topic pages moved from /expertise to /focus-areas; 308s keep the
      // old URLs (and anything already indexed or linked) working.
      { source: '/expertise', destination: '/focus-areas', permanent: true },
      { source: '/expertise/:slug', destination: '/focus-areas/:slug', permanent: true },
      // The "Other Research Indulgements" page is gone; its MDO content now
      // lives on the design-optimization focus area.
      { source: '/research/zucrow', destination: '/focus-areas/design-optimization', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Keep the hidden admin area out of search results without naming
        // it in robots.txt. Headers run before the filesystem, so this also
        // covers static files under public/admin/.
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
