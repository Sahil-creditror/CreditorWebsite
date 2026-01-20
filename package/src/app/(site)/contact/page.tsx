import Contact from "@/app/components/home/contact";
import Herobanner from "@/app/components/shared/hero-banner";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Contact | Creditor",
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
            <Contact contactdataNumber="01"/>
        </main>
    );
};
