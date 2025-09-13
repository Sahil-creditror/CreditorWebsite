import HeroBanner from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/operate/card";
import Intro2 from "@/app/components/operate/intro";
import BusinessCardsGrid from "@/app/components/operate/business";
import Appointment from "@/app/components/operate/Appointment";
import Contact from "@/app/components/shared/cta";
import Pricing from "@/app/components/shared/plan";
import Script from "next/script";
import HowItWorks from "@/app/components/operate/works";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Operate Private | Creditor",
};

export default function Page() {
    const operate = getAllProjects();
    return (
        <>
            <Script
                id="affiliate-manager"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function() {
      var t = document.createElement("script");
      t.type = "text/javascript", t.async = !0, t.src = 'https://link.msgsndr.com/js/am.js', t.onload = t.onreadystatechange = function() {
          var t = this.readyState;
          if (!t || "complete" == t || "loaded" == t) try {
            affiliateManager.init('psaD1vtsVB3b1PyW2P6i', 'https://backend.leadconnectorhq.com', '.www.creditoracademy.com')
          } catch (t) {}
      };
      var e = document.getElementsByTagName("script")[0];
      e.parentNode.insertBefore(t, e)
  })();`,
                }}
            />
        
            <main>
                <HeroBanner
                    bannerimage="/images/courses/become/junior.webp"
                    heading="Operate Private"
                    desc="Build <span> Wealth & Privacy Through </span> Private Business Structures"
                    // buttonPath="/course-tnc"
                />
                <Intro2 />
                <Pricing />
                <HowItWorks />
                <Appointment />
                <BecomeIntro />
                <Contact />
            </main>
        </>
    ); 
}
