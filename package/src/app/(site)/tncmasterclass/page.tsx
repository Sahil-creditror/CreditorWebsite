
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
            {/* <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883842/creditor-website-assets/images/projects/banner/masterclass-banner.jpg"
                heading="Become Member"
                desc="Learn how to <span>set up your Trust</span>, your Private Identity, and Business Credit step-by-step."
                 // 👈 you now define the path here
            /> */}
            <MasterclassMembershipTC />
        </main>
    );
};
