import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";



export const metadata: Metadata = pageMetadata("/operate-private/street-smart");

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="Street Smart"
        desc="Recorded lectures for <span>Operate Private</span> — business trusts, PMAs, and real estate on your schedule."
        buttonPath="https://lmsathena.com/signup"
        buttonText="Access Lectures"
      />
      <TrackDetailPage courseId="operate-private" track="street-smart" />
      <CTA />
    </main>
  );
}
