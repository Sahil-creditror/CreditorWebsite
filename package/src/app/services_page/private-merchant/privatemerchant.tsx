"use client";

import React from "react";
import MerchantHero from "../components/MerchantHero";
import MerchantFeatures from "../components/MerchantFeatures";
import MerchantIntegrations from "../components/MerchantIntegrations";
import MerchantSteps from "../components/MerchantSteps";
import MerchantConclusion from "../components/MerchantConclusion";
import Contact from "@/app/components/shared/cta";

export function PrivateMerchant() {
  return (
    <>
      <MerchantHero />
      <MerchantFeatures />
      <MerchantIntegrations />
      <MerchantSteps />
      <MerchantConclusion />
      <Contact />
    </>
  );
}

export default PrivateMerchant;


