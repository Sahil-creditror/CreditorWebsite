import React from 'react';
import Herobanner from '@/app/components/shared/hero-banner';
import Cards from '@/app/components/private/cards'; // Import the Cards component
import CourseFeatures from '@/app/components/private/course-feature'; // Import the new CourseFeatures component
import CourseDetail from '@/app/components/private/course-detail';
import TenBusinesses from '@/app/components/private/ten-businesses';

const PrivatePage = () => {
  return (
    <div>
      <Herobanner 
        heading="Private business credit"
        desc="Your gateway to <span>financial sovereignty</span>."
        bannerimage="/images/services/service-banner.webp"
      />
    <Cards/>
    <CourseDetail />
      <CourseFeatures /> {/* Add the CourseFeatures component here */}
      <TenBusinesses />
    </div>
  );
};

export default PrivatePage;
