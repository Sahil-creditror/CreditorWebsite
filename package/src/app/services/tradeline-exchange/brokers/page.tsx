import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import BrokersClient from "./BrokersClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/brokers");

export default function BrokersPage() {
  return <BrokersClient />;
}
