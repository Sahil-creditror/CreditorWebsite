import Herobanner from "@/app/components/shared/hero-banner";
import ReturnAndRefund from "@/app/components/return-and-refund";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Return & Refund | Creditor",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/ReturnRefund/banner.png"
                heading="Return & Refund"
                desc="Understand the <span>Rules & Guidelines</span> Before Using Our Services"
                buttonPath="/projects/become-private-Sovereignty 101" />
            <ReturnAndRefund />
        </main>
    );
};
