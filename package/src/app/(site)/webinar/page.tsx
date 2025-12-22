//import Herobanner from "@/app/components/shared/hero-banner";
import Webclass from "@/app/components/webclass/hero";
import LearningSection from "@/app/components/webclass/secret";
import PresentationSection from "@/app/components/webclass/presentation";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Webinar | Creditor",
};

export default function Page() {
    return (
        <main>
            <Webclass />
            <LearningSection />
            <PresentationSection />
        </main>
    );
};
