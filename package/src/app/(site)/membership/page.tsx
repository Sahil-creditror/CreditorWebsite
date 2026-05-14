import NewWorks from "@/app/components/membership/works";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Membership | Creditor",
};

export default function Page() {
    return (
        <main>
            <NewWorks />
            <section className="py-20 text-center bg-lightgray dark:bg-darkblack">
                <div className="container">
                    <h2 className="mb-8">Ready to Join?</h2>
                    <Link 
                        href="/tncmasterclass" 
                        className="inline-flex items-center justify-center px-10 py-4 font-bold text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Create an Account
                    </Link>
                </div>
            </section>
        </main>
    );
};

