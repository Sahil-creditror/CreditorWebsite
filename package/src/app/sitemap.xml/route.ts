import { NextResponse } from 'next/server';
import { getBlogsSlugs } from '@/lib/blogmarkdown';
import { getPostSlugs } from '@/lib/markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creditoracademy.com';

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

    // Build XML sitemap
    const urls = [
      // Static pages
      ...staticPages.map((path) => {
        const url = `${siteUrl}${path}`;
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
        const url = `${siteUrl}/blog/${slug}`;
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }),
      // Project pages
      ...projectSlugs.map((slug) => {
        const url = `${siteUrl}/projects/${slug}`;
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }),
      // Projects-wonder pages
      ...projectSlugs.map((slug) => {
        const url = `${siteUrl}/projects-wonder/${slug}`;
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

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

