"use client";

import React from "react";

type Props = {
    source?: string;
    ctaText?: string;
    showScarcityNote?: boolean;
};

export default function SqueezeForm({ source = "squeeze", ctaText = "Reserve your seat", showScarcityNote = true }: Props) {
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid work email.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, firstName, lastName, source }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({} as any));
                throw new Error(data?.error || `Request failed: ${res.status}`);
            }
            setSuccess(true);
        } catch (err: any) {
            setError(String(err?.message || err));
        } finally {
            setSubmitting(false);
        }
    }

    if (success) {
        return (
            <div className="w-full rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-secondary">
                <h4 className="mb-2">You're in!</h4>
                <p className="text-secondary/80 dark:text-white/80">Check your inbox for confirmation and next steps. If it doesn't arrive in a minute, check spam.</p>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="w-full rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-secondary">
            <div className="grid grid-cols-1 gap-4">
                {showScarcityNote && (
                    <div className="-mb-1 text-xs font-semibold text-primary">Limited seats available</div>
                )}
                <div>
                    <label className="mb-1 block text-sm font-semibold text-secondary dark:text-white">Work Email <span className="text-primary">*</span></label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-secondary outline-none ring-primary/30 focus:ring-2 dark:border-white/10 dark:bg-twilliteblack dark:text-white"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-semibold text-secondary dark:text-white">First Name <span className="text-primary">*</span></label>
                    <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-secondary outline-none ring-primary/30 focus:ring-2 dark:border-white/10 dark:bg-twilliteblack dark:text-white"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-semibold text-secondary dark:text-white">Last Name <span className="text-primary">*</span></label>
                    <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-secondary outline-none ring-primary/30 focus:ring-2 dark:border-white/10 dark:bg-twilliteblack dark:text-white"
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-semibold text-white transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {submitting ? "Booking..." : ctaText}
                </button>
                <p className="text-xs text-secondary/70 dark:text-white/60">* Required field</p>
                <p className="text-[11px] text-secondary/60 dark:text-white/50">By submitting, you agree to receive session reminders and occasional updates from Creditor Academy. You may unsubscribe anytime.</p>
            </div>
        </form>
    );
}


