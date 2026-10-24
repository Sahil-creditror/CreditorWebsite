import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import ModulesHub from "@/app/components/learning-paths/modules-hub";
import { getCoursePath } from "@/app/components/learning-paths/data";
import CTA from "@/app/components/shared/cta";

const course = getCoursePath("operate-private");


export const metadata: Metadata = pageMetadata("/operate-private");

export default function OperatePrivateHubPage() {
  return (
    <main>
      <Herobanner
        heading="Operate Private"
        desc="Operate trusts, PMAs, and real estate structures at a <span>professional level</span> — choose live lessons or recorded lectures."
        buttonPath="/masterclass-membership"
        buttonText="Join Membership"
      />
      <ModulesHub course={course} />
      <CTA />
    </main>
  );
}
