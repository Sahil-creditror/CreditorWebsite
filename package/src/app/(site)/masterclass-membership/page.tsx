import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Herobanner } from "@/app/components/shared/hero-banner";
import CTA from "@/app/components/shared/cta";
import { Metadata } from "next";

// Eagerly load only the hero — everything else is below the fold
const Preview = dynamic(() => import("@/app/components/masterclass/preview"), {
  loading: () => <div className="min-h-[500px]" />,
});

const Get = dynamic(() => import("@/app/components/masterclass/getwithmaster"), {
  loading: () => <div className="min-h-[500px]" />,
});

const Works = dynamic(() => import("@/app/components/masterclass/works"), {
  loading: () => <div className="min-h-[400px]" />,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Membership | Creditor",
    alternates: {
        canonical: `${siteUrl}/masterclass-membership`,
    },
};

export default function Page() {
    return (
        <main>
            <Herobanner
                heading="Masterclass Membership"
                desc="Learn how to <span>set up your Trust</span>, your Private Identity, and Business Credit step-by-step."
                buttonPath="https://lmsathena.com/signup"
            />
            <Suspense fallback={<div className="min-h-[500px]" />}>
                <Preview />
            </Suspense>
            <Suspense fallback={<div className="min-h-[500px]" />}>
                <Get />
            </Suspense>
            <Suspense fallback={<div className="min-h-[400px]" />}>
                <Works />
            </Suspense>
            <CTA />
        </main>
    );
}
