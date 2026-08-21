import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const PrivateMerchant = dynamic(() => import('./privatemerchant').then(mod => ({ default: mod.PrivateMerchant })), {
  loading: () => <div className="min-h-screen" />,
});

export const metadata: Metadata = {
  title: "Private Merchant Services | Creditor Academy",
  description: "Learn how to set up private merchant processing and payment solutions as part of operating your private business.",
  keywords: "private merchant services, private merchant account, private payment processing, creditor academy",
};

export default function PrivateMerchantPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PrivateMerchant />
    </Suspense>
  );
}