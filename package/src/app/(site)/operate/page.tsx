import HeroBanner from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/operate/card";
import Intro2 from "@/app/components/operate/intro";
import BusinessCardsGrid from "@/app/components/operate/business";
import Appointment from "@/app/components/operate/Appointment";
import Contact from "@/app/components/shared/cta";

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
                bannerimage="/images/courses/become/junior.webp"
                heading="Operate Private"
                desc="Build <span> Wealth & Privacy Through </span> Private Business Structures"
                buttonPath="/course-tnc"
            />
            <Intro2 />
            <BecomeIntro />
            <Appointment />
            <BusinessCardsGrid />
            <Contact />
        </main>
    ); 
}
