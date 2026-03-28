import { Herobanner as HeroBanner } from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/operate/card";
import Intro2 from "@/app/components/operate/intro";
import BusinessCardsGrid from "@/app/components/operate/business";
import Appointment from "@/app/components/operate/Appointment";
import Contact from "@/app/components/shared/cta";
import Pricing from "@/app/components/shared/plan";
//import Event from '@/app/components/home/event';
import Event from "@/app/components/home/event";
import HowItWorks from "@/app/components/operate/works";
import FaqSection from "@/app/components/operate/faq";
import Cards from "@/app/components/operate/cards";

import WebinarBootcamp from "@/app/components/shared/WebinarBootcamp";
import { FaShieldAlt, FaChartLine, FaUserSecret } from "react-icons/fa";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Operate Private | Creditor",
};

export default function Page() {
    const operate = getAllProjects();
    return (
        <main>
            <HeroBanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883456/creditor-website-assets/images/courses/junior.jpg"
                heading="Operate Private"
                desc="Build Wealth & Privacy Through Private Business Structures"
                buttonPath="/signup"
            />
            <Intro2 />
            <WebinarBootcamp
                title="Operate Private"
                imageSrc="/images/webinar/operate/becomeoperate.webp"
                description="Master the art of operating your business in the private domain. Learn tactical strategies for asset protection, tax efficiency, and operational privacy in this exclusive live bootcamp."
                features={[
                    { title: "Tactical Operations", description: "Execute business maneuvers with precision and privacy.", iconName: "tactical" },
                    { title: "Asset Defense", description: "Fortify your wealth against external threats.", iconName: "shield" },
                    { title: "Private Banking", description: "Navigate the financial system on your own terms.", iconName: "banking" }
                ]}
            />
            <BecomeIntro />
            <Cards />



            {/* <Pricing /> */}
            <HowItWorks />
            <Appointment />
            <Event />
            {/* <BusinessCardsGrid /> */}
            {/* <FaqSection /> */}
            <Contact />
        </main>
    );
}
