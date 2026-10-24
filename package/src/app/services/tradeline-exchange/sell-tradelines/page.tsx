import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import SellTradelinesClient from "./SellTradelinesClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/sell-tradelines");

export default function SellTradelinesPage() {
  return <SellTradelinesClient />;
}
