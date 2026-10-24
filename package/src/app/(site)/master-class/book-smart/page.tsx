import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import BookSmartContent from "@/app/components/master-class/book-smart";
import CTA from "@/app/components/shared/cta";



export const metadata: Metadata = pageMetadata("/master-class/book-smart");

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
