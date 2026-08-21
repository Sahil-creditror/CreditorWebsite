import { Herobanner } from "@/app/components/shared/hero-banner";
import TermsAndCondition from "@/app/components/terms-and-condition";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Terms and Conditions | Creditor Academy",
    description: "Read the general terms and conditions governing use of the Creditor Academy website and services.",
    keywords: "terms and conditions, website service, course catalog, private merchant, financial freedom, creditor academy",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883934/creditor-website-assets/images/TnC/banner.jpg"
                heading="Terms & Conditions"
                desc="Understand the <span>Rules & Guidelines</span> Before Using Our Services" />
            <TermsAndCondition />

        </main>
    );
};
