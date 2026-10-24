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
                heading="Contact"
                desc="Ready to <span>start something</span> great? Reach out  we’d love to hear from you." />
            <Contact contactdataNumber="01" />
        </main>
    );
};
