import { Herobanner } from "@/app/components/shared/hero-banner";
import Courses from "@/app/components/courses";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
export const metadata: Metadata = pageMetadata("/services/course-cataloges");

export default function Page() {
    return (
        <main>
            {/* <Herobanner
                bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883453/creditor-website-assets/images/courses/course-banner.webp"
                heading="Explore Our Premium Catalogs"
                desc="Learn Differently. Grow Distinctively. Become Private with Our Premium Catalogs." /> */}
            <Courses />
        </main>
    );
};


