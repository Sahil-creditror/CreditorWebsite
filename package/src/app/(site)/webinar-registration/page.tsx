"use client";

import { useMemo, useState } from "react";
import { DEFAULT_WEBINAR_ID } from "@/config/api";

type WebinarSession = {
  key: string;
  id: string;
  label: string;
  time: string;
  description: string;
};

const webinarSessions: WebinarSession[] = [
  {
    key: "morning-session",
    id: process.env.NEXT_PUBLIC_WEBINAR_ID_MORNING || DEFAULT_WEBINAR_ID,
    label: "Morning Intensive",
    time: "10:00 AM PST",
    description: "Perfect if you want to take action before lunch.",
  },
  {
    key: "afternoon-session",
    id: process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON || DEFAULT_WEBINAR_ID,
    label: "Afternoon Deep-Dive",
    time: "2:00 PM PST",
    description: "Great for regrouping mid-day and asking questions live.",
  },
  {
    key: "evening-session",
    id:
      process.env.NEXT_PUBLIC_WEBINAR_ID_EVENING ||
      process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON ||
      DEFAULT_WEBINAR_ID,
    label: "Evening Session",
    time: "7:00 PM PST",
    description: "Catch the training after work with zero rush.",
  },
];

interface Participant {
  id?: string;
  name?: string;
  user_email?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  join_time?: string;
  leave_time?: string;
  duration?: number;
  [key: string]: unknown;
}

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

type SessionView = "registrations" | "participants";

interface SessionData {
  participants: Participant[];
  registrations: Registrant[];
  participantsLoading: boolean;
  registrationsLoading: boolean;
  participantsError: string | null;
  registrationsError: string | null;
  showDetails: boolean;
  activeView: SessionView;
}

const UNKNOWN_DATE_KEY = "unknown-date";

