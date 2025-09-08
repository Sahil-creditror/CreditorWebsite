import Herobanner from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/become/cards";
import Intro2 from "@/app/components/become/intro";
import Content from "@/app/components/become/content";
import Appoint from "@/app/components/become/appointment";
import CTA from "@/app/components/shared/cta";
import Event from "@/app/components/Event";
import Pricing from "@/app/components/become/pricing";

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
                bannerimage="/images/courses/become/freshman.webp"
                heading="Become Private + Sovereignty 101"
                desc="Reclaim Your <span>Legal Identity</span> and Exit the Public System."
                buttonPath="/course-tnc" // 👈 you now define the path here
            />
            <BecomeIntro />
            <Pricing />
            <Intro2 />
            <Appoint />
            <Content />
            <Event />
            {/* <Learn2 /> */}
            <CTA />
        </main>
    );
};
