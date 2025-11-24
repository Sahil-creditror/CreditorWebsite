"use client";

import Image from "next/image";
import React from "react";

type Submission = {
    folder: string;
    jsonKey: string;
    createdAt?: string;
    payload?: any;
    files?: string[];
    fileMap?: Record<string, string>;
};

function flattenForCsv(payload: any): Record<string, string> {
    // Create a flat key-value map suitable for CSV export
    const out: Record<string, string> = {};

    function visit(prefix: string, value: any) {
        if (value === null || value === undefined) {
            out[prefix] = "";
            return;
        }
        if (Array.isArray(value)) {
            value.forEach((v, i) => visit(`${prefix}[${i}]`, v));
            return;
        }
        if (typeof value === "object") {
            Object.entries(value).forEach(([k, v]) => visit(prefix ? `${prefix}.${k}` : k, v));
            return;
        }
        out[prefix] = String(value);
    }

    visit("", payload);
    // remove leading dot from keys
    const cleaned: Record<string, string> = {};
    Object.entries(out).forEach(([k, v]) => {
        const key = k.startsWith(".") ? k.slice(1) : k;
        cleaned[key] = v;
    });
    return cleaned;
}

function toCsv(rows: Record<string, string>[]): string {
    const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
    const escape = (val: string) => {
        const s = val.replace(/"/g, '""');
        if (s.search(/[",\n]/) >= 0) return `"${s}"`;
        return s;
    };
    const lines = [headers.join(",")];
    for (const row of rows) {
        lines.push(headers.map((h) => escape(row[h] ?? "")).join(","));
    }
    return lines.join("\n");
}

export default function Page() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [submissions, setSubmissions] = React.useState<Submission[]>([]);
    const [loginId, setLoginId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [authError, setAuthError] = React.useState<string | null>(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [authenticated, setAuthenticated] = React.useState(false);

    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.sessionStorage.getItem("pmaAuth");
        if (stored === "true") setAuthenticated(true);
    }, []);

    React.useEffect(() => {
        if (!authenticated) return;
        let abort = false;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/pma/submissions", { cache: "no-store" });
                if (!res.ok) throw new Error(`${res.status}`);
                if (abort) return;
                const data = await res.json();
                setSubmissions(data.submissions || []);
            } catch (e: any) {
                if (!abort) setError(String(e?.message || e));
            } finally {
                if (!abort) setLoading(false);
            }
        }
        load();
        return () => {
            abort = true;
        };
    }, [authenticated]);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const idOk = loginId.trim() === "Admin@creditor";
        const passwordOk = password === "Creditor@763130";
        if (!idOk || !passwordOk) {
            setAuthError("Invalid credentials. Please try again.");
            return;
        }
        setAuthError(null);
        setAuthenticated(true);
        if (typeof window !== "undefined") window.sessionStorage.setItem("pmaAuth", "true");
    };

    const rows = React.useMemo<Record<string, string>[]>(() => {
        return submissions.map((s) => {
            const flat = flattenForCsv(s.payload ?? {});
            return { createdAt: s.createdAt ?? "", folder: s.folder, ...flat };
        });
    }, [submissions]);

    const docFields = [
        "articlesOfOrg",
        "ss4Letter",
        "voidedCheck",
        "governmentId",
        "businessStatement1",
        "businessStatement2",
        "businessStatement3",
        "personalStatement1",
        "personalStatement2",
        "personalStatement3",
        "customerServiceAgreement",
        "fulfillmentAgreement",
        "crmAgreement",
        "chargebackAgreement",
        "coa",
    ];

    const headers = React.useMemo(() => {
        if (!rows.length) return [] as string[];
        const keys = new Set<string>();
        rows.forEach((r) => Object.keys(r).forEach((k) => {
            if (k.startsWith("documents.")) return; // hide documents.* because files columns exist
            keys.add(k);
        }));
        // Keep createdAt, folder first, then alphabetical for rest
        const ordered = Array.from(keys).filter((k) => k !== "createdAt" && k !== "folder").sort();
        return ["createdAt", "folder", ...ordered];
    }, [rows]);

    function downloadCsv() {
        const csv = toCsv(rows);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "pma-submissions.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    if (!authenticated) {
        return (
            <div className="max-w-md mx-auto px-4 md:px-6 py-12 mt-20">
                <form onSubmit={handleLogin} className="space-y-4 border border-secondary/20 dark:border-white/10 rounded-lg p-6 shadow-sm bg-white/90 dark:bg-neutral-900/80 backdrop-blur">
                    <div className="flex flex-col items-center mb-2 text-center">
                        <div className="relative w-90 h-20">
                            <Image src="/images/logo/creditorlogo.webp" alt="Creditor Academy logo" fill sizes="128px" className="object-contain" priority />
                        </div>
                        <h1 className="text-2xl font-semibold">Administrator Access</h1>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Enter the provided credentials to review PMA submissions.</p>
                    </div>
                    <div>
                        <label htmlFor="loginId" className="block text-sm font-medium mb-1">Username</label>
                        <input
                            id="loginId"
                            type="text"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            className="w-full rounded-md border border-secondary/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-950"
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border border-secondary/30 px-3 py-2 pr-11 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-950"
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {showPassword ? (
                                        <>
                                            <path d="M10.73 5.08A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a17.84 17.84 0 0 1-2.11 3.25" />
                                            <path d="M6.61 6.61A17.9 17.9 0 0 0 1 12s4 7 11 7c.71 0 1.4-.06 2.07-.17" />
                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </>
                                    ) : (
                                        <>
                                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                    {authError && <p className="text-sm text-red-600">{authError}</p>}
                    <button type="submit" className="w-full rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-medium">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 mt-20">
            <div className="mb-4 flex items-center gap-3">
                <h1 className="text-2xl font-semibold">PMA Submissions</h1>
                <button type="button" onClick={downloadCsv} className="ml-auto inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Download CSV
                </button>
            </div>

            {loading && <div>Loading…</div>}
            {error && <div className="text-red-600">Error: {error}</div>}

            {!loading && !error && (
                <div className="overflow-auto border border-secondary/20 dark:border-white/10 rounded-md">
                    <table className="min-w-full text-xs md:text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-900">
                            <tr>
                                {headers.map((h) => (
                                    <th key={h} className="px-3 py-2 text-left font-medium whitespace-nowrap">{h}</th>
                                ))}
                                {docFields.map((d) => (
                                    <th key={d} className="px-3 py-2 text-left font-medium whitespace-nowrap">{d}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => {
                                const fileMap = submissions[i]?.fileMap || {};
                                return (
                                    <tr key={i} className="border-t border-secondary/10 dark:border-white/10">
                                        {headers.map((h) => (
                                            <td key={h} className="px-3 py-2 whitespace-nowrap">{r[h] ?? ""}</td>
                                        ))}
                                        {docFields.map((d) => {
                                            const key = fileMap[d];
                                            if (!key) return <td key={d} className="px-3 py-2 whitespace-nowrap text-neutral-500">—</td>;
                                            const fileName = key.split("/").pop() || key;
                                            return (
                                                <td key={d} className="px-3 py-2 whitespace-nowrap">
                                                    <a
                                                        href={`/api/pma/file?key=${encodeURIComponent(key)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {fileName}
                                                    </a>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}


