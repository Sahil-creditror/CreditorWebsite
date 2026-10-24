// src/app/services/tradeline-exchange/page.js
// @ts-nocheck
import Hero from "@/app/services/components/Hero";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange");

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
