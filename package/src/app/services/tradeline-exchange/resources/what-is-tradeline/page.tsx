import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import WhatIsTradelineClient from "./WhatIsTradelineClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/resources/what-is-tradeline");

export default function WhatIsTradelinePage() {
  return <WhatIsTradelineClient />;
}
