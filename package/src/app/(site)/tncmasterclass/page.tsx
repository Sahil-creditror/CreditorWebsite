import MasterclassMembershipTC from "@/app/components/tncmasterclass/index";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Masterclass Terms & Conditions | Creditor Academy",
    description: "Review the specific terms and conditions that apply to Creditor Academy Masterclass membership enrollment.",
    keywords: "masterclass terms and conditions, masterclass policy, become private, operate private, financial freedom, creditor academy",
};

export default function Page() {
    return (
        <main>
            <MasterclassMembershipTC />
        </main>
    );
}