import type { Metadata } from "next";
import BootcampPageContent from "@/app/components/bootcamp/BootcampPageContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Free Bootcamp: Dispute Letter Batch for October | Creditor Academy",
  description:
    "Join Creditor Academy's free bootcamp on 30 September at 3 PM PST. Learn dispute letter writing, credit report analysis, score improvement techniques, and step-by-step guidance.",
  keywords:
    "dispute letter batch, free bootcamp, credit report analysis, dispute letter writing, score improvement, creditor academy, October credit bootcamp",
  alternates: {
    canonical: `${siteUrl}/bootcamp`,
  },
};

export default function BootcampPage() {
  return (
    <main>
      <BootcampPageContent />
    </main>
  );
}
