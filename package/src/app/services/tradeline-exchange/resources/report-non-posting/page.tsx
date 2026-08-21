import type { Metadata } from "next";
import ReportNonPostingClient from "./ReportNonPostingClient";

export const metadata: Metadata = {
  title: "Tradeline Not Posting? Report It | Creditor Academy",
  description: "Find out what to do if your authorized user tradeline hasn't posted to your credit report and how to report it for resolution.",
  keywords: "tradeline not posting, tradeline non-posting, report tradeline issue, creditor academy",
};

export default function ReportNonPostingPage() {
  return <ReportNonPostingClient />;
}
