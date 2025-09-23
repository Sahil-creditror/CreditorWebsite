"use client";

import React from "react";

type Submission = {
    folder: string;
    jsonKey: string;
    createdAt?: string;
    payload?: any;
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

    function downloadCsv() {
        const rows = submissions.map((s) => {
            const flat = flattenForCsv(s.payload ?? {});
            return { folder: s.folder, createdAt: s.createdAt ?? "", ...flat };
        });
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
                    <table className="min-w-full text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-900">
                            <tr>
                                <th className="px-3 py-2 text-left font-medium">Created</th>
                                <th className="px-3 py-2 text-left font-medium">Folder</th>
                                <th className="px-3 py-2 text-left font-medium">Legal Name</th>
                                <th className="px-3 py-2 text-left font-medium">Entity Type</th>
                                <th className="px-3 py-2 text-left font-medium">DBA Name</th>
                                <th className="px-3 py-2 text-left font-medium">Contact Email</th>
                                <th className="px-3 py-2 text-left font-medium">Monthly Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((s, i) => {
                                const p = s.payload || {};
                                return (
                                    <tr key={i} className="border-t border-secondary/10 dark:border-white/10">
                                        <td className="px-3 py-2">{s.createdAt || ""}</td>
                                        <td className="px-3 py-2">{s.folder}</td>
                                        <td className="px-3 py-2">{p?.legal?.legalName ?? ""}</td>
                                        <td className="px-3 py-2">{p?.legal?.entityType ?? ""}</td>
                                        <td className="px-3 py-2">{p?.dba?.dbaName ?? ""}</td>
                                        <td className="px-3 py-2">{p?.contact?.email ?? ""}</td>
                                        <td className="px-3 py-2">{p?.sales?.monthlyVolume ?? ""}</td>
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


