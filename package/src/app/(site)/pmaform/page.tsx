
// import ProjectList from "@/app/components/projects";
import PMAForm from "@/app/components/pmaform";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "PMA Enrollment Form | Creditor Academy",
    description: "Complete the Creditor Academy PMA enrollment form to begin your Private Membership Association setup process.",
    keywords: "PMA form, PMA enrollment, private membership association registration, become private, operate private, financial freedom, creditor academy",
    alternates: {
        canonical: `${siteUrl}/pmaform`,
    },
};

export default function Page() {
    return (
        <main>
            <PMAForm />
        </main>
    );
};
