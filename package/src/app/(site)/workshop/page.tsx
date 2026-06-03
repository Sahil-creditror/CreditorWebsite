import type { Metadata } from "next";
import WorkshopPageContent from "@/app/components/workshop/WorkshopPageContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Business Credit Workshop | Creditor Academy",
  description:
    "Join Creditor Academy live on June 7 to build elite business credit — Tier 1 credit, funding paths, and practical strategies for $50K–$250K business credit.",
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
