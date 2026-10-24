import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";



export const metadata: Metadata = pageMetadata("/financial-freedom/book-smart");

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
