import type { Metadata } from "next";
import FaqsClient from "./FaqsClient";

export const metadata: Metadata = {
  title: "Tradeline FAQs | Common Questions Answered | Creditor Academy",
  description: "Get answers to the most common questions about buying, selling and using authorized user tradelines.",
  keywords: "tradeline FAQs, tradeline questions, tradeline exchange help, creditor academy",
};

export default function FaqsPage() {
  return <FaqsClient />;
}
