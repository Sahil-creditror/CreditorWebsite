"use client"; // Add this at the top

import Herobanner from "@/app/components/operate/hero";
import BecomeIntro from "@/app/components/operate/card";
import Intro2 from "@/app/components/operate/intro";
import BusinessCardsGrid from "@/app/components/operate/business";
import Appointment from "@/app/components/operate/Appointment";

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/courses/become/junior.webp"
                heading="Operate Private"
                desc="Build Wealth & Privacy Through Private Business Structures"
            />
            <Intro2 />
            <BecomeIntro />
            <Appointment />
            <BusinessCardsGrid 
                onCta={() => { window.location.href = "/contact"; }}
            />           
        </main>
    ); 
}
