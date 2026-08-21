import type { Metadata } from "next";
import WhatIsTradelineClient from "./WhatIsTradelineClient";

export const metadata: Metadata = {
  title: "What Is a Tradeline? | Creditor Academy",
  description: "Learn what a tradeline is, how authorized user tradelines work, and how they can impact your credit score.",
  keywords: "what is a tradeline, tradeline definition, authorized user tradeline explained, creditor academy",
};

export default function WhatIsTradelinePage() {
  return <WhatIsTradelineClient />;
}
