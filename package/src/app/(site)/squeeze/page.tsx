import Image from "next/image";
import SqueezeEmbed from "@/app/components/squeeze/Embed";
import Marquee from "@/app/components/squeeze/Marquee";

export const metadata = {
    title: "Creditor Academy — Free Guide",
    description: "Discover how to restore credit, operate private, and protect your estate.",
};

export default function Page() {
    return (
        <main className="relative">
            <section className="relative bg-lightgray py-10 md:py-25">
                <div className="container">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_.9fr] md:items-center">
                        <div className="order-1 md:order-1">
                            {/* <div className="mb-3">
                                <Image src="/images/event/event11.webp" alt="Creditor Academy Event" width={200} height={200} className="w-full h-auto rounded-xl" />
                            </div> */}
                            <h2 className="pt-10 md:pt-0 text-secondary dark:text-white">
                                Creditor Academy <span className="text-primary">Private Commerce Masterclass</span>
                            </h2>
                            <p className="mt-4 max-w-2xl text-secondary/80 dark:text-white/80">
                                Reserve your spot for our no‑fluff session on how to restore credit, operate private, and protect your estate the Creditor Academy way.
                            </p>
                            <div className="mt-6">
                                <p className="font-semibold text-secondary dark:text-white">In this session, you’ll learn how to:</p>
                                <ul className="mt-3 list-disc space-y-2 pl-6 text-secondary/80 dark:text-white/80">
                                    <li>Structure your foundation to operate private and stay in control</li>
                                    <li>Structure your affairs to <span className="font-semibold text-secondary dark:text-white">operate private</span> and stay in control</li>
                                    <li>Protect your estate — <span className="font-semibold text-primary">protect what you build, pass on what matters</span></li>
                                </ul>
                                <p className="font-semibold text-secondary dark:text-white pt-5">Curious what it's like to be part of Creditor Academy?</p>
                                <p className="mt-4 max-w-2xl text-secondary/80 dark:text-white/80">
                                Join our Free Non-Member Orientation held every Saturday and discover everything we offer — from private education and trust setup to credit mastery and financial freedom. See why thousands are choosing to live, build, and thrive in the private.
                                </p>
                                <p className="mt-3 text-sm font-semibold text-primary">Limited seats available — book now to reserve your spot.</p>
                            </div>
                        </div>
                        <div className="order-2 md:order-2">
                            <div className="mx-auto max-w-md">
                                <SqueezeEmbed />
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-black/10 pt-8 dark:border-white/10">
                    <h4 className="mb-4 text-secondary dark:text-white text-center">
                      What we teaches at Creditor Academy
                    </h4>
                        <Marquee
                            items={[
                                "Status correction principles",
                                "Remove from public jurisdiction",
                                "Essential lawful documents",
                                "Estate protection basics",
                                "Unincorporated Business Trusts",
                                "Private Membership Associations",
                                "Real estate in trusts",
                                "Family legacy planning",
                                "Private Business Credit",
                                "Personal Credit Repair",
                                "Private Merchant Accounts",
                                "Credit card stacking strategies",
                            ]}
                            className="opacity-100"
                            pillClassName="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20 backdrop-blur-sm transition dark:from-primary/20 dark:to-primary/10 dark:text-white"
                            speedPxPerSec={60}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}


