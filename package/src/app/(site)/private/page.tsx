import React from 'react';
import Herobanner from '@/app/components/shared/hero-banner';
import Cards from '@/app/components/private/cards';
import CourseFeatures from '@/app/components/private/course-feature';
import CourseDetail from '@/app/components/private/course-detail';
import Contact from '@/app/components/shared/cta';

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
        heading="Private business credit"
        desc="Your gateway to <span>financial sovereignty</span>."
        bannerimage="/images/services/service-banner.webp"
        buttonPath="/course-tnc"
      />
      <Cards />
      <CourseDetail />
      <CourseFeatures />
      <Contact />
    </div>
  );
};

export default PrivatePage;
