import { Herobanner } from "@/app/components/shared/hero-banner";
import Courses from "@/app/components/courses";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Course Catalogs | Creditor Academy",
    description: "Explore Creditor Academy's course catalog featuring Become Private, Operate Private and Financial Freedom training programs.",
    keywords: "course catalog, creditor academy courses, become private, operate private, financial freedom, creditor academy",
};

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


