import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Book Smart — Live Lessons | Become Private | Creditor Academy",
  description:
    "Become Private Book Smart — live lessons across SOV 101, SPC, and Status Correction modules.",
  alternates: {
    canonical: `${siteUrl}/become-private/book-smart`,
  },
};

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="Book Smart"
        desc="Live lessons for <span>Become Private</span> — SOV 101, secured party creditor status, and status correction."
        buttonPath="https://lmsathena.com/signup"
        buttonText="Join Live Lessons"
      />
      <TrackDetailPage courseId="become-private" track="book-smart" />
      <CTA />
    </main>
  );
}
