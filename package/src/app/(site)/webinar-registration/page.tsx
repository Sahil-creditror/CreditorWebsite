"use client";

import { useMemo, useState } from "react";

const TOPIC_FILTER_OPTIONS = [
  { value: "all", label: "All topics", matches: [] as string[] },
  {
    value: "orientation-12am",
    label: "Orientation Webinar 12 AM",
    matches: ["orientation webinar 12 am", "orientation webinar at 12 am", "midnight orientation webinar"],
  },
  {
    value: "orientation-9am",
    label: "Orientation Webinar 9 AM",
    matches: ["orientation webinar 9 am", "orientation webinar at 9 am"],
  },
  {
    value: "orientation-2pm",
    label: "Orientation Webinar 2 PM",
    matches: ["orientation webinar 2 pm", "orientation webinar at 2 pm"],
  },
  {
    value: "orientation-7pm",
    label: "Orientation Webinar 7 PM",
    matches: ["orientation webinar 7 pm", "orientation webinar at 7 pm"],
  },
];

interface Registrant {
  registrant_id: string;
  webinar_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string | null;
  join_url?: string;
  topic?: string;
  start_time?: string | null;
  registered_at?: string | null;
  joined?: boolean;
  status?: string;
  join_time?: string | null;
  leave_time?: string | null;
  duration?: number | null;
}

const UNKNOWN_DATE_KEY = "unknown-date";

const normalizeDateKey = (value?: string | null): string | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split("T")[0];
};

const formatDateLabel = (key: string) => {
  if (key === UNKNOWN_DATE_KEY) {
    return "Date unavailable";
  }

  try {
    return new Date(key).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return key;
  }
};

const formatToPST = (value?: string | number | Date | null) => {
  if (value === null || value === undefined) return "N/A";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" && value.trim() ? value : "N/A";
  }
  return date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
};

const normalizeTopic = (topic?: string | null) => topic?.trim().toLowerCase() ?? "";
const toInputDate = (date: Date) => date.toISOString().split("T")[0];

