"use client";

import React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSectionOne } from "../components/WebsiteHero"; // Hero section - keep as priority

// Dynamic imports for below-the-fold components
const Plan = dynamic(() => import("../components/pricingCard"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Template = dynamic(() => import("../components/template"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Appointment = dynamic(() => import("../components/appointment"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Table = dynamic(() => import("../components/fetaure"), {
  loading: () => <div className="min-h-[400px]" />,
});

const CardsCarouselSection = dynamic(() => import("./CardsCarouselSection").then(mod => ({ default: mod.CardsCarouselSection })), {
  loading: () => <div className="min-h-[400px]" />,
});

const WhyChoose = dynamic(() => import("../components/webchoose"), {
  loading: () => <div className="min-h-[400px]" />,
});

export function Website() {
  return (
    <>
      <HeroSectionOne />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Plan />
      </Suspense>
      {/* <WebsiteUpperSection /> */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Template />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Appointment />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Table 
          starterPrototypeLink="https://digi-market-simple.vercel.app/" 
          cadillacPrototypeLink="https://rhythmic-vibe.vercel.app/"
        />
      </Suspense>
      {/* <Suspense fallback={<div className="min-h-[400px]" />}>
        <CardsCarouselSection />
      </Suspense> */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <WhyChoose />
      </Suspense>
    </>
  );
}