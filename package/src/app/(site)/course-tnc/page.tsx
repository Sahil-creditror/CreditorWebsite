import { Herobanner } from "@/app/components/shared/hero-banner";
import TnC from "@/app/components/shared/course-tnc";


import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Enroll Course | Terms & Conditions | Creditor Academy",
    description: "Review the terms and conditions applicable to all Creditor Academy course purchases and enrollments.",
    keywords: "course terms and conditions, creditor academy, course policy",
};

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
