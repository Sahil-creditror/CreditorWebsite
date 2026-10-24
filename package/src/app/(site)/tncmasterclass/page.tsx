import MasterclassMembershipTC from "@/app/components/tncmasterclass/index";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";

export const metadata: Metadata = pageMetadata("/tncmasterclass");

export default function Page() {
    return (
        <main>
            <MasterclassMembershipTC />
        </main>
    );
}