"use client";

import React from "react";
import HeroBanner from "@/app/components/shared/hero-banner";
import MerchantFeatures from "../components/MerchantFeatures";
import MerchantIntegrations from "../components/MerchantIntegrations";
import MerchantSteps from "../components/MerchantSteps";
import MerchantConclusion from "../components/MerchantConclusion";
import Contact from "@/app/components/shared/cta";
import PMPOffers from "../components/pmpOffer";
import WhyAPMP from "../components/WhyAPMP";
import MerchantHero from "../components/MerchantHero";
import TransparentPricingSnapshot from "../components/TransparentPricingSnapshot";
import PMPHowItWorks from "../components/PMPHowItWorks";
import PMPFeatures from "../components/PMPFeatures";
import PMPComparisonTable from "../components/PMPComparisonTable";
export function PrivateMerchant() {
  return (
    <>
      {/* <HeroBanner
                bannerimage="/images/courses/become/junior.webp"
                heading="Operate Private"
                desc="Build <span> Wealth & Privacy Through </span> Private Business Structures"
                // buttonPath="/course-tnc"
            /> */}
      <MerchantHero />
      <WhyAPMP />
      <PMPHowItWorks />
      <TransparentPricingSnapshot/>
      <PMPFeatures/>
      <PMPComparisonTable/>


      {/* <MerchantFeatures /> */}
      {/* <MerchantIntegrations /> */}
      {/* <MerchantSteps /> */}
      {/* <MerchantConclusion /> */}
      {/* <PMPOffers/> */}
      {/* <Contact /> */}
    </>
  );
}

export default PrivateMerchant;


