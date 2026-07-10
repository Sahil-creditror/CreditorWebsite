import { Herobanner } from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/become/cards";

import Intro2 from "@/app/components/become/intro";
import Content from "@/app/components/become/content";
import Appoint from "@/app/components/become/appointment";
import CTA from "@/app/components/shared/cta";
// import Event from "@/app/components/home/event";
import Pricing from "@/app/components/shared/plan";
import HowItWorks from "@/app/components/become/works";
import FaqSection from "@/app/components/become/faq";

import WebinarBootcamp from "@/app/components/shared/WebinarBootcamp";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Become Private | Creditor",
};

export default function Page() {
    return (
        <main>
            <Herobanner
               
                heading="Become Private"
                desc="Reclaim Your <span>Lawful Identity</span> and Exit the Public System."
                buttonPath="https://lmsathena.com/signup" // 👈 you now define the path here
            />
            <Intro2 />
            <WebinarBootcamp
                title="Become Private"
                imageSrc="/images/webinar/become/bootcampbecome.webp"
                description="Step into your authority. This elite bootcamp guides you through the process of status correction and reclaiming your sovereignty in a world of conformity."
                features={[
                    { title: "Status Correction", description: "Reclaim your lawful standing and identity.", iconName: "status" },
                    { title: "Elite Authority", description: "Command respect and operate with supreme confidence.", iconName: "crown" },
                    { title: "Sovereign Mindset", description: "Break free from the public matrix.", iconName: "mindset" }
                ]}
            />
            <Content />
            {/* <BecomeIntro /> */}



            {/* <Pricing /> */}
            <HowItWorks />
            <Appoint />
            {/* <Event /> */}
            {/* <Learn2 /> */}
            {/* <FaqSection /> */}
            <CTA />
        </main>
    );
};
