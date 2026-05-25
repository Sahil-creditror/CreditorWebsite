"use client";

import CourseCard from "@/app/components/shared/CourseCard";
import {
  BECOME_PRIVATE_PATH,
  FINANCIAL_FREEDOM_PATH,
  OPERATE_PRIVATE_PATH,
} from "@/lib/coursePaths";

const CourseRoadmap: React.FC = () => {
  return (
    <section className="relative w-full mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 block dark:hidden"
        style={{ background: "linear-gradient(to bottom, #1e40af, #60a5fa)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{ background: "linear-gradient(to bottom, #0f172a, #334155)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:flex lg:justify-center">
          <div className="w-full max-w-sm">
            <CourseCard
              title="Become Private"
              image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp"
              subtitle="Reclaim Your Lawful Identity"
              description="Learn how to step out of the public and establish your affairs in the private."
              learnings={[
                "Status correction principles",
                "Remove from public jurisdiction",
                "Essential lawful documents",
                "Estate protection basics",
              ]}
              outcomes={[]}
              href={BECOME_PRIVATE_PATH}
            />
          </div>

          <div className="w-full max-w-sm">
            <CourseCard
              title="Operate Private"
              image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883858/creditor-website-assets/images/projects/projectlist/operate.webp"
              subtitle="Asset Protection & Business"
              description="Build, manage, and grow an Empire in the private, independent of the public system."
              learnings={[
                "Unincorporated Business Trusts",
                "Private Membership Associations",
                "Real estate in trusts",
                "Family legacy planning",
              ]}
              outcomes={[]}
              highlight
              href={OPERATE_PRIVATE_PATH}
            />
          </div>

          <div className="w-full max-w-sm">
            <CourseCard
              title="Financial Freedom"
              image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883854/creditor-website-assets/images/projects/projectlist/financial.webp"
              subtitle="200k with Vendors, Banks & Credit Unions"
              description="Build business credit through Unincorporated Business Trusts and private processing."
              learnings={[
                "Private Business Credit",
                "Personal Credit Repair",
                "Private Merchant Accounts",
                "Credit card stacking strategies",
              ]}
              outcomes={[]}
              href={FINANCIAL_FREEDOM_PATH}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseRoadmap;
