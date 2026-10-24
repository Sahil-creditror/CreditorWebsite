import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import FaqsClient from "./FaqsClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources/faqs");

export default function FaqsPage() {
  return <FaqsClient />;
}
