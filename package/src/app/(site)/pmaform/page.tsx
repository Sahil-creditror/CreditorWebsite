
// import ProjectList from "@/app/components/projects";
import PMAForm from "@/app/components/pmaform";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "PMA Form | Creditor",
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
