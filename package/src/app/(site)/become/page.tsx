import Herobanner from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/become/cards";
import Intro2 from "@/app/components/become/intro";
import Content from "@/app/components/become/content";
import Appoint from "@/app/components/become/appointment";
import CTA from "@/app/components/shared/cta";
import Event from "@/app/components/Event";
import Pricing from "@/app/components/shared/plan";
import HowItWorks from "@/app/components/become/works";
import FaqSection from "@/app/components/become/faq";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Become Private | Creditor",
};

export default function Page() {
    const become = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="/images/projects/projectlist/freshman.webp"
                heading="Become Private + Sovereignty 101"
                desc="Reclaim Your <span>Legal Identity</span> and Exit the Public System."
                buttonPath="/tncmasterclass" // 👈 you now define the path here
            />
            <Intro2 />
            {/* <Content /> */}
            <BecomeIntro />
            {/* <Pricing /> */}
            <HowItWorks />
            <FaqSection />
            <Appoint />
            <Event />
            {/* <Learn2 /> */}
            <CTA />
        </main>
    );
};
