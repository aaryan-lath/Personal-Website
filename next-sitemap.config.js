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
  // /project/[slug] has no generateStaticParams (routing files are fragile
  // per AI_CONTEXT.md), so the two live slugs are listed here. Slugs derive
  // from ProjectCard titles on the homepage:
  // title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  // Keep in sync if project titles change.
  additionalPaths: async (config) => [
    await config.transform(config, '/project/turbofan-engine-assembly'),
    await config.transform(config, '/project/single-piston-sterling-engine'),
  ],
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
