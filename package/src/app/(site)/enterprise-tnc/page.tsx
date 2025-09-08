import Herobanner from "@/app/components/shared/hero-banner";
import TnC from "@/app/components/enterprise-tnc";


import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Enterprise Plan | Creditor",
};

export default function Page() {
    const become = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="/images/courses/banner-tnc.webp"
                heading="Enterprise Plan"
                desc="Reclaim Your <span>Legal Identity</span> and Exit the Public System."
                // buttonPath="/terms-and-conditions" //
            />
            <TnC/>
        </main>
    );
};
