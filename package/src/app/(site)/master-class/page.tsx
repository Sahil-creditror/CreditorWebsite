import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import { Herobanner } from "@/app/components/shared/hero-banner";
import ModulesHub from "@/app/components/learning-paths/modules-hub";
import { getCoursePath } from "@/app/components/learning-paths/data";
import CTA from "@/app/components/shared/cta";

const course = getCoursePath("master-class");


export const metadata: Metadata = pageMetadata("/master-class");

export default function MasterClassPage() {
  return (
    <main>
      <Herobanner
        heading="Master Class"
        desc="Build sovereignty, business trusts, credit systems, and <span>private financial infrastructure</span> — choose live lessons or recorded lectures."
        buttonPath="/masterclass-membership"
        buttonText="Join Membership"
      />
      <ModulesHub course={course} />
      <CTA />
    </main>
  );
}
