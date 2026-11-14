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
    // Exclude redirecting legacy routes
    '/about',
    '/become',
    '/operate',
    '/private',
    '/projects',
    '/projects/*',
    '/services_page',
    '/services_page/*',
    // Exclude internal utility and sensitive account routes
    '/services/tradeline-exchange/my-account',
    '/services/tradeline-exchange/cart',
    '/services/tradeline-exchange/checkout',
    '/services/tradeline-exchange/checkout/*',
    '/pmaform',
    '/pma-submissions',
    '/event-registration',
    '/webinar-recording',
    '/webinar-recording/*',
    '/services',
    // Exclude prototype wonder routes
    '/become-wonder',
    '/operate-wonder',
    '/private-wonder',
    '/projects-wonder',
    '/projects-wonder/*',
  ],
  additionalPaths: async (config) => {
    const result = [];

    // Get dynamic blog slugs (canonical capitalization: /Blogs/[slug])
    try {
      const blogSlugs = getBlogsSlugs().map((slug) => slug.replace(/\.mdx$/, ''));
      blogSlugs.forEach((slug) => {
        result.push({
          loc: `/Blogs/${slug}`,
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

