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
                heading="Become Private, Operate Private And Private Credit"
                desc="Team training, compliance & onboarding. <br/> <span className='text-3xl font-bold text-blue-600'>$2,800</span> - Full access for teams and agencies"
                // buttonPath="/terms-and-conditions" //
            />
            <TnC/>
        </main>
    );
};
