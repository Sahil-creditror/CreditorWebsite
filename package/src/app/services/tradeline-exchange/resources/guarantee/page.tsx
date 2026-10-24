import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import GuaranteeClient from "./GuaranteeClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources/guarantee");

export default function GuaranteePage() {
  return <GuaranteeClient />;
}
