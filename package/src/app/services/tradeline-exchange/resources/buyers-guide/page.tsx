import type { Metadata } from "next";
import BuyersGuideClient from "./BuyersGuideClient";

export const metadata: Metadata = {
  title: "Tradeline Buyer's Guide: How to Choose | Creditor Academy",
  description: "Learn how to choose the right authorized user tradeline for your goals with this complete Tradeline Exchange Buyer's Guide.",
  keywords: "tradeline buyers guide, how to choose a tradeline, tradeline buying tips, creditor academy",
};

export default function BuyersGuidePage() {
  return <BuyersGuideClient />;
}
