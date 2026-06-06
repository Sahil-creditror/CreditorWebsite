import { Herobanner } from "@/app/components/shared/hero-banner";
import Cards from "@/app/components/private/cards";
import CourseFeatures from "@/app/components/private/course-feature";
import CourseDetail from "@/app/components/private/course-detail";
import Contact from "@/app/components/shared/cta";
import Offer from "@/app/components/become/appointment";
// import Event from "@/app/components/home/event";
import HowItWorks from "@/app/components/private/works";

import WebinarBootcamp from "@/app/components/shared/WebinarBootcamp";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Freedom | Creditor",
};

export default function FinancialFreedomPage() {
  getAllProjects();
  return (
    <main>
      <Herobanner
        heading="Financial Freedom"
        desc="Your gateway to financial sovereignty."
        bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/f_webp,q_80,w_1920,c_limit/v1768883838/creditor-website-assets/images/projects/banner/financial.png"
        buttonPath="/tncmasterclass"
      />
      <CourseDetail />
      <WebinarBootcamp
        title="Financial Freedom"
        imageSrc="/images/webinar/financial/financial.webp"
        description="Unlock the secrets to true financial independence. This bootcamp reveals the strategies used by the wealthy to build, protect, and grow assets outside the traditional system."
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
