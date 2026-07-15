import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import BookSmartContent from "@/app/components/master-class/book-smart";
import CTA from "@/app/components/shared/cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Book Smart — Live Lessons | Master Class | Creditor Academy",
  description:
    "Book Smart is the live-lesson track of the Master Class. Learn trusts, credit, and private structures in real time with Creditor Academy instructors.",
  alternates: {
    canonical: `${siteUrl}/master-class/book-smart`,
  },
};

export default function BookSmartPage() {
  return (
    <main>
      <Herobanner
        heading="Book Smart"
        desc="Live lessons with instructors — ask questions, get feedback, and master the <span>private foundation</span> in real time."
        buttonPath="https://lmsathena.com/signup"
        buttonText="Join Live Lessons"
      />
      <BookSmartContent />
      <CTA />
    </main>
  );
}
