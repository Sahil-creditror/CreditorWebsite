import { Documentation } from "@/app/components/documentation/Documentation";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Documentation & Resources | Creditor Academy",
    description: "Access guides, templates and documentation to support your learning journey at Creditor Academy.",
    keywords: "creditor academy documentation, student resources, course guides, creditor academy",
    alternates: {
        canonical: `${siteUrl}/documentation`,
    },
};

export default function Page() {
    return (
        <>
        <Documentation/>
        </>
    );
};
