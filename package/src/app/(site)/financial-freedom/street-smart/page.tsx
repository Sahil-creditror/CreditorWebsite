import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import TrackDetailPage from "@/app/components/learning-paths/track-detail";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Street Smart — Recorded Lectures | Financial Freedom | Creditor Academy",
  description:
    "Financial Freedom Street Smart — recorded lectures across I Want Remedy Now, Business Credit, and Business Credit (PMA).",
  alternates: {
    canonical: `${siteUrl}/financial-freedom/street-smart`,
  },
};

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="Street Smart"
        desc="Recorded lectures for <span>Financial Freedom</span> — remedies and business credit on your schedule."
        buttonPath="https://lmsathena.com/signup"
        buttonText="Access Lectures"
      />
      <TrackDetailPage courseId="financial-freedom" track="street-smart" />
      <CTA />
    </main>
  );
}
