import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Tradeline Resources | Guides, FAQ & Tools | Creditor Academy",
  description: "Explore Tradeline Exchange's library of guides, FAQs and tools to help you buy or sell tradelines with confidence.",
  keywords: "tradeline resources, tradeline guides, tradeline help center, creditor academy",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
