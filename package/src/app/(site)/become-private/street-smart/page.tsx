import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";



export const metadata: Metadata = pageMetadata("/become-private/street-smart");

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="Street Smart"
        desc="Recorded lectures for <span>Become Private</span> — study SOV 101, SPC, and status correction on your schedule."
        buttonPath="https://lmsathena.com/signup"
        buttonText="Access Lectures"
      />
      <TrackDetailPage courseId="become-private" track="street-smart" />
      <CTA />
    </main>
  );
}
