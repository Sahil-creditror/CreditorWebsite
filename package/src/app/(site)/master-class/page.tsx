import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import MasterClassHub from "@/app/components/master-class/hub";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Master Class | Creditor Academy",
  description:
    "Choose your Master Class path — Book Smart live lessons or Street Smart recorded lectures. Build sovereignty, trusts, credit systems, and private financial infrastructure.",
  alternates: {
    canonical: `${siteUrl}/master-class`,
  },
};

export default function MasterClassPage() {
  return (
    <main>
      <Herobanner
        heading="Master Class"
        desc="Build sovereignty, business trusts, credit systems, and <span>private financial infrastructure</span> — choose live lessons or recorded lectures."
        buttonPath="/masterclass-membership"
        buttonText="Join Membership"
      />
      <MasterClassHub />
      <CTA />
    </main>
  );
}
