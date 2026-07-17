import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCoursePath, getModuleBySlug } from "@/app/components/learning-paths/data";
import ModuleDetail from "@/app/components/learning-paths/module-detail";
import CTA from "@/app/components/shared/cta";

const course = getCoursePath("become-private");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

type Props = { params: Promise<{ module: string }> };

export async function generateStaticParams() {
  return course.modules.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = getModuleBySlug(course, slug);
  if (!mod) return {};
  return {
    title: `${mod.title} | Become Private | Creditor Academy`,
    description: `${mod.title} — ${mod.totalLessons} lessons in the Become Private program.`,
    alternates: { canonical: `${siteUrl}/become-private/${slug}` },
  };
}

export default async function BecomePrivateModulePage({ params }: Props) {
  const { module: slug } = await params;
  const mod = getModuleBySlug(course, slug);
  if (!mod) notFound();

  return (
    <main>
      <ModuleDetail course={course} moduleSlug={slug} />
      <CTA />
    </main>
  );
}
