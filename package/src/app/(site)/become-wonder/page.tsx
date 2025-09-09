import Herobanner from "@/app/components/shared/hero-banner";
import BecomeIntro from "@/app/components/become/cards";
import Intro2 from "@/app/components/become/intro";
import Content from "@/app/components/become/content";
import Appoint from "@/app/components/become/appointment";
import CTA from "@/app/components/shared/cta";
import Event from "@/app/components/Event";
import Pricing from "@/app/components/shared/plan";
import Script from "next/script";

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
                    bannerimage="/images/courses/become/freshman.webp"
                    heading="Become Private + Sovereignty 101"
                    desc="Reclaim Your <span>Legal Identity</span> and Exit the Public System."
                    // buttonPath="/course-tnc" // 👈 you now define the path here
                />
                <BecomeIntro />
                <Pricing />
                <Intro2 />
                <Appoint />
                <Content />
                <Event />
                {/* <Learn2 /> */}
                <CTA />
            </main>
        </>
    );
};
