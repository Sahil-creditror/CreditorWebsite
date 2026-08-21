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

export const metadata: Metadata = {
  title: "Operate Private Syllabus: Trust & PMA | Creditor Academy",
  description: "Explore the full Operate Private syllabus: unincorporated business trusts, private membership associations and family legacy planning.",
  keywords: "operate private, operate private syllabus, business trust course, PMA training curriculum, creditor academy",
};

export default function Page() {
  getAllProjects();
  return (
    <main>
      <HeroBanner
        heading="Operate Private"
        desc="Build <span>Wealth & Privacy</span> Through Private Business Structures"
        buttonPath="https://lmsathena.com/signup"
      />
      <Intro2 />
      <WebinarBootcamp
        title="Operate Private"
        imageSrc="/images/webinar/operate/becomeoperate.webp"
        description="Master the art of operating your business in the private domain. Learn tactical strategies for asset protection, tax efficiency, and operational privacy in this exclusive live bootcamp."
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
