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
import { pageMetadata } from "@/lib/pageSeo";
export const metadata: Metadata = pageMetadata("/services/course-cataloges/become-private");

export default function Page() {
    return (
        <main>
            <Herobanner
                heading="Become Private: Status, Documents & Private Operations Bootcamp"
                desc="Step into <span>lawful standing</span>, master private declarations, and navigate operations with confidence."
                buttonText="View Become Private Curriculum & Enrollment"
                buttonPath="https://lmsathena.com/signup?course=become-private"
            />
            <Intro2 />
            <WebinarBootcamp
                title="Become Private"
                imageSrc="/images/webinar/become/bootcampbecome.webp"
                description="Step into your authority. This practical educational bootcamp guides you through lawful status correction frameworks, private documents, and operating with confidence."
                ctaText="View Become Private Curriculum & Enroll"
                ctaHref="https://lmsathena.com/signup?course=become-private"
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
