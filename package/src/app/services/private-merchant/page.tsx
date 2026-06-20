import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const PrivateMerchant = dynamic(() => import('./privatemerchant').then(mod => ({ default: mod.PrivateMerchant })), {
  loading: () => <div className="min-h-screen" />,
});

export const metadata: Metadata = {
  title: "Private Merchant | Creditor Academy",
};

export default function PrivateMerchantPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PrivateMerchant />
    </Suspense>
  );
}