const normalizeDateKey = (value?: string): string | null => {
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

const groupParticipantsByDate = (participants: Participant[]) => {
  return participants.reduce<Record<string, Participant[]>>((groups, participant) => {
    const key = normalizeDateKey(participant.join_time) ?? UNKNOWN_DATE_KEY;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(participant);
    return groups;
  }, {});
};

const buildDateSummary = (sessions: Record<string, SessionData>) => {
  const summary = Object.values(sessions).reduce<Record<string, number>>((acc, session) => {
    session.participants.forEach((participant) => {
      const key = normalizeDateKey(participant.join_time) ?? UNKNOWN_DATE_KEY;
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(summary).sort(([dateA], [dateB]) => {
    if (dateA === UNKNOWN_DATE_KEY) return 1;
    if (dateB === UNKNOWN_DATE_KEY) return -1;
    return dateB.localeCompare(dateA);
  });
};

const createDefaultSessionData = (): SessionData => ({
  participants: [],
  registrations: [],
  participantsLoading: false,
  registrationsLoading: false,
  participantsError: null,
  registrationsError: null,
  showDetails: true,
  activeView: "participants",
});

export default function WebinarRegistrationPage() {
  const [sessionsData, setSessionsData] = useState<Record<string, SessionData>>({});
  const [selectedDates, setSelectedDates] = useState<Record<string, string | null>>({});
  const [allRegistrations, setAllRegistrations] = useState<Registrant[]>([]);
  const [allRegsLoading, setAllRegsLoading] = useState(false);
  const [allRegsError, setAllRegsError] = useState<string | null>(null);
  const [allRegsPage, setAllRegsPage] = useState(0);

  const dateSummary = useMemo(() => buildDateSummary(sessionsData), [sessionsData]);
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
    return [...allRegistrations].sort((a, b) => getTimestamp(b) - getTimestamp(a));
  }, [allRegistrations]);

  const fetchParticipants = async (webinarId: string, sessionKey: string) => {
    setSessionsData((prev) => {
      const current = prev[sessionKey] ?? createDefaultSessionData();
      return {
        ...prev,
        [sessionKey]: {
          ...current,
          participantsLoading: true,
          participantsError: null,
          showDetails: true,
        },
      };
    });

    try {
      // Fetch all registrations (merged report) and filter by webinar_id
      const response = await fetch(`/api/webx/merged-report`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as { success: boolean; error?: string; data?: Registrant[] };

      if (!result.success) {
        setSessionsData((prev) => {
          const current = prev[sessionKey] ?? createDefaultSessionData();
          return {
            ...prev,
            [sessionKey]: {
              ...current,
              participants: [],
              participantsLoading: false,
              participantsError: result.error || "Failed to fetch participants",
              showDetails: true,
            },
          };
        });
        return;
      }

      const data = Array.isArray(result.data) ? result.data : [];
      // Map registrants to participant-like objects for display
      const participants: Participant[] = data
        .filter((reg) => reg.webinar_id === webinarId)
        .map((reg) => ({
          id: reg.registrant_id,
          name:
            (reg.first_name && reg.last_name ? `${reg.first_name} ${reg.last_name}` : reg.first_name || reg.last_name) ||
            reg.email ||
            "N/A",
          first_name: reg.first_name,
          last_name: reg.last_name,
          user_email: reg.email,
          email: reg.email,
          phone_number: reg.phone_number || undefined,
          join_time: reg.start_time || undefined, // use start_time as the event time
          leave_time: reg.leave_time || undefined,
          duration: reg.duration ?? undefined,
        }));

      setSessionsData((prev) => {
        const current = prev[sessionKey] ?? createDefaultSessionData();
        return {
          ...prev,
          [sessionKey]: {
            ...current,
            participants,
            participantsLoading: false,
            participantsError: null,
            showDetails: true,
          },
        };
      });
      // set default selected date to latest
      const groupedParticipants = groupParticipantsByDate(participants);
      const sortedKeys = Object.keys(groupedParticipants).sort((a, b) => {
        if (a === UNKNOWN_DATE_KEY) return 1;
        if (b === UNKNOWN_DATE_KEY) return -1;
        return b.localeCompare(a);
      });
      setSelectedDates((prev) => ({ ...prev, [sessionKey]: sortedKeys[0] ?? null }));

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching participants";
      setSessionsData((prev) => {
        const current = prev[sessionKey] ?? createDefaultSessionData();
        return {
          ...prev,
          [sessionKey]: {
            ...current,
            participants: [],
            participantsLoading: false,
            participantsError: errorMessage,
            showDetails: true,
          },
        };
      });
    }
  };

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
          <h1 className="text-4xl md:text-5xl font-bold text-[#026fe2] dark:text-white mb-4">
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
              {allRegsLoading ? "Loading registrations..." : "Registrations"}
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
              <div className="flex items-center gap-2">
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
                        ? regTimeSource
                        : reg.registered_at
                        ? new Date(reg.registered_at).toLocaleString()
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

        {/* Webinar Sessions Column */}
        <div className="flex flex-col gap-6 mb-12">
          {webinarSessions.map((session) => {
            const sessionData = sessionsData[session.key] ?? createDefaultSessionData();
            const grouped = groupParticipantsByDate(sessionData.participants);
            const sortedDates = Object.keys(grouped).sort((a, b) => {
              if (a === UNKNOWN_DATE_KEY) return 1;
              if (b === UNKNOWN_DATE_KEY) return -1;
              return b.localeCompare(a);
            });
            const selectedDate = selectedDates[session.key] ?? sortedDates[0] ?? null;
            const activeList = selectedDate ? grouped[selectedDate] ?? [] : [];
            const activeLoading = sessionData.participantsLoading;
            const activeError = sessionData.participantsError;
            const loadButtonLabel = activeList.length > 0 ? "Refresh Participants" : "Show Participants";
            const participantsHistoryAvailable = sortedDates.length > 1;

            return (
              <div
                key={session.key}
                className="bg-white dark:bg-[#1F2A2E] rounded-xl shadow-lg border border-blue-100 dark:border-blue-800/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                {/* Session Card Header */}
                <div className="bg-gradient-to-r from-[#026fe2] to-[#45beff] dark:from-[#001428] dark:to-[#002b5c] p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{session.label}</h3>
                      <p className="text-blue-100 dark:text-blue-300 text-sm mb-1">
                        <span className="font-semibold">Time:</span> {session.time}
                      </p>
                      <p className="text-blue-100 dark:text-blue-300 text-sm">
                        <span className="font-semibold">ID:</span> {session.id}
                      </p>
                    </div>
                  </div>
                  <p className="text-blue-50 dark:text-blue-200 text-sm mt-3 italic">
                    {session.description}
                  </p>
                </div>

                {/* Session Card Body */}
                <div className="p-6">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="space-y-1">
                    
                      {sessionData.showDetails && activeList.length > 0 && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-[#026fe2] dark:text-blue-400">
                            {activeList.length}
                          </span>{" "}
                          total participants
                        </p>
                      )}
                      {participantsHistoryAvailable && (
                        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous sessions archived
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sortedDates.length > 0 && (
                        <select
                          className="px-3 py-2 border border-blue-200 dark:border-blue-800 rounded-lg text-sm bg-white dark:bg-[#1F2A2E]"
                          value={selectedDate ?? ""}
                          onChange={(e) =>
                            setSelectedDates((prev) => ({ ...prev, [session.key]: e.target.value || null }))
                          }
                        >
                          {sortedDates.map((dateKey) => (
                            <option key={dateKey} value={dateKey}>
                              {formatDateLabel(dateKey)}
                            </option>
                          ))}
                        </select>
                      )}
                      <button
                        onClick={() => fetchParticipants(session.id, session.key)}
                        disabled={activeLoading}
                        className="px-6 py-2.5 bg-[#026fe2] hover:bg-[#0256b8] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {activeLoading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          loadButtonLabel
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {activeError && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        <span className="font-semibold">Error:</span> {activeError}
                      </p>
          </div>
        )}

                  {/* Data Views */}
                  {!activeLoading && !activeError && (
                    <div className="mt-4 space-y-4">
                      {activeList.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-sm">No participants found for this webinar.</p>
                        </div>
                      ) : (
                        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-[#131b22]">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">
                                  #
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">
                                  Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">
                                  Email
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">
                                  Phone
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">
                                  Join Time
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">
                                  Duration
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-[#1F2A2E] divide-y divide-gray-200 dark:divide-gray-700">
                              {(activeList as Participant[]).map((participant: Participant, indexWithinDate: number) => {
                                const name =
                                  participant.name ||
                                  (participant.first_name && participant.last_name
                                    ? `${participant.first_name} ${participant.last_name}`
                                    : participant.first_name || participant.last_name || "N/A");
                                const email = participant.user_email || participant.email || "N/A";
                                const phone = participant.phone_number || "N/A";
                                const joinTime = participant.join_time ? new Date(participant.join_time).toLocaleString() : "N/A";
                                const duration = participant.duration
                                  ? `${Math.floor(participant.duration / 60)}m ${participant.duration % 60}s`
                                  : "N/A";

                                return (
                                  <tr
                                    key={participant.id || `${session.key}-latest-${indexWithinDate}`}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                  >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                      {indexWithinDate + 1}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                      {name}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                      {email}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                      {phone}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                      {joinTime}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                      {duration}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

