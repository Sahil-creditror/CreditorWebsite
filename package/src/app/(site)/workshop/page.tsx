import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import WorkshopPageContent from "@/app/components/workshop/WorkshopPageContent";



export const metadata: Metadata = pageMetadata("/workshop");

export default function WorkshopPage() {
  return (
    <main>
      <WorkshopPageContent />
    </main>
  );
}
