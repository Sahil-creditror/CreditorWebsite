import BlogsPage from "@/app/components/Blogs"; // Added quotes and matched the export name
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Credit, Trusts & Financial Freedom Blog | Creditor Academy",
    description: "Explore expert blogs on Become Private, Operate Private & Financial Freedom from Creditor Academy.",
    keywords: "creditor academy blog, financial freedom articles, business trust tips, asset protection blog, become private, operate private, financial freedom, creditor academy",
    alternates: {
        canonical: `${siteUrl}/Blogs`,
    },
};

export default function Page() {
    return (
        <main>
            <BlogsPage />
        </main>
    );
}