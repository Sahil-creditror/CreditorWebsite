import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources");

export default function ResourcesPage() {
  return <ResourcesClient />;
}
