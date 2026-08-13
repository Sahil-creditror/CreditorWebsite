import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Street Smart — Recorded Lectures | Operate Private | Creditor Academy",
  description:
    "Operate Private Street Smart — recorded lectures across Business Trust, PMA, and Real Estate Through Trusts.",
  alternates: {
    canonical: `${siteUrl}/operate-private/street-smart`,
  },
};

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
