import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "./components/home/hero";

// Intro is lightweight but not above-the-fold on most viewports — load dynamically
const Intro = dynamic(() => import("./components/home/intro/page"), {
  loading: () => <div className="min-h-[200px]" />,
});

// Dynamic imports for all below-the-fold components to improve initial load
const Courses = dynamic(() => import("./components/home/courses"), {
  loading: () => <div className="min-h-[400px]" />,
});

const WebclassSection = dynamic(() => import("./components/home/webclass"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Offer = dynamic(() => import("./components/home/Offer"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Contact = dynamic(() => import("./components/home/contact"), {
  loading: () => <div className="min-h-[400px]" />,
});

const BootcampBanner = dynamic(() => import("./components/home/bootcamp-banner"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Event = dynamic(() => import("./components/home/event"), {
  loading: () => <div className="min-h-[400px]" />,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Become Private & Financial Sovereignty | Creditor Academy",
  description: "Learn business trusts, asset protection & private wealth strategies with Creditor Academy's Masterclass. Join students building financial freedom today.",
  keywords: "become private, operate private, financial sovereignty, business trust, asset protection, creditor academy",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Become Private & Financial Sovereignty | Creditor Academy",
    description: "Learn business trusts, asset protection & private wealth strategies with Creditor Academy's Masterclass. Join students building financial freedom today.",
    url: siteUrl,
    siteName: "Creditor Academy",
    images: [
      {
        url: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883571/creditor-website-assets/images/hero/Banner.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Become Private & Financial Sovereignty | Creditor Academy",
    description: "Learn business trusts, asset protection & private wealth strategies with Creditor Academy's Masterclass. Join students building financial freedom today.",
    images: ["https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883571/creditor-website-assets/images/hero/Banner.png"],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <Intro />
      {/* <Suspense fallback={<div className="min-h-[400px]" />}>
        <BootcampBanner />
      </Suspense> */}

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
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Courses />
      </Suspense>
      {/* <ThanksgivingPopup /> */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Contact contactdataNumber="4" />
      </Suspense>
      {/* <Suspense fallback={<div className="min-h-[400px]" />}>
        <Event />
      </Suspense> */}
      {/* <MasterclassEbook /> */}
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
