import type { Metadata } from "next";
import WorkshopPageContent from "@/app/components/workshop/WorkshopPageContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Live Workshop: Business Trusts & Credit | Creditor Academy",
  description: "Join Creditor Academy's hands-on workshop covering business trusts, credit building and asset protection strategies.",
  keywords: "creditor academy workshop, business trust workshop, credit workshop, become private, operate private, financial freedom",
  alternates: {
    canonical: `${siteUrl}/workshop`,
  },
};

export default function WorkshopPage() {
  return (
    <main>
      <WorkshopPageContent />
    </main>
  );
}
