import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getCoursePath,
  getModuleBySlug,
} from "@/app/components/learning-paths/data";
import type { TrackId } from "@/app/components/learning-paths/data";
import ModuleTrackDetail from "@/app/components/learning-paths/module-track-detail";
import CTA from "@/app/components/shared/cta";

const course = getCoursePath("financial-freedom");
const VALID_TRACKS: TrackId[] = ["book-smart", "street-smart"];
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

type Props = { params: Promise<{ module: string; track: string }> };

export async function generateStaticParams() {
  return course.modules.flatMap((m) =>
    VALID_TRACKS.map((t) => ({ module: m.slug, track: t }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: moduleSlug, track } = await params;
  const mod = getModuleBySlug(course, moduleSlug);
  if (!mod || !VALID_TRACKS.includes(track as TrackId)) return {};
  const trackLabel = track === "book-smart" ? "Book Smart" : "Street Smart";
  return {
    title: `${mod.title} — ${trackLabel} | Financial Freedom | Creditor Academy`,
    description: `${trackLabel} lessons for ${mod.title} in the Financial Freedom program.`,
    alternates: { canonical: `${siteUrl}/financial-freedom/${moduleSlug}/${track}` },
  };
}

export default async function FinancialFreedomModuleTrackPage({ params }: Props) {
  const { module: moduleSlug, track } = await params;
  const mod = getModuleBySlug(course, moduleSlug);
  if (!mod || !VALID_TRACKS.includes(track as TrackId)) notFound();

  return (
    <main>
      <ModuleTrackDetail
        course={course}
        moduleSlug={moduleSlug}
        track={track as TrackId}
      />
      <CTA />
    </main>
  );
}
