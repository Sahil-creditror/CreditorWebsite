import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "./components/home/hero";
import Courses from "./components/home/courses";

// Dynamic imports for below-the-fold components to improve initial load
const WebclassSection = dynamic(() => import("./components/home/webclass"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Offer = dynamic(() => import("./components/home/Offer"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Contact = dynamic(() => import("./components/home/contact"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Event = dynamic(() => import("./components/home/event"), {
  loading: () => <div className="min-h-[400px]" />,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Creditor Academy",
    alternates: {
        canonical: siteUrl,
    },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <StatsFacts /> */}
      {/* <Masterclass /> */}
      {/* <Aboutus /> */}
      {/* <About /> */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <WebclassSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Offer />
      </Suspense>
      {/* <PrivateTeaser /> */}
      {/* <MasterInfo /> */}
      <Courses />
      {/* <ThanksgivingPopup /> */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Contact contactdataNumber="4" />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Event />
      </Suspense>
      {/* <Roadmap /> */}
      {/* <Testimonial /> */}
      {/* <AnimatedTestimonialsDemo /> */}
      {/* <Game /> */}
      {/* <Team teamdataNumber="06" /> */}
      {/* <Commitment /> */}
      {/* <Pricing */}
      {/* <Faq /> */}
      {/* <Resources /> */}
    </>
  );
}
