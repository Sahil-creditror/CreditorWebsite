
// import ProjectList from "@/app/components/projects";
import Herobanner from "@/app/components/shared/hero-banner";
import Roadmap from "@/app/components/home/services"
import Courses from "@/app/components/home/courses";
import Intro from "@/app/components/masterclass/intro";
import Learn from "@/app/components/masterclass/learn";
import Get from "@/app/components/masterclass/getwithmaster";
import About from "@/app/components/masterclass/about";
import Appoint from "@/app/components/masterclass/appointment";
import BecomeIntro from "@/app/components/become/cards";
import Intro2 from "@/app/components/become/intro";
import Learn2 from "@/app/components/become/learn";
import CTA from "@/app/components/become/cta";
import Content from "@/app/components/become/content";

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
                desc="Reclaim Your <span>Legal Identity</span> and Exit the Public System." />
            <BecomeIntro />
            <Intro2 />
            <Content />
            <Learn2 />
            <CTA />
            {/* <Intro />
            <Learn />
            <Appoint />
            {/* <Get />
            <Roadmap />
            <Courses />
            <About /> */}
            {/* <ProjectList />*/}
        </main>
    );
};
