import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import BootcampPageContent from "@/app/components/bootcamp/BootcampPageContent";



export const metadata: Metadata = pageMetadata("/bootcamp");

export default function BootcampPage() {
  return (
    <main>
      <BootcampPageContent />
    </main>
  );
}
