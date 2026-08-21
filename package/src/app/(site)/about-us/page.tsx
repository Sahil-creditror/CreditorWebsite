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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "About Us | Credit & Financial Freedom | Creditor Academy",
    description: "Meet the team behind Creditor Academy and learn our mission to make financial literacy and private wealth education accessible to everyone.",
    keywords: "about creditor academy, financial education company, credit coaching team, about us, become private, operate private, financial freedom, creditor academy",
    alternates: {
        canonical: `${siteUrl}/about-us`,
    },
};

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
