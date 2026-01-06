import { MetadataRoute } from 'next';
import { getBlogsSlugs } from '@/lib/blogmarkdown';
import { getPostSlugs } from '@/lib/markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creditoracademy.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog and project slugs with error handling
  let blogSlugs: string[] = [];
  let projectSlugs: string[] = [];
  
  try {
    blogSlugs = getBlogsSlugs().map((slug) => slug.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error getting blog slugs:', error);
  }
  
  try {
    projectSlugs = getPostSlugs().map((slug) => slug.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error getting project slugs:', error);
  }

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/projects',
    '/courses',
    '/services',
    '/documentation',
    '/pmaform',
    '/privacy-policy',
    '/terms-and-conditions',
    '/return-refund',
  ];

  // Build sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = [
    // Static pages
    ...staticPages.map((path) => {
      const changeFreq: 'daily' | 'weekly' = path === '' ? 'daily' : 'weekly';
      return {
        url: `${siteUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority: path === '' ? 1.0 : 0.8,
      };
    }),
    // Blog pages
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    // Project pages
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Projects-wonder pages
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/projects-wonder/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return sitemapEntries;
}

