import MasterclassMembershipTC from "@/app/components/tncmasterclass/index";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Membership | Creditor",
};

export default function Page() {
    return (
        <main>
            <MasterclassMembershipTC />
        </main>
    );
}