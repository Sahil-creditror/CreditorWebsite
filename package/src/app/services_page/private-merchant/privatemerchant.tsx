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

export function PrivateMerchant() {
  return (
    <>
      <HeroBanner
        bannerimage="/images/services/pma-banner.webp"
        heading="Your Merchant Account"
        desc="Ditch the restrictions of mainstream processors. Get a fully underwritten <span>Private Merchant Account</span> with fast approvals."
        buttonPath="https://payments.creditoracademy.com/form/creditor-academy-paulr-referral"
      />
      <WhyAPMP />
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


