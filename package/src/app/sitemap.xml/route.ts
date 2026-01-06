import { NextResponse } from 'next/server';
import { getBlogsSlugs } from '@/lib/blogmarkdown';
import { getPostSlugs } from '@/lib/markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creditoracademy.com';

// Force Node.js runtime to ensure file system access works
export const runtime = 'nodejs';

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    // Get all blog and project slugs
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

    // Static pages - including all important pages
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
      '/webinar',
      '/webinar-registration',
      '/webinar-recording',
      '/squeeze',
      '/tncmasterclass',
      '/event-registration',
      '/become',
      '/operate',
      '/private',
    ];

    // Build XML sitemap
    const urls = [
      // Static pages
      ...staticPages.map((path) => {
        const url = escapeXml(`${siteUrl}${path}`);
        const priority = path === '' ? '1.0' : '0.8';
        const changeFreq = path === '' ? 'daily' : 'weekly';
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
      }),
      // Blog pages
      ...blogSlugs.map((slug) => {
        const url = escapeXml(`${siteUrl}/blog/${slug}`);
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }),
      // Project pages
      ...projectSlugs.map((slug) => {
        const url = escapeXml(`${siteUrl}/projects/${slug}`);
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }),
      // Projects-wonder pages
      ...projectSlugs.map((slug) => {
        const url = escapeXml(`${siteUrl}/projects-wonder/${slug}`);
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    // Return with explicit XML content type
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return error as XML to avoid HTML response
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<error>
  <message>Error generating sitemap</message>
</error>`;
    return new NextResponse(errorXml, {
      status: 500,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}

