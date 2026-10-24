import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import EbooksPage from "@/app/components/ebooks";

export const metadata: Metadata = pageMetadata("/ebooks");

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="eBook Library"
        desc="Expert financial guides by <span>Paulmichael Rowland</span> — click any book to view and purchase."
        buttonPath="https://ebook.lmsathena.com/"
        buttonText="Browse All Books"
      />
      <EbooksPage />
    </main>
  );
}
