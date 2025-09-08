
// import ProjectList from "@/app/components/projects";
import Herobanner from "@/app/components/shared/hero-banner";
import MasterclassMembershipTC from "@/app/components/tncmasterclass";

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
                 // 👈 you now define the path here
            />
            <MasterclassMembershipTC />
        </main>
    );
};
