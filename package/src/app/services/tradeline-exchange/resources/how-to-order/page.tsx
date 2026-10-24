import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import HowToOrderClient from "./HowToOrderClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources/how-to-order");

export default function HowToOrderPage() {
  return <HowToOrderClient />;
}
