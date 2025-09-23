"use client";

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
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [submissions, setSubmissions] = React.useState<Submission[]>([]);

    React.useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/pma/submissions", { cache: "no-store" });
                if (!res.ok) throw new Error(`${res.status}`);
                const data = await res.json();
                setSubmissions(data.submissions || []);
            } catch (e: any) {
                setError(String(e?.message || e));
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

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


