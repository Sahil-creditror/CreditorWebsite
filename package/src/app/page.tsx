import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import HeroSection from "./components/home/hero";
import LearningPathsSection from "./components/home/learning-paths-section";
import InstructorCredibility from "./components/home/instructor-credibility";
import MembershipBanner from "./components/home/membership-banner";
import HowLearningWorks from "./components/home/how-learning-works";
import FAQSection from "./components/home/faq-section";
import FinalCTA from "./components/home/final-cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = pageMetadata("/", {
  openGraph: {
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
    images: ["https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883571/creditor-website-assets/images/hero/Banner.png"],
  },
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Three Learning Paths */}
      <LearningPathsSection />

      {/* 3. Instructor & Credibility */}
      <InstructorCredibility />

      {/* 4. Membership Benefits */}
      <MembershipBanner />

      {/* 5. How Learning Works */}
      <HowLearningWorks />

      {/* 6. FAQs & Useful Resources */}
      <FAQSection />

      {/* 7. Final CTA */}
      <FinalCTA />
    </main>
  );
}
