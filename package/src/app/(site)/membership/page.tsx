import MasterclassMembershipTC from "@/app/components/tncmasterclass";
import NewWorks from "@/app/components/membership/works";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Membership | Creditor",
};

export default function Page() {
    return (
        <main>
            <NewWorks />
            <MasterclassMembershipTC />
        </main>
    );
};

