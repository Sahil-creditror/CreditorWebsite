// app/services/website-service/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Website = dynamic(() => import('./Website').then(mod => ({ default: mod.Website })), {
  loading: () => <div className="min-h-screen" />,
});

export const metadata: Metadata = {
  title: "Website Services | Creditor Academy",
  description: "Get a professional website built for your private business or trust with Creditor Academy's website services.",
  keywords: "website services, private business website, business trust website design, creditor academy",
};

export default function WebsiteServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Website />
    </Suspense>
  );
}

