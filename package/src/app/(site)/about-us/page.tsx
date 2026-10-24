import AboutusDetail from "@/app/components/about/aboutus-detail";
import AboutusFullimg from "@/app/components/about/aboutus-fullimg";
import AboutusStats from "@/app/components/about/aboutus-stats";
import AboutusStory from "@/app/components/about/aboutus-story";
import AboutusMission from "@/app/components/about/aboutus-mission";
import AboutusValues from "@/app/components/about/aboutus-values";
import AboutusTeam from "@/app/components/about/aboutus-team";
import AboutusTestimonials from "@/app/components/about/aboutus-testimonials";
import Team from "@/app/components/home/team";
import { Herobanner } from "@/app/components/shared/hero-banner";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";



export const metadata: Metadata = pageMetadata("/about-us");

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883280/creditor-website-assets/images/about-us/banner/aboutus-banner1.png"
                heading="About us"
                desc="We create <span>transformative credit education</span> that drives real financial freedom."
            />
            <AboutusDetail />
            {/* <AboutusStory /> */}
            <AboutusMission />
            <AboutusValues />
            {/* <AboutusStats /> */}
            <AboutusTestimonials />
            <AboutusFullimg />
            <AboutusTeam />
            {/* <Team teamdataNumber="01" /> */}
        </main>
    );
};
