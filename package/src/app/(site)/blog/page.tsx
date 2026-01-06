import BlogList from "@/app/components/blog/blog-list";
import Herobanner from "@/app/components/shared/hero-banner";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Blog | Creditor",
    alternates: {
        canonical: `${siteUrl}/blog`,
    },
};

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/blog/banner/blog_banner.webp"
                heading="Blog"
                desc="Excited to <span>begin something amazing?</span> Get in touch—we'd love to connect with you!" />    
                <BlogList/>
        </main>
    );
};
