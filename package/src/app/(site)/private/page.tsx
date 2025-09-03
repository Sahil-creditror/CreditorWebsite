import React from 'react';
import Herobanner from '@/app/components/shared/hero-banner';
import Cards from '@/app/components/private/cards'; // Import the Cards component
import CourseFeatures from '@/app/components/private/course-feature'; // Import the new CourseFeatures component
import CourseDetail from '@/app/components/private/course-detail';
import TenBusinesses from '@/app/components/private/ten-businesses';


const PrivatePage = () => {
  return (
    <div>
      <div className="relative">
        <Herobanner
          heading="Private business credit"
          desc="Your gateway to <span>financial sovereignty</span>."
          bannerimage="/images/services/service-banner.webp"
        />
        <a
          href="https://your-payment-gateway.com/enroll"
          target="_blank"
          rel="noopener noreferrer"
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out z-20"
        >
          Enroll Now
        </a>
      </div>
    <Cards/>
    <CourseDetail />
      <CourseFeatures /> {/* Add the CourseFeatures component here */}
      
      {/* <TenBusinesses /> */}
    </div>
  );
};

export default PrivatePage;
