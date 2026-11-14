import Contact from "@/app/components/home/contact";
import { Herobanner } from "@/app/components/shared/hero-banner";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";



export const metadata: Metadata = pageMetadata("/contact");

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883362/creditor-website-assets/images/contact/banner/you.jpg"
                heading="Contact Creditor Academy"
                desc="Have questions about our <span>courses or membership</span>? Connect with our team — we typically respond within 1–2 business days." />
            <Contact contactdataNumber="01" />
        </main>
    );
};
