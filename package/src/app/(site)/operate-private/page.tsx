import { Metadata } from "next";
import { Herobanner } from "@/app/components/shared/hero-banner";
import LearningPathHub from "@/app/components/learning-paths/hub";
import { getCoursePath } from "@/app/components/learning-paths/data";
import CTA from "@/app/components/shared/cta";

const course = getCoursePath("operate-private");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  title: "Operate Private | Creditor Academy",
  description: course.description,
  alternates: { canonical: `${siteUrl}${course.hubPath}` },
};

export default function OperatePrivateHubPage() {
  return (
    <main>
      <Herobanner
        heading="Operate Private"
        desc="Operate trusts, PMAs, and real estate structures at a <span>professional level</span> — choose live lessons or recorded lectures."
        buttonPath="/masterclass-membership"
        buttonText="Join Membership"
      />
      <LearningPathHub course={course} />
      <CTA />
    </main>
  );
}
