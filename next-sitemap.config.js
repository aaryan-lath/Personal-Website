/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.aaryanlath.com',
  generateRobotsTxt: true,
  // Only 9 URLs, so a single plain sitemap.xml beats an index sitemap.
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.7,
  // /admin* keeps the login page out if it ever becomes static.
  // /api/* is insurance: next-sitemap does not filter API paths.
  exclude: ['/admin*', '/api/*'],
  // Project and expertise routes are prerendered via generateStaticParams,
  // so they land in the prerender manifest and join the sitemap automatically.
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
};
