import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/app/components/home/pricing"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Herobanner = dynamic(() => import("@/app/components/shared/hero-banner"), {
  loading: () => <div className="min-h-[300px]" />,
});

export const metadata: Metadata = {
    title: "Services | Creditor",
};

export default function Page() {
    return (
        <main>
            <Suspense fallback={<div className="min-h-[300px]" />}>
                <Herobanner
                    bannerimage="/images/services/service-banner.webp"
                    heading="Creditor Academy Services"
                    desc="Ready to <span>start something</span> great? Reach out  we'd love to hear from you." />
            </Suspense>
            <Suspense fallback={<div className="min-h-[400px]" />}>
                <Services />
            </Suspense>
        </main>
    );
};
