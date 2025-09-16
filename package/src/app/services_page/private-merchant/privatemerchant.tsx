"use client";

import React from "react";
import HeroBanner from "@/app/components/shared/hero-banner";
import MerchantFeatures from "../components/MerchantFeatures";
import MerchantIntegrations from "../components/MerchantIntegrations";
import MerchantSteps from "../components/MerchantSteps";
import MerchantConclusion from "../components/MerchantConclusion";
import Contact from "@/app/components/shared/cta";
import PMPOffers from "../components/pmpOffer";

export function PrivateMerchant() {
  return (
    <>
      <HeroBanner
                bannerimage="/images/courses/become/junior.webp"
                heading="Operate Private"
                desc="Build <span> Wealth & Privacy Through </span> Private Business Structures"
                // buttonPath="/course-tnc"
            />
      {/* <MerchantHero ctaHref="" /> */}
      <MerchantFeatures />
      <MerchantIntegrations />
      <MerchantSteps />
      <MerchantConclusion />
      <PMPOffers/>
      <Contact />
    </>
  );
}

export default PrivateMerchant;


