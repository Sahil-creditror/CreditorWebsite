import Herobanner from "@/app/components/shared/hero-banner";
import Intro from "@/app/components/masterclass/intro";
import Learn from "@/app/components/masterclass/learn";
import Get from "@/app/components/masterclass/getwithmaster";
import About from "@/app/components/masterclass/about";
import Appoint from "@/app/components/masterclass/appointment";
import CTA from "@/app/components/shared/cta";
import Event from "@/app/components/Event";
import Join from "@/app/components/masterclass/Join";
import Preview from "@/app/components/masterclass/preview";

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
                desc="Learn how to <span>set up your Trust</span>, your Private Identity, and Business Credit step-by-step."
                buttonPath="/tncmasterclass" 
            />
            <Intro />
            <Preview />
            <Learn />
            <Appoint />
            <Join />
            <Get />
            <About />
            <Event />
            <CTA />
        </main>
    );
};
