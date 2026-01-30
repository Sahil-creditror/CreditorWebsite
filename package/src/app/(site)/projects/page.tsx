import { Herobanner } from "@/app/components/shared/hero-banner";
import Intro from "@/app/components/masterclass/intro";
import Learn from "@/app/components/masterclass/learn";
import Get from "@/app/components/masterclass/getwithmaster";
import About from "@/app/components/masterclass/about";
import Appoint from "@/app/components/masterclass/appointment";
import CTA from "@/app/components/shared/cta";
import Event from "@/app/components/home/event";
import Join from "@/app/components/masterclass/Join";
import Preview from "@/app/components/masterclass/preview";
import Pricing from "@/app/components/shared/plan";
import Works from "@/app/components/masterclass/works";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Membership | Creditor",
    alternates: {
        canonical: `${siteUrl}/projects`,
    },
};

export default function Page() {
    const projects = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883842/creditor-website-assets/images/projects/banner/masterclass-banner.jpg"
                heading="Masterclass Membership"
                desc="Learn how to <span>set up your Trust</span>, your Private Identity, and Business Credit step-by-step."
                buttonPath="/tncmasterclass"
            />
            <Preview />
            {/* <Intro /> */}
            <Get />
            <Works />
            {/* <Pricing /> */}
            {/* <Learn /> */}
            {/* <Appoint /> */}
            {/* <Join /> */}
            {/* <About /> */}
            <Event />
            <CTA />
        </main>
    );
};
