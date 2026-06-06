// app/services/website-service/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Website = dynamic(() => import('./Website').then(mod => ({ default: mod.Website })), {
  loading: () => <div className="min-h-screen" />,
});

export const metadata: Metadata = {
  title: "Website Creation | Creditor Academy",
};

export default function WebsiteServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Website />
    </Suspense>
  );
}

