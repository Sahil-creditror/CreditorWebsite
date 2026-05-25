const { getBlogsSlugs } = require('./sitemap-helpers');

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creditoracademy.com';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/admin/*',
    '/api/*',
    '/signin',
    '/signup',
    '/forgot-password',
  ],
  additionalPaths: async (config) => {
    const result = [];

    // Get dynamic blog slugs
    try {
      const blogSlugs = getBlogsSlugs().map((slug) => slug.replace(/\.mdx$/, ''));
      blogSlugs.forEach((slug) => {
        result.push({
          loc: `/blog/${slug}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        });
      });
    } catch (error) {
      console.error('Error getting blog slugs:', error);
    }

    return result;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [],
  },
};

