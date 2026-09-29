import type { Metadata } from "next";
import BootcampPageContent from "@/app/components/bootcamp/BootcampPageContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Free Bootcamp: UBT Banking Packet | Creditor Academy",
  description:
    "Join Creditor Academy's free bootcamp — UBT Banking Packet: What the Banker Will Ask. Learn how to prepare documents, answer banker questions, and unlock better terms.",
  keywords:
    "UBT banking packet, free bootcamp, creditor academy, unincorporated business trust, banking documents, business credit",
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
