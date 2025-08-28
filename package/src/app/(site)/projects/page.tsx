
// import ProjectList from "@/app/components/projects";
import Herobanner from "@/app/components/shared/hero-banner";
import Roadmap from "@/app/components/home/services"
import Courses from "@/app/components/home/courses";
import Intro from "@/app/components/masterclass/intro";
import Learn from "@/app/components/masterclass/learn";
import Get from "@/app/components/masterclass/getwithmaster";
import About from "@/app/components/masterclass/about";
import Appoint from "@/app/components/masterclass/appointment";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Membership | Creditor",
};

export default function Page() {
    const projects = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="/images/projects/banner/masterclass-banner.png"
                heading="Masterclass Membership"
                desc="Learn how to <span>set up your Trust</span>, your Private Identity, and Business Credit step-by-step." />
            <Intro />
            <Learn />
            <Appoint />
            {/* <Get />
            <Roadmap />
            <Courses /> */}
            <About />
            {/* <ProjectList />*/}
        </main>
    );
};
