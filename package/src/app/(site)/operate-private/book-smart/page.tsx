import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Book Smart — Live Lessons | Operate Private | Creditor Academy",
  description:
    "Operate Private Book Smart — live lessons across Business Trust, PMA, and Real Estate Through Trusts.",
  alternates: {
    canonical: `${siteUrl}/operate-private/book-smart`,
  },
};

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="Book Smart"
        desc="Live lessons for <span>Operate Private</span> — business trusts, PMAs, and real estate through trusts."
        buttonPath="https://lmsathena.com/signup"
        buttonText="Join Live Lessons"
      />
      <TrackDetailPage courseId="operate-private" track="book-smart" />
      <CTA />
    </main>
  );
}
