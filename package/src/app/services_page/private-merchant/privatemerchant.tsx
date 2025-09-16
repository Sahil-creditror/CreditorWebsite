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
import Faq from "@/app/components/home/faq";
import Work from "../components/work";
import Feature from "../components/featuremp";

export function PrivateMerchant() {
  return (
    <>
      <HeroBanner
        bannerimage="/images/services/service-banner.webp"
        heading="Your Merchant Account"
        desc="Ditch the restrictions of mainstream processors. Get a fully underwritten <span>Private Merchant Account</span> with fast approvals."
        buttonPath="/contact"
      />
      {/* <MerchantHero /> */}
      <WhyAPMP />
      <Work/>
      {/* <PMPHowItWorks /> */}
      <TransparentPricingSnapshot/>
      {/* <PMPFeatures/> */}
      <Feature/>
      <PMPComparisonTable/>
      <Faq/>
      <Contact/>


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


