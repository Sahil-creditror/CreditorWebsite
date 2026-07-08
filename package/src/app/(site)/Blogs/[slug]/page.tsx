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
    title: `${post.title} | Creditor Journal`,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/Blogs/${post.slug}`,
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
