import type { Metadata } from "next";
import GuaranteeClient from "./GuaranteeClient";

export const metadata: Metadata = {
  title: "Tradeline Posting Guarantee | Creditor Academy",
  description: "Learn about our tradeline posting guarantee and what happens if your tradeline doesn't post as expected.",
  keywords: "tradeline guarantee, tradeline posting guarantee, tradeline refund policy, creditor academy",
};

export default function GuaranteePage() {
  return <GuaranteeClient />;
}
