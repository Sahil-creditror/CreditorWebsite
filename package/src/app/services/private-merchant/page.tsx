import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const PrivateMerchant = dynamic(() => import('./privatemerchant').then(mod => ({ default: mod.PrivateMerchant })), {
  loading: () => <div className="min-h-screen" />,
});

export const metadata: Metadata = pageMetadata("/services/private-merchant");

export default function PrivateMerchantPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PrivateMerchant />
    </Suspense>
  );
}