import Herobanner from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/become/cards";
import Intro2 from "@/app/components/become/intro";
import Learn2 from "@/app/components/become/learn";
import Content from "@/app/components/become/content";
import Appoint from "@/app/components/become/appointment";
import CTA from "@/app/components/become/cta";

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
                heading="Become Private + SOV101"
                desc="Reclaim Your <span>Legal Identity</span> and Exit the Public System."
                buttonPath="/projects/become-private-sov101" // 👈 you now define the path here
            />
            <BecomeIntro />
            <Intro2 />
            <Appoint />
            <Content />
            {/* <Learn2 /> */}
            <CTA />
        </main>
    );
};
