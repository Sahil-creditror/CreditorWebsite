import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import BuyersGuideClient from "./BuyersGuideClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources/buyers-guide");

export default function BuyersGuidePage() {
  return <BuyersGuideClient />;
}
