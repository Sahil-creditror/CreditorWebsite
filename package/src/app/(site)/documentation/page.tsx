import { Documentation } from "@/app/components/documentation/Documentation";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
    title: "Documentation | Creditor",
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
