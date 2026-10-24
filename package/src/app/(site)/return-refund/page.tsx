import { Herobanner } from "@/app/components/shared/hero-banner";
import ReturnAndRefund from "@/app/components/return-and-refund";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
export const metadata: Metadata = pageMetadata("/return-refund");

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883862/creditor-website-assets/images/ReturnRefund/banner.jpg"
                heading="Return & Refund"
                desc="Understand the <span>Rules & Guidelines</span> Before Using Our Services"
            // buttonPath="/projects/become-private-Sovereignty 101" 
            />
            <ReturnAndRefund />
        </main>
    );
};
