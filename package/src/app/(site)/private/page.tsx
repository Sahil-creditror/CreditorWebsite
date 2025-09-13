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
    title: "Private Business | Creditor",
};

const PrivatePage = () => {
  const become = getAllProjects();
  return (
    <div>
      <Herobanner
        heading="Private Business Credit"
        desc="Your gateway to <span>financial sovereignty</span>."
        bannerimage="/images/services/service-banner.webp"
        // buttonPath="/course-tnc"
      />
      <Cards />
      {/* <Pricing /> */}
      <HowItWorks />
      <CourseDetail />
      <Offer />
      <CourseFeatures />
      <Event />
      <Contact />
    </div>
  );
};

export default PrivatePage;
