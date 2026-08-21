//import Herobanner from "@/app/components/shared/hero-banner";
import Webclass from "@/app/components/webclass/hero";
import LearningSection from "@/app/components/webclass/secret";
import PresentationSection from "@/app/components/webclass/presentation";
import CTASection from "@/app/components/webclass/cta";
import InstructorSection from "@/app/components/webclass/intro";
import WhyAttendSection from "@/app/components/webclass/whyattend";
import FAQSection from "@/app/components/webclass/faq";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Free Webinar: Become & Operate Private | Creditor Academy",
    description: "Join Creditor Academy's free live webinar and learn the exact framework to step outside the public system and achieve financial sovereignty.",
    keywords: "free webinar, become private, operate private, financial freedom, financial sovereignty, creditor academy",
};

export default function Page() {
    return (
        <main>
            <Webclass />
            <InstructorSection />
            <PresentationSection />
            <FAQSection />
            <CTASection />

            <LearningSection />
            {/* <WhyAttendSection /> */}
        </main>
    );
};
