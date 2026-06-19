import { Herobanner } from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/become/cards";
import Intro2 from "@/app/components/become/intro";
import Content from "@/app/components/become/content";
import Appoint from "@/app/components/become/appointment";
import CTA from "@/app/components/shared/cta";
// import Event from "@/app/components/home/event";
import Pricing from "@/app/components/shared/plan";
import Script from "next/script";
import HowItWorks from "@/app/components/become/works";
import FaqSection from "@/app/components/become/faq";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Become Private | Creditor",
};

export default function Page() {
    const become = getAllProjects();
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
                <Herobanner
                    bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883855/creditor-website-assets/images/projects/projectlist/freshman.jpg"
                    heading="Become Private"
                    desc="Reclaim Your <span>Lawful Identity</span> and Exit the Public System."
                    buttonPath="https://lmsathena.com/signup" // 👈 you now define the path here
                />
                <Intro2 />
                <Content />
                <BecomeIntro />
                {/* <Pricing /> */}
                <HowItWorks />
                <Appoint />
                {/* <Event /> */}
                {/* <Learn2 /> */}
                {/* <FaqSection /> */}
                <CTA />
            </main>
        </>
    );
};
