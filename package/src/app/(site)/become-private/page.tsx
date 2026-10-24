import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import ModulesHub from "@/app/components/learning-paths/modules-hub";
import { getCoursePath } from "@/app/components/learning-paths/data";
import CTA from "@/app/components/shared/cta";

const course = getCoursePath("become-private");


export const metadata: Metadata = pageMetadata("/become-private");

export default function BecomePrivateHubPage() {
  return (
    <main>
      <Herobanner
        heading="Become Private"
        desc="Master sovereignty principles, secured party creditor status, and <span>political status correction</span> — choose live lessons or recorded lectures."
        buttonPath="/masterclass-membership"
        buttonText="Join Membership"
      />
      <ModulesHub course={course} />
      <CTA />
    </main>
  );
}
