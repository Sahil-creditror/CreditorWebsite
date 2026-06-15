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
    title: "Webinar | Creditor",
};

export default function Page() {
    return (
        <main>
            <Webclass />
               <InstructorSection />

            <LearningSection />
            <WhyAttendSection />
            <FAQSection />
            <PresentationSection />
            <CTASection />
        </main>
    );
};
