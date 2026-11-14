import { Herobanner } from "@/app/components/shared/hero-banner";
import Cards from "@/app/components/private/cards";
import CourseFeatures from "@/app/components/private/course-feature";
import CourseDetail from "@/app/components/private/course-detail";
import Contact from "@/app/components/shared/cta";
import Offer from "@/app/components/private/appointment";
// import Event from "@/app/components/home/event";
import HowItWorks from "@/app/components/private/works";

import WebinarBootcamp from "@/app/components/shared/WebinarBootcamp";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";

export const metadata: Metadata = pageMetadata("/services/course-cataloges/financial-freedom");

export default function FinancialFreedomPage() {
  getAllProjects();
  return (
    <main>
      <Herobanner
        heading="Financial Freedom Bootcamp: Business and Personal Credit Education"
        desc="Your gateway to <span>credit structuring</span>, debt elimination education, and commercial banking foundations."
        buttonText="View Financial Freedom Curriculum & Enroll"
        buttonPath="https://lmsathena.com/signup?course=financial-freedom"
      />
      <CourseDetail />
      <WebinarBootcamp
        title="Financial Freedom"
        imageSrc="/images/webinar/financial/financial.webp"
        description="Discover practical strategies for credit structuring, commercial funding preparation, and lawful asset growth with step-by-step guidance."
        ctaText="View Financial Freedom Curriculum & Enroll"
        ctaHref="https://lmsathena.com/signup?course=financial-freedom"
        features={[
          { title: "Wealth Systems", description: "Automated frameworks for consistent growth.", iconName: "wealth" },
          { title: "Private Investing", description: "Access high-yield opportunities hidden from the public.", iconName: "investing" },
          { title: "Legacy Building", description: "Construct inter-generational wealth that lasts.", iconName: "legacy" },
        ]}
      />
      <CourseFeatures />
      <Cards />
      <HowItWorks />
      <Offer />
      {/* <Event /> */}
      <Contact />
    </main>
  );
}
