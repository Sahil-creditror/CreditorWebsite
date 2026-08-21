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
    title: "Masterclass Membership | Join Now | Creditor Academy",
    description: "Unlock the Creditor Academy Masterclass: business trusts, asset protection, private credit and financial sovereignty training. Join now.",
    keywords: "masterclass membership, creditor academy membership, join creditor academy, become private, operate private, financial freedom",
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
