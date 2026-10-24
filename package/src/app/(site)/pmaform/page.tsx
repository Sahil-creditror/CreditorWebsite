
// import ProjectList from "@/app/components/projects";
import PMAForm from "@/app/components/pmaform";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";



export const metadata: Metadata = pageMetadata("/pmaform");

export default function Page() {
    return (
        <main>
            <PMAForm />
        </main>
    );
};
