"use client";

import React from "react";
import MerchantHero from "../components/MerchantHero";
import MerchantFeatures from "../components/MerchantFeatures";
import MerchantIntegrations from "../components/MerchantIntegrations";
import MerchantSteps from "../components/MerchantSteps";
import MerchantConclusion from "../components/MerchantConclusion";
import Contact from "@/app/components/shared/cta";
import PMPOffers from "../components/pmpOffer";

export function PrivateMerchant() {
  return (
    <>
      <MerchantHero ctaHref="https://dashboard.elitepay.pro/form/creditor-academy-paulr-prevet" />
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


