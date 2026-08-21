import { Herobanner } from "@/app/components/shared/hero-banner";
import TnC from "@/app/components/enterprise-tnc";


import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Become & Operate Private, Build Credit | Creditor Academy",
    description: "Review the terms and conditions governing Creditor Academy's enterprise and business partnership programs.",
    keywords: "enterprise terms and conditions, creditor academy business forms, become private, operate private, financial freedom, creditor freedom",
};

export default function Page() {
    const become = getAllProjects();
    return (
        <main>
            <Herobanner
                bannerimage="/images/courses/banner-tnc.webp"
                heading="Become Private, Operate Private And Private Credit"
                desc="Access to all Catalogs"
            // buttonPath="/terms-and-conditions" //
            />
            <TnC />
        </main>
    );
};
