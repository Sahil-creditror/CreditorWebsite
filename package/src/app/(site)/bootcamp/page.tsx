import type { Metadata } from "next";
import BootcampPageContent from "@/app/components/bootcamp/BootcampPageContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Free Bootcamp: Unlock Your Business Funding Potential | Creditor Academy",
  description:
    "Join Creditor Academy's free bootcamp on 1 October at 3 PM PST. Learn about business loans, credit building, and funding strategies to grow your business.",
  keywords:
    "business funding, free bootcamp, business loans, credit building, funding strategies, creditor academy, October bootcamp",
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
