import { Documentation } from "@/app/components/documentation/Documentation";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";



export const metadata: Metadata = pageMetadata("/documentation");

export default function Page() {
    return (
        <>
        <Documentation/>
        </>
    );
};
