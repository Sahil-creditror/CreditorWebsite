import React from 'react';
import Herobanner from '@/app/components/shared/hero-banner';
import Cards from '@/app/components/private/cards';
import CourseFeatures from '@/app/components/private/course-feature';
import CourseDetail from '@/app/components/private/course-detail';
import Contact from '@/app/components/shared/cta';
import Pricing from '@/app/components/shared/plan';
import Script from "next/script";

import { getAllProjects } from "@/lib/markdown";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Private Business | Creditor",
};

const PrivatePage = () => {
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
          heading="Private Business Credit"
          desc="Your gateway to <span>financial sovereignty</span>."
          bannerimage="/images/services/service-banner.webp"
          // buttonPath="/course-tnc"
        />
        <Cards />
        <Pricing />
        <CourseDetail />
        <CourseFeatures />
        <Contact />
      </main>
    </>
  );
};

export default PrivatePage;
