import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Street Smart — Recorded Lectures | Become Private | Creditor Academy",
  description:
    "Become Private Street Smart — recorded lectures across SOV 101, SPC, and Status Correction modules.",
  alternates: {
    canonical: `${siteUrl}/become-private/street-smart`,
  },
};

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
