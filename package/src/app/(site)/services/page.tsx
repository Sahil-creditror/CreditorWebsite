import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/app/components/home/pricing"), {
    loading: () => <div className="min-h-[400px]" />,
});

const Herobanner = dynamic(() => import("@/app/components/shared/hero-banner").then(mod => mod.Herobanner), {
    loading: () => <div className="min-h-[300px]" />,
});

export const metadata: Metadata = {
    title: "Our Services | Creditor Academy",
    description: "Explore Creditor Academy's full range of services: course catalogs, live classes, website services and the Tradeline Exchange.",
    keywords: "creditor academy services, business services, website service, course catalog, private merchant, become private, operate private, financial freedom, creditor academy",
};

export default function Page() {
    return (
        <main>
            <Suspense fallback={<div className="min-h-[300px]" />}>
                <Herobanner
                    bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883893/creditor-website-assets/images/services/service-banner.jpg"
                    heading="Creditor Academy Services"
                    desc="Ready to <span>start something</span> great? Reach out  we'd love to hear from you." />
            </Suspense>
            <Suspense fallback={<div className="min-h-[400px]" />}>
                <Services />
            </Suspense>
        </main>
    );
};
