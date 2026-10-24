import PrivacyPolicy from "@/app/components/privacy-policy";
import { Herobanner } from "@/app/components/shared/hero-banner";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
export const metadata: Metadata = pageMetadata("/privacy-policy");

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883818/creditor-website-assets/images/privacy-policy/newbanner.jpg"
                heading="Privacy Policy"
                desc="Understand the <span>Rules & Guidelines</span> Before Using Our Services" />
            <PrivacyPolicy />
        </main>
    );
};
