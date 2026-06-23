"use client";

import { useMemo, useState } from "react";
import { getRegistrationTimestamp, limitRecentRegistrations } from "@/lib/registrationUtils";

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

/**
 * Convert registrations data to CSV format
 */
const convertToCSV = (registrations: Registrant[]): string => {
  // CSV headers
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Topic",
    "Registration Time (PST)",
    "Start Time",
    "Status",
    "Duration",
    "Join URL",
    "Registrant ID",
    "Webinar ID",
  ];

  // Convert each registration to CSV row
  const rows = registrations.map((reg) => {
    const name =
      (reg.first_name && reg.last_name ? `${reg.first_name} ${reg.last_name}` : reg.first_name || reg.last_name) || "N/A";
    const email = reg.email || "N/A";
    const phone = reg.phone_number || "N/A";
    const topic = reg.topic || "N/A";
    
    const regTimeSource = (reg as unknown as { registration_time?: string }).registration_time;
    const regTime =
      regTimeSource && typeof regTimeSource === "string"
        ? formatToPST(regTimeSource)
        : reg.registered_at
        ? formatToPST(reg.registered_at)
        : reg.start_time
        ? formatToPST(reg.start_time)
        : "N/A";
    
    const start = reg.start_time ? formatToPST(reg.start_time) : "N/A";
    const status = reg.status || "N/A";
    const duration =
      typeof reg.duration === "number" && reg.duration > 0
        ? `${Math.floor(reg.duration / 60)}m ${reg.duration % 60}s`
        : "0s";
    const joinUrl = reg.join_url || "N/A";
    const registrantId = reg.registrant_id || "N/A";
    const webinarId = reg.webinar_id || "N/A";

    // Escape CSV values (handle commas, quotes, newlines)
    const escapeCSV = (value: string): string => {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    return [
      escapeCSV(name),
      escapeCSV(email),
      escapeCSV(phone),
      escapeCSV(topic),
      escapeCSV(regTime),
      escapeCSV(start),
      escapeCSV(status),
      escapeCSV(duration),
      escapeCSV(joinUrl),
      escapeCSV(registrantId),
      escapeCSV(webinarId),
    ].join(",");
  });

  // Combine headers and rows
  return [headers.join(","), ...rows].join("\n");
};

/**
 * Download CSV file
 */
