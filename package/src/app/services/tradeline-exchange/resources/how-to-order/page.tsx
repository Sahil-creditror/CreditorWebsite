import type { Metadata } from "next";
import HowToOrderClient from "./HowToOrderClient";

export const metadata: Metadata = {
  title: "How to Order Tradelines | Creditor Academy",
  description: "Follow our simple step-by-step guide on how to order authorized user tradelines through Tradeline Exchange.",
  keywords: "how to order tradelines, tradeline ordering process, buy tradeline steps, creditor academy",
};

export default function HowToOrderPage() {
  return <HowToOrderClient />;
}
