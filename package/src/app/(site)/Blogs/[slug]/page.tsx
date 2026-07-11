import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetail from "@/app/components/Blogs/BlogDetail";
import { getJournalPostBySlug, getAllJournalSlugs } from "@/lib/journalPosts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) {
    return { title: "Journal Not Found | Creditor" };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords.split(",").map((keyword) => keyword.trim()),
    alternates: {
      canonical: `${siteUrl}/Blogs/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${siteUrl}/Blogs/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [
        post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
      ],
    },
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <BlogDetail post={post} />
    </main>
  );
}
