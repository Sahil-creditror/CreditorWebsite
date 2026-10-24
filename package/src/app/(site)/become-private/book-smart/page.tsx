import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";



export const metadata: Metadata = pageMetadata("/become-private/book-smart");

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
