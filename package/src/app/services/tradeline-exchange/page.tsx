// src/app/services/tradeline-exchange/page.js
// @ts-nocheck
import Hero from "@/app/services/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy & Sell Tradelines Exchange | Creditor Academy",
  description: "Buy or sell authorized user tradelines to boost credit scores. A trusted, verified tradeline marketplace by Creditor Academy.",
  keywords: "tradeline exchange, buy tradelines, sell tradelines, authorized user tradelines, creditor academy",
};

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
