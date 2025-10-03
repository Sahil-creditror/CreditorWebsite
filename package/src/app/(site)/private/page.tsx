import React from 'react';
import Herobanner from '@/app/components/shared/hero-banner';
import Cards from '@/app/components/private/cards';
import CourseFeatures from '@/app/components/private/course-feature';
import CourseDetail from '@/app/components/private/course-detail';
import Contact from '@/app/components/shared/cta';
import Pricing from '@/app/components/shared/plan';
import Offer from '@/app/components/become/appointment';
import Event from '@/app/components/Event';
import HowItWorks from '@/app/components/private/works';

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Finacial Freedom | Creditor",
};

const PrivatePage = () => {
  const become = getAllProjects();
  return (
    <div>
      <Herobanner
        heading="Finacial Freedom"
        desc="Your gateway to financial sovereignty."
        bannerimage="/images/projects/banner/private.webp"
        buttonPath="/tncmasterclass"
      />
      <CourseDetail />
      <CourseFeatures />
      <Cards />
      {/* <Pricing /> */}
      <HowItWorks />
      <Offer />
      <Event />
      <Contact />
    </div>
  );
};

export default PrivatePage;
