import Herobanner from "@/app/components/shared/hero-banner";
import TnC from "@/app/components/shared/course-tnc";


import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Enroll Course | Creditor",
};

export default function Page() {
    const become = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="/images/courses/banner-tnc.webp"
                heading="Course Enrollment"
                desc="Reclaim Your <span>Legal Identity</span> and Exit the Public System."
                // buttonPath="/terms-and-conditions" //
            />
            <TnC/>
        </main>
    );
};
