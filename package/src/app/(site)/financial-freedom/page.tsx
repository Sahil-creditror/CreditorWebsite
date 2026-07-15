import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import LearningPathHub from "@/app/components/learning-paths/hub";
import { getCoursePath } from "@/app/components/learning-paths/data";
import CTA from "@/app/components/shared/cta";

const course = getCoursePath("financial-freedom");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Financial Freedom | Creditor Academy",
  description: course.description,
  alternates: { canonical: `${siteUrl}${course.hubPath}` },
};

export default function FinancialFreedomHubPage() {
  return (
    <main>
      <Herobanner
        heading="Financial Freedom"
        desc="Court remedies, business credit mastery, and <span>PMA-based independence</span> — choose live lessons or recorded lectures."
        buttonPath="/masterclass-membership"
        buttonText="Join Membership"
      />
      <LearningPathHub course={course} />
      <CTA />
    </main>
  );
}