const buildAttendanceSummary = (registrations: Registrant[]) => {
  const summary = registrations.reduce<Record<string, number>>((acc, reg) => {
    const status = reg.status?.toLowerCase();
    if (status !== "attended") return acc;
    const regTimeSource = (reg as unknown as { registration_time?: string }).registration_time;
    const key =
      normalizeDateKey(reg.start_time) ??
      normalizeDateKey(regTimeSource) ??
      normalizeDateKey(reg.registered_at ?? undefined) ??
      UNKNOWN_DATE_KEY;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(summary).sort(([dateA], [dateB]) => {
    if (dateA === UNKNOWN_DATE_KEY) return 1;
    if (dateB === UNKNOWN_DATE_KEY) return -1;
    return dateB.localeCompare(dateA);
  });
};

export default function WebinarRegistrationPage() {
  const [allRegistrations, setAllRegistrations] = useState<Registrant[]>([]);
  const [allRegsLoading, setAllRegsLoading] = useState(false);
  const [allRegsError, setAllRegsError] = useState<string | null>(null);
  const [allRegsPage, setAllRegsPage] = useState(0);
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const filteredAllRegs = useMemo(() => {
    const selected = TOPIC_FILTER_OPTIONS.find((opt) => opt.value === topicFilter);
    const matches = selected?.matches.map((m) => m.toLowerCase()) ?? [];

    return allRegistrations.filter((reg) => {
      // topic filter
      if (selected && selected.value !== "all") {
        const topic = normalizeTopic(reg.topic);
        const matchesTopic = matches.some((m) => topic.includes(m));
        if (!matchesTopic) return false;
      }

      // date filter
      const regTimeSource = (reg as unknown as { registration_time?: string }).registration_time;
      const recordDate =
        normalizeDateKey(reg.start_time) ??
        normalizeDateKey(regTimeSource) ??
        normalizeDateKey(reg.registered_at ?? undefined);

      if (startDateFilter) {
        if (!recordDate || recordDate < startDateFilter) return false;
      }
      if (endDateFilter) {
        if (!recordDate || recordDate > endDateFilter) return false;
      }

      return true;
    });
  }, [allRegistrations, topicFilter, startDateFilter, endDateFilter]);

  const dateSummary = useMemo(() => buildAttendanceSummary(filteredAllRegs), [filteredAllRegs]);

  const sortedAllRegs = useMemo(() => {
    const getTimestamp = (reg: Registrant): number => {
      const regTimeSource = (reg as unknown as { registration_time?: string }).registration_time;
      const ts =
        regTimeSource && typeof regTimeSource === "string"
          ? Date.parse(regTimeSource)
          : reg.registered_at
          ? Date.parse(reg.registered_at)
          : reg.start_time
          ? Date.parse(reg.start_time)
          : 0;
      return Number.isNaN(ts) ? 0 : ts;
    };
    return [...filteredAllRegs].sort((a, b) => getTimestamp(b) - getTimestamp(a));
  }, [filteredAllRegs]);

  const fetchAllRegistrations = async () => {
    setAllRegsLoading(true);
    setAllRegsError(null);
    try {
      const response = await fetch(`/api/webx/merged-report`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = (await response.json()) as { success: boolean; error?: string; data?: Registrant[] };
      if (!result.success) {
        setAllRegsError(result.error || "Failed to fetch registrations");
        setAllRegistrations([]);
      } else {
        setAllRegistrations(Array.isArray(result.data) ? result.data : []);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch registrations";
      setAllRegsError(message);
      setAllRegistrations([]);
    } finally {
      setAllRegsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-[#001428] dark:via-[#002b5c] dark:to-[#026fe2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#026fe2] dark:text-white mb-4 pt-20">
          Webinar Registration Details
        </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            View participant details for each webinar session
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={fetchAllRegistrations}
              disabled={allRegsLoading}
              className="px-6 py-3 bg-[#026fe2] hover:bg-[#0256b8] text-white font-semibold rounded-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {allRegsLoading ? "Loading registrations..." : "View Registrations"}
            </button>
          </div>
          {allRegsError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{allRegsError}</p>
          )}
        </div>

        {allRegistrations.length > 0 && (
          <section className="mb-10 bg-white dark:bg-[#1F2A2E] rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Registrations</h2>
            <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Showing latest registrations (sorted by most recent)
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-100 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#026fe2] dark:text-blue-300">Date range</span>
                    <svg className="h-4 w-4 text-[#026fe2] dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <path d="M3 10h18" />
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={startDateFilter}
                      onChange={(e) => {
                        setStartDateFilter(e.target.value);
                        setAllRegsPage(0);
                      }}
                      className="px-2 py-1 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-[#1F2A2E]"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">to</span>
                    <input
                      type="date"
                      value={endDateFilter}
                      onChange={(e) => {
                        setEndDateFilter(e.target.value);
                        setAllRegsPage(0);
                      }}
                      className="px-2 py-1 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-[#1F2A2E]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const today = new Date();
                        const dateStr = toInputDate(today);
                        setStartDateFilter(dateStr);
                        setEndDateFilter(dateStr);
                        setAllRegsPage(0);
                      }}
                      className="text-xs px-2 py-1 rounded-md border border-blue-200 dark:border-blue-700 text-[#026fe2] dark:text-blue-300 bg-white dark:bg-[#1F2A2E] hover:bg-blue-50 dark:hover:bg-blue-800/40"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => {
                        const end = new Date();
                        const start = new Date();
                        start.setDate(end.getDate() - 6);
                        setStartDateFilter(toInputDate(start));
                        setEndDateFilter(toInputDate(end));
                        setAllRegsPage(0);
                      }}
                      className="text-xs px-2 py-1 rounded-md border border-blue-200 dark:border-blue-700 text-[#026fe2] dark:text-blue-300 bg-white dark:bg-[#1F2A2E] hover:bg-blue-50 dark:hover:bg-blue-800/40"
                    >
                      Last 7d
                    </button>
                    {(startDateFilter || endDateFilter) && (
                      <button
                        onClick={() => {
                          setStartDateFilter("");
                          setEndDateFilter("");
                          setAllRegsPage(0);
                        }}
                        className="text-xs px-2 py-1 rounded-md border border-blue-200 dark:border-blue-700 text-[#026fe2] dark:text-blue-300 bg-white dark:bg-[#1F2A2E] hover:bg-blue-50 dark:hover:bg-blue-800/40"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <select
                  value={topicFilter}
                  onChange={(e) => {
                    setTopicFilter(e.target.value);
                    setAllRegsPage(0);
                  }}
                  className="px-3 py-2 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-[#1F2A2E] text-[#026fe2] dark:text-blue-300"
                >
                  {TOPIC_FILTER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setAllRegsPage((p) => Math.max(0, p - 1))}
                  disabled={allRegsPage === 0}
                  className="px-3 py-1.5 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-[#1F2A2E] text-[#026fe2] dark:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setAllRegsPage((p) =>
                      p + 1 < Math.ceil(sortedAllRegs.length / 5) ? p + 1 : p
                    )
                  }
                  disabled={allRegsPage + 1 >= Math.max(1, Math.ceil(sortedAllRegs.length / 5))}
                  className="px-3 py-1.5 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-[#1F2A2E] text-[#026fe2] dark:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Page {allRegsPage + 1} of {Math.max(1, Math.ceil(sortedAllRegs.length / 5))}
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">Topic</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">Reg Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">Start</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">Status</th>
             
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#1F2A2E] divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedAllRegs
                    .slice(allRegsPage * 5, allRegsPage * 5 + 5)
                    .map((reg, idx) => {
                    const name =
                      (reg.first_name && reg.last_name ? `${reg.first_name} ${reg.last_name}` : reg.first_name || reg.last_name) || "N/A";
                    const email = reg.email || "N/A";
                    const phone = reg.phone_number || "N/A";
                    const regTimeSource = (reg as unknown as { registration_time?: string }).registration_time;
                    const regTime =
                      regTimeSource && typeof regTimeSource === "string"
                        ? formatToPST(regTimeSource)
                        : reg.registered_at
                        ? formatToPST(reg.registered_at)
                        : reg.start_time
                        ? formatToPST(reg.start_time)
                        : "N/A";
                    const start = reg.start_time ? new Date(reg.start_time).toLocaleString() : "N/A";
                    const status = reg.status || "N/A";
                    const duration =
                      typeof reg.duration === "number" && reg.duration > 0
                        ? `${Math.floor(reg.duration / 60)}m ${reg.duration % 60}s`
                        : "0s";
                    return (
                      <tr key={reg.registrant_id || `${reg.email}-${idx}`} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{allRegsPage * 5 + idx + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{phone}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{reg.topic || "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{regTime}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{start}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{status}</td>
                       
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Date-wise snapshot */}
        {dateSummary.length > 0 && (
          <section className="mb-10 bg-white dark:bg-[#1F2A2E] rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800/50 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <p className="text-sm uppercase tracking-wider text-blue-400 font-semibold">Recurring attendance</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Date-wise participant trend</h2>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing {dateSummary.length} unique {dateSummary.length === 1 ? "date" : "dates"}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              {dateSummary.map(([dateKey, total]) => (
                <div
                  key={dateKey}
                  className="flex-1 min-w-[200px] bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Date</p>
                  <p className="text-lg font-semibold text-[#026fe2] dark:text-blue-300">
                    {formatDateLabel(dateKey)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{total}</span>{" "}
                    {total === 1 ? "participant" : "participants"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

