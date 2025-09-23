
// import ProjectList from "@/app/components/projects";
import PMAForm from "@/app/components/pmaform";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "PMA Form | Creditor",
};

export default function Page() {
    return (
        <main>
            <PMAForm />
        </main>
    );
};
