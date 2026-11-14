import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import EbooksPage from "@/app/components/ebooks";

export const metadata: Metadata = pageMetadata("/ebooks");

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="Practical eBooks on Credit, Debt Collection & Child Support"
        desc="Practical legal and financial self-help guides by <span>PaulMichael Rowland</span> — digital editions with instant access at $49.99 each."
        buttonPath="https://ebook.lmsathena.com/"
        buttonText="Explore eBook Catalog"
      />
      <EbooksPage />
    </main>
  );
}
