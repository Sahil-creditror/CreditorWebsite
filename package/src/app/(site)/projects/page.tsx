import Herobanner from "@/app/components/shared/hero-banner";
import Intro from "@/app/components/masterclass/intro";
import Learn from "@/app/components/masterclass/learn";
import Get from "@/app/components/masterclass/getwithmaster";
import About from "@/app/components/masterclass/about";
import Appoint from "@/app/components/masterclass/appointment";
import CTA from "@/app/components/shared/cta";
import Event from "@/app/components/Event";
import Join from "@/app/components/masterclass/Join";
import Preview from "@/app/components/masterclass/preview";
import Pricing from "@/app/components/shared/plan";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Membership | Creditor",
};

export default function Page() {
    const projects = getAllProjects();
    return (
        <main>
            {/* Added script here */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `(function() {
                        var t = document.createElement("script");
                        t.type = "text/javascript", t.async = !0, t.src = 'https://link.msgsndr.com/js/am.js', t.onload = t.onreadystatechange = function() {
                            var t = this.readyState;
                            if (!t || "complete" == t || "loaded" == t) try {
                                affiliateManager.init('psaD1vtsVB3b1PyW2P6i', 'https://backend.leadconnectorhq.com', '.creditoracademy.com')
                            } catch (t) {}
                        };
                        var e = document.getElementsByTagName("script")[0];
                        e.parentNode.insertBefore(t, e)
                    })();`
                }}
            />
            
            <Herobanner
                bannerimage="/images/projects/banner/masterclass-banner.png"
                heading="Masterclass Membership"
                desc="Learn how to <span>set up your Trust</span>, your Private Identity, and Business Credit step-by-step."
                // buttonPath="/tncmasterclass" 
            />
            <Intro />
            <Pricing />
            <Preview />
            <Learn />
            <Appoint />
            <Join />
            <Get />
            <About />
            <Event />
            <CTA />
        </main>
    );
};