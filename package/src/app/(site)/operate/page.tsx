import Herobanner from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/operate/card";
import Intro2 from "@/app/components/operate/intro";
import BusinessCardsGrid from "@/app/components/operate/business";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Operate Private | Creditor",
};

export default function Page() {
    const become = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="/images/courses/become/junior.webp"
                heading="Operate Private"
                desc="Build Wealth & Privacy Through Private Business Structures" />
            <Intro2 />
            <BecomeIntro  />
            <BusinessCardsGrid />
            
        </main>
    ); 
};
