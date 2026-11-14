import { Herobanner as HeroBanner } from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/operate/card";
import Intro2 from "@/app/components/operate/intro";
import Appointment from "@/app/components/operate/Appointment";
import Contact from "@/app/components/shared/cta";
// import Event from "@/app/components/home/event";
import HowItWorks from "@/app/components/operate/works";
import Cards from "@/app/components/operate/cards";

import WebinarBootcamp from "@/app/components/shared/WebinarBootcamp";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";

export const metadata: Metadata = pageMetadata("/services/course-cataloges/operate-private");

export default function Page() {
  getAllProjects();
  return (
    <main>
      <HeroBanner
        heading="Operate Private Bootcamp: Business Trusts, PMAs & Legacy Planning"
        desc="Build <span>Wealth & Privacy</span> through lawful business trusts, private membership associations, and structured banking."
        buttonText="Get Operate Private Course Details"
        buttonPath="https://lmsathena.com/signup?course=operate-private"
      />
      <Intro2 />
      <WebinarBootcamp
        title="Operate Private"
        imageSrc="/images/webinar/operate/becomeoperate.webp"
        description="Master the educational foundations of operating your enterprise in the private domain. Learn structured frameworks for business trusts, PMAs, asset protection, and operational privacy."
        ctaText="Get Operate Private Course Details"
        ctaHref="https://lmsathena.com/signup?course=operate-private"
        features={[
          { title: "Tactical Operations", description: "Execute business maneuvers with precision and privacy.", iconName: "tactical" },
          { title: "Asset Defense", description: "Fortify your wealth against external threats.", iconName: "shield" },
          { title: "Private Banking", description: "Navigate the financial system on your own terms.", iconName: "banking" },
        ]}
      />
      <BecomeIntro />
      <Cards />
      <HowItWorks />
      <Appointment />
      {/* <Event /> */}
      <Contact />
    </main>
  );
}
