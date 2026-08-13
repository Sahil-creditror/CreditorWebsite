import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import StreetSmartContent from "@/app/components/master-class/street-smart";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Street Smart — Recorded Lectures | Master Class | Creditor Academy",
  description:
    "Street Smart is the recorded-lecture track of the Master Class. Learn on demand — pause, rewind, and master private strategies at your own pace.",
  alternates: {
    canonical: `${siteUrl}/master-class/street-smart`,
  },
};

export default function StreetSmartPage() {
  return (
    <main>
      <Herobanner
        heading="Street Smart"
        desc="Recorded lectures on demand — study at your pace, replay every module, and build <span>practical mastery</span> on your schedule."
        buttonPath="https://lmsathena.com/signup"
        buttonText="Access Lectures"
      />
      <StreetSmartContent />
      <CTA />
    </main>
  );
}
