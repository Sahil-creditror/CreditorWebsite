import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import ReportNonPostingClient from "./ReportNonPostingClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources/report-non-posting");

export default function ReportNonPostingPage() {
  return <ReportNonPostingClient />;
}
