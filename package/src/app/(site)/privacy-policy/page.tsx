import PrivacyPolicy from "@/app/components/privacy-policy";
import { Herobanner } from "@/app/components/shared/hero-banner";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Privacy Policy | Creditor Academy",
    description: "Read Creditor Academy's privacy policy to learn how we collect, use and protect your personal information.",
    keywords: "privacy policy, creditor academy data policy, become private, operate private, financial freedom, creditor academy",
};

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
