//import Herobanner from "@/app/components/shared/hero-banner";
import Webclass from "@/app/components/webclass/hero";
import LearningSection from "@/app/components/webclass/secret";
import PresentationSection from "@/app/components/webclass/presentation";
import CTASection from "@/app/components/webclass/cta";
import InstructorSection from "@/app/components/webclass/intro";
import WhyAttendSection from "@/app/components/webclass/whyattend";
import FAQSection from "@/app/components/webclass/faq";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";

import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
export const metadata: Metadata = pageMetadata("/webinar");

export default function Page() {
    return (
        <>
            <Header />
            <main>
                <Webclass />
                <InstructorSection />
                <PresentationSection />
                <FAQSection />
                <CTASection />

                <LearningSection />
                {/* <WhyAttendSection /> */}
            </main>
            <Footer />
        </>
    );
};
