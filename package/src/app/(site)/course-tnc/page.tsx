import { Herobanner } from "@/app/components/shared/hero-banner";
import TnC from "@/app/components/shared/course-tnc";


import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
export const metadata: Metadata = pageMetadata("/course-tnc");

export default function Page() {
    const become = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="/images/courses/banner-tnc.webp"
                heading="Charge Your Card"
                desc="Reclaim Your <span>Lawful Identity</span> and Exit the Public System."
            // buttonPath="/terms-and-conditions" //
            />
            <TnC />
        </main>
    );
};
