import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Book Smart — Live Lessons | Financial Freedom | Creditor Academy",
  description:
    "Financial Freedom Book Smart — live lessons across I Want Remedy Now, Business Credit, and Business Credit (PMA).",
  alternates: {
    canonical: `${siteUrl}/financial-freedom/book-smart`,
  },
};

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="Book Smart"
        desc="Live lessons for <span>Financial Freedom</span> — court remedies, business credit, and PMA credit systems."
        buttonPath="https://lmsathena.com/signup"
        buttonText="Join Live Lessons"
      />
      <TrackDetailPage courseId="financial-freedom" track="book-smart" />
      <CTA />
    </main>
  );
}
