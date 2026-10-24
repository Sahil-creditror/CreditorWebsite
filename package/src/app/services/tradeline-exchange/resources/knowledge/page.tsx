import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import KnowledgeClient from "./KnowledgeClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources/knowledge");

export default function KnowledgePage() {
  return <KnowledgeClient />;
}