const downloadCSV = (csvContent: string, filename: string) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
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
  const [startTimeFilter, setStartTimeFilter] = useState<string>("");
  const [endTimeFilter, setEndTimeFilter] = useState<string>("");

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

      // time range filter
      if (startTimeFilter || endTimeFilter) {
        const timeSource = reg.start_time || regTimeSource || reg.registered_at;
        if (!timeSource) return false;
        
        try {
          const regDate = new Date(timeSource);
          if (Number.isNaN(regDate.getTime())) return false;
          
          // Get time in PST using Intl.DateTimeFormat for reliable parsing
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Los_Angeles",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          });
          
          const parts = formatter.formatToParts(regDate);
          const hours = parseInt(parts.find(p => p.type === "hour")?.value || "0", 10);
          const minutes = parseInt(parts.find(p => p.type === "minute")?.value || "0", 10);
          const regTimeMinutes = hours * 60 + minutes;
          
          if (startTimeFilter) {
            const [startHours, startMinutes] = startTimeFilter.split(":").map(Number);
            const startTimeMinutes = startHours * 60 + startMinutes;
            if (regTimeMinutes < startTimeMinutes) return false;
          }
          
          if (endTimeFilter) {
            const [endHours, endMinutes] = endTimeFilter.split(":").map(Number);
            const endTimeMinutes = endHours * 60 + endMinutes;
            if (regTimeMinutes > endTimeMinutes) return false;
          }
        } catch {
          return false;
        }
      }

      return true;
    });
  }, [allRegistrations, topicFilter, startDateFilter, endDateFilter, startTimeFilter, endTimeFilter]);

  const dateSummary = useMemo(() => buildAttendanceSummary(filteredAllRegs), [filteredAllRegs]);

  const sortedAllRegs = useMemo(() => {
    return [...filteredAllRegs].sort((a, b) => getRegistrationTimestamp(b) - getRegistrationTimestamp(a));
  }, [filteredAllRegs]);

  const parseRegistrationResponse = async (
    response: Response
  ): Promise<{ data: Registrant[]; error?: string }> => {
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const body = await response.text();
      return {
        data: [],
        error: response.ok
          ? "Registration service returned an unexpected response."
          : `Registration service failed (${response.status}). ${body.slice(0, 120)}`,
      };
    }

    const result = (await response.json()) as { success?: boolean; error?: string; data?: Registrant[] };
    if (!response.ok || result.success === false) {
      return { data: [], error: result.error || "Failed to fetch registrations" };
    }

    return { data: Array.isArray(result.data) ? result.data : [] };
  };

  const fetchAllRegistrations = async () => {
    setAllRegsLoading(true);
    setAllRegsError(null);
    try {
      const [zoomResult, recordingResult] = await Promise.allSettled([
        fetch("/api/webx/merged-report", {
          method: "GET",
          headers: { Accept: "application/json" },
        }),
        fetch("/api/webx/recording-registrations", {
          method: "GET",
          headers: { Accept: "application/json" },
        }),
      ]);

      const errors: string[] = [];
      let merged: Registrant[] = [];

      if (zoomResult.status === "fulfilled") {
        const parsed = await parseRegistrationResponse(zoomResult.value);
        merged = merged.concat(parsed.data);
        if (parsed.error) errors.push(parsed.error);
      } else {
        errors.push("Live webinar registrations could not be loaded.");
      }

      if (recordingResult.status === "fulfilled") {
        const parsed = await parseRegistrationResponse(recordingResult.value);
        merged = merged.concat(parsed.data);
        if (parsed.error) errors.push(parsed.error);
      } else {
        errors.push("Recording registrations could not be loaded.");
      }

      const limited = limitRecentRegistrations(merged);
      setAllRegistrations(limited);

      if (limited.length === 0 && errors.length > 0) {
        setAllRegsError(errors.join(" "));
      } else if (errors.length > 0) {
        setAllRegsError(`Loaded ${limited.length} registrations with warnings: ${errors.join(" ")}`);
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
                Showing latest 50 registrations (sorted by most recent)
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
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-100 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#026fe2] dark:text-blue-300">Time range</span>
                    <svg className="h-4 w-4 text-[#026fe2] dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={startTimeFilter}
                      onChange={(e) => {
                        setStartTimeFilter(e.target.value);
                        setAllRegsPage(0);
                      }}
                      className="px-2 py-1 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-[#1F2A2E]"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">to</span>
                    <input
                      type="time"
                      value={endTimeFilter}
                      onChange={(e) => {
                        setEndTimeFilter(e.target.value);
                        setAllRegsPage(0);
                      }}
                      className="px-2 py-1 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-[#1F2A2E]"
                    />
                  </div>
                  {(startTimeFilter || endTimeFilter) && (
                    <button
                      onClick={() => {
                        setStartTimeFilter("");
                        setEndTimeFilter("");
                        setAllRegsPage(0);
                      }}
                      className="text-xs px-2 py-1 rounded-md border border-blue-200 dark:border-blue-700 text-[#026fe2] dark:text-blue-300 bg-white dark:bg-[#1F2A2E] hover:bg-blue-50 dark:hover:bg-blue-800/40"
                    >
                      Clear
                    </button>
                  )}
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
                      p + 1 < Math.ceil(sortedAllRegs.length / 10) ? p + 1 : p
                    )
                  }
                  disabled={allRegsPage + 1 >= Math.max(1, Math.ceil(sortedAllRegs.length / 10))}
                  className="px-3 py-1.5 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-[#1F2A2E] text-[#026fe2] dark:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Page {allRegsPage + 1} of {Math.max(1, Math.ceil(sortedAllRegs.length / 10))}
                </span>
                <button
                  onClick={() => {
                    const csvContent = convertToCSV(sortedAllRegs);
                    const timestamp = new Date().toISOString().split("T")[0];
                    const filename = `webinar-registrations-${timestamp}.csv`;
                    downloadCSV(csvContent, filename);
                  }}
                  disabled={sortedAllRegs.length === 0}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Export filtered registrations to CSV"
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export CSV
                </button>
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
                    .slice(allRegsPage * 10, allRegsPage * 10 + 10)
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
                    const globalIndex = allRegsPage * 10 + idx;
                    return (
                      <tr key={reg.registrant_id ? `${reg.registrant_id}-${globalIndex}` : `${reg.email}-${globalIndex}`} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{allRegsPage * 10 + idx + 1}</td>
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

