import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import BuyTradelinesClient from "./BuyTradelinesClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/buy-tradelines");

export default function BuyTradelinesPage() {
  return <BuyTradelinesClient />;
}
