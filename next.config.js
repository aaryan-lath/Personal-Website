/** @type {import('next').NextConfig} */
const nextConfig = {
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
