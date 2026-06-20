"use client";

import React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Herobanner as HeroBanner } from "@/app/components/shared/hero-banner"; // Keep hero as priority

// Dynamic imports for below-the-fold components
const WhyAPMP = dynamic(() => import("../components/WhyAPMP"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Feature = dynamic(() => import("../components/featuremp"), {
  loading: () => <div className="min-h-[400px]" />,
});

const TransparentPricingSnapshot = dynamic(() => import("../components/TransparentPricingSnapshot"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Work = dynamic(() => import("../components/work"), {
  loading: () => <div className="min-h-[400px]" />,
});

const PMPComparisonTable = dynamic(() => import("../components/PMPComparisonTable"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Faq = dynamic(() => import("@/app/components/home/faq"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Contact = dynamic(() => import("@/app/components/shared/cta"), {
  loading: () => <div className="min-h-[400px]" />,
});

// import PrivateMerchantBanner from "../components/private-merchant";

export function PrivateMerchant() {
  return (
    <>
      <HeroBanner
        bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883879/creditor-website-assets/images/services/pma-banner.jpg"
        heading="Your Merchant Account"
        desc="Ditch the restrictions of mainstream processors. Get a fully underwritten <span>Private Merchant Account</span> with fast approvals."
        buttonPath="/pmaform"
      />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <WhyAPMP />
      </Suspense>
      {/* <PrivateMerchantBanner 
        imageSrc="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883881/creditor-website-assets/images/services/pmabanner.webp"
      /> */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Feature />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <TransparentPricingSnapshot />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Work />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <PMPComparisonTable />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Faq />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Contact />
      </Suspense>
    </>
  );
}

export default PrivateMerchant;


