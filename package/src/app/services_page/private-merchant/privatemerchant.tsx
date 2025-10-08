"use client";

import React from "react";
import HeroBanner from "@/app/components/shared/hero-banner";
import Contact from "@/app/components/shared/cta";
import WhyAPMP from "../components/WhyAPMP";
import TransparentPricingSnapshot from "../components/TransparentPricingSnapshot";
import PMPComparisonTable from "../components/PMPComparisonTable";
import Faq from "@/app/components/home/faq";
import Work from "../components/work";
import Feature from "../components/featuremp";
// import PrivateMerchantBanner from "../components/private-merchant";

export function PrivateMerchant() {
  return (
    <>
      <HeroBanner
        bannerimage="/images/services/pma-banner.webp"
        heading="Your Merchant Account"
        desc="Ditch the restrictions of mainstream processors. Get a fully underwritten <span>Private Merchant Account</span> with fast approvals."
        buttonPath="/pmaform"
      />
      <WhyAPMP />
      {/* <PrivateMerchantBanner 
        imageSrc="/images/services/pmabanner.webp"
      /> */}
      <Feature/>
      <TransparentPricingSnapshot/>
      <Work/>
      <PMPComparisonTable/>
      <Faq/>
      <Contact/>
    </>
  );
}

export default PrivateMerchant;


