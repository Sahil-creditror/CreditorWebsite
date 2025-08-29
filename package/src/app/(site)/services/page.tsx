import Services from "@/app/components/home/pricing";
import Herobanner from "@/app/components/shared/hero-banner";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Services | Creditor",
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/services/service-banner.webp"
                heading="Services"
                desc="Ready to <span>start something</span> great? Reach out  we’d love to hear from you." />
            <Services />
        </main>
    );
};
