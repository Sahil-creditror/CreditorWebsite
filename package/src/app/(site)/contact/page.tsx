import Contact from "@/app/components/home/contact";
import { Herobanner } from "@/app/components/shared/hero-banner";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Contact Us | Support & Enrollment | Creditor Academy",
    description: "Have questions about our courses or membership? Contact Creditor Academy's team for guidance on trusts, credit and private wealth strategies.",
    keywords: "contact creditor academy, creditor academy phone number, creditor academy email, creditor academy",
    alternates: {
        canonical: `${siteUrl}/contact`,
    },
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883362/creditor-website-assets/images/contact/banner/you.jpg"
                heading="Contact"
                desc="Ready to <span>start something</span> great? Reach out  we’d love to hear from you." />
            <Contact contactdataNumber="01" />
        </main>
    );
};
