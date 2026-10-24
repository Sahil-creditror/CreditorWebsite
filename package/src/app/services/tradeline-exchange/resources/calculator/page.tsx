import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources/calculator");

export default function CalculatorPage() {
  return <CalculatorClient />;
}
