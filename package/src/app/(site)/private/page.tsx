import React from 'react';
import Herobanner from '@/app/components/shared/hero-banner';
import Cards from '@/app/components/private/cards';
import CourseFeatures from '@/app/components/private/course-feature';
import CourseDetail from '@/app/components/private/course-detail';
import TenBusinesses from '@/app/components/private/ten-businesses';
import Contact from '@/app/components/private/contact';

const PrivatePage = () => {
  return (
    <div>
      <Herobanner
        heading="Private business credit"
        desc="Your gateway to <span>financial sovereignty</span>."
        bannerimage="/images/services/service-banner.webp"
        buttonPath="/"
        buttonText="Enroll Now"
      />
      <Cards />
      <CourseDetail />
      <CourseFeatures />
      <Contact />
      {/* <TenBusinesses /> */}
    </div>
  );
};

export default PrivatePage;
