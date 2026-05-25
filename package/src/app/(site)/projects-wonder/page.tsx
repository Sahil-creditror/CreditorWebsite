import { Herobanner } from "@/app/components/shared/hero-banner";
import Intro from "@/app/components/masterclass/intro";
import Learn from "@/app/components/masterclass/learn";
import Get from "@/app/components/masterclass/getwithmaster";
import About from "@/app/components/masterclass/about";
import Appoint from "@/app/components/masterclass/appointment";
import CTA from "@/app/components/shared/cta";
// import Event from "@/app/components/home/event";
import Join from "@/app/components/masterclass/Join";
import Preview from "@/app/components/masterclass/preview";
import Pricing from "@/app/components/shared/plan";
import Script from "next/script";
import Works from "@/app/components/masterclass/works";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Membership | Creditor",
};

export default function Page() {
    const projects = getAllProjects();
    return (
        <>
            <Script
                id="wonderengine-affiliate"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(
                    function() {
                        var t = document.createElement("script");
                        t.type = "text/javascript";
                        t.async = true;
                        t.src = 'https://link.msgsndr.com/js/am.js';
                        t.onload = t.onreadystatechange = function() {
                        var tstate = this.readyState;
                        if (!tstate || tstate === "complete" || tstate === "loaded") {
                            try {
                            affiliateManager.init('psaD1vtsVB3b1PyW2P6i', 'https://backend.leadconnectorhq.com', '.www.creditoracademy.com');
                            } catch (e) {}
                        }
                        };
                        var e = document.getElementsByTagName("script")[0];
                        e.parentNode.insertBefore(t, e);
                    }
                    )();`,
                }}
            />
            <main>
                <Herobanner
                    bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883842/creditor-website-assets/images/projects/banner/masterclass-banner.jpg"
                    heading="Masterclass Membership"
                    desc="Learn how to <span>set up your Trust</span>, your Private Identity, and Business Credit step-by-step."
                    buttonPath="/tncmasterclass"
                />
                <Preview />
                <Get />
                {/* <Intro /> */}
                <Works />
                {/* <Pricing /> */}
                {/* <Learn /> */}
                {/* <Appoint /> */}
                {/* <Join /> */}
                {/* <About /> */}
                {/* <Event /> */}
                <CTA />
            </main>
        </>
    );
};
