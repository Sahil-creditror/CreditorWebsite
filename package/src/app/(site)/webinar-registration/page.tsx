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
const EVENT_TIMEZONE = "America/Los_Angeles";
const DAILY_RECURRENCE_MS = 24 * 60 * 60 * 1000;
const OCCURRENCE_TOLERANCE_MS = 5 * 60 * 1000;

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

const parseIsoDate = (value?: string | null): Date | null => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatEventDateTime = (date: Date | null) => {
  if (!date) return null;
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: EVENT_TIMEZONE,
    timeZoneName: "short",
  });
};

const formatEventDateTimeLocal = (date: Date | null) => {
  if (!date) return null;
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: localTimeZone,
    timeZoneName: "short",
  });
};

const getNextDailyOccurrence = (baseDate: Date | null, now = new Date()) => {
  if (!baseDate) return null;
  const occurrence = new Date(baseDate.getTime());
  const nowMs = now.getTime();

  if (occurrence.getTime() > nowMs) {
    return occurrence;
  }

  const elapsedDays = Math.floor((nowMs - occurrence.getTime()) / DAILY_RECURRENCE_MS) + 1;
  occurrence.setUTCDate(occurrence.getUTCDate() + elapsedDays);
  return occurrence;
};

const getNextEventRegistrations = (registrations: Registrant[]) => {
  if (!registrations.length) {
    return { registrations, eventDate: null };
  }

  const now = new Date();
  const enhanced = registrations
    .map((registrant) => {
      const baseDate = parseIsoDate(registrant.start_time);
      const occurrenceDate = getNextDailyOccurrence(baseDate, now) ?? baseDate;
      return { registrant, occurrenceDate };
    })
    .filter((item): item is { registrant: Registrant; occurrenceDate: Date } => Boolean(item.occurrenceDate));

  if (!enhanced.length) {
    return { registrations, eventDate: null };
  }

  enhanced.sort((a, b) => a.occurrenceDate.getTime() - b.occurrenceDate.getTime());
  const nextEventDate = enhanced[0].occurrenceDate;
  const selectedRegistrations = enhanced
    .filter((item) => Math.abs(item.occurrenceDate.getTime() - nextEventDate.getTime()) <= OCCURRENCE_TOLERANCE_MS)
    .map((item) => item.registrant);

  return {
    registrations: selectedRegistrations.length ? selectedRegistrations : registrations,
    eventDate: nextEventDate,
  };
};

const getLatestParticipantsEvent = (participants: Participant[]) => {
  const grouped = groupParticipantsByDate(participants);
  const sortedEntries = Object.entries(grouped).sort(([dateA], [dateB]) => {
    if (dateA === UNKNOWN_DATE_KEY) return 1;
    if (dateB === UNKNOWN_DATE_KEY) return -1;
    return dateB.localeCompare(dateA);
  });

  if (!sortedEntries.length) {
    return { participants: [], eventDate: null, hasHistory: false };
  }

  const [latestKey, latestList] = sortedEntries[0];
  const representativeParticipant =
    latestList.find((participant) => parseIsoDate(participant.join_time)) ?? latestList[0];
  const eventDate =
    parseIsoDate(representativeParticipant?.join_time ?? null) ||
    (latestKey !== UNKNOWN_DATE_KEY ? parseIsoDate(latestKey) : null);

  return {
    participants: latestList,
    eventDate,
    hasHistory: sortedEntries.length > 1,
  };
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
  showDetails: false,
  activeView: "registrations",
});

export default function WebinarRegistrationPage() {
  const [sessionsData, setSessionsData] = useState<Record<string, SessionData>>({});

  const dateSummary = useMemo(() => buildDateSummary(sessionsData), [sessionsData]);

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
      const response = await fetch(`/api/webx/participants?webinarId=${encodeURIComponent(webinarId)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as { success: boolean; error?: string; data?: unknown };

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

      const data = result.data;
      let participants: Participant[] = [];

      if (Array.isArray(data)) {
        participants = data as Participant[];
      } else if (data && typeof data === "object" && "registerParticipants" in data) {
        const nested = (data as { registerParticipants?: unknown }).registerParticipants;
        if (Array.isArray(nested)) {
          participants = nested as Participant[];
        }
      } else if (data && typeof data === "object" && "participants" in data) {
        const nested = (data as { participants?: unknown }).participants;
        if (Array.isArray(nested)) {
          participants = nested as Participant[];
        }
      } else if (data && typeof data === "object" && "registrants" in data) {
        const nested = (data as { registrants?: unknown }).registrants;
        if (Array.isArray(nested)) {
          participants = nested as Participant[];
        }
      }

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

  const handleViewChange = (session: WebinarSession, view: SessionView) => {
    setSessionsData((prev) => {
      const current = prev[session.key] ?? createDefaultSessionData();
      return {
        ...prev,
        [session.key]: {
          ...current,
          activeView: view,
          showDetails: true,
        },
      };
    });

    if (view === "participants") {
      const current = sessionsData[session.key];
      if (!current || current.participants.length === 0) {
        fetchParticipants(session.id, session.key);
      }
    } else {
      const current = sessionsData[session.key];
      if (!current || current.registrations.length === 0) {
        fetchRegistrations(session.id, session.key);
      }
    }
  };

  const toggleDetails = (sessionKey: string) => {
    setSessionsData(prev => {
      const current = prev[sessionKey];
      if (!current) {
        return prev;
      }
      return {
        ...prev,
        [sessionKey]: {
          ...current,
          showDetails: !current.showDetails,
        },
      };
    });
  };

  const fetchRegistrations = async (webinarId: string, sessionKey: string) => {
    setSessionsData((prev) => {
      const current = prev[sessionKey] ?? createDefaultSessionData();
      return {
        ...prev,
        [sessionKey]: {
          ...current,
          registrationsLoading: true,
          registrationsError: null,
          showDetails: true,
        },
      };
    });

    try {
      const response = await fetch(`/api/webx/merged-report?webinarId=${encodeURIComponent(webinarId)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as {
        success: boolean;
        error?: string;
        data?: Registrant[];
      };

      if (!result.success) {
        setSessionsData((prev) => {
          const current = prev[sessionKey] ?? createDefaultSessionData();
          return {
            ...prev,
            [sessionKey]: {
              ...current,
              registrations: [],
              registrationsLoading: false,
              registrationsError: result.error || "Failed to fetch registrations",
              showDetails: true,
            },
          };
        });
        return;
      }

      const registrations = Array.isArray(result.data) ? result.data : [];

      setSessionsData((prev) => {
        const current = prev[sessionKey] ?? createDefaultSessionData();
        return {
          ...prev,
          [sessionKey]: {
            ...current,
            registrations,
            registrationsLoading: false,
            registrationsError: null,
            showDetails: true,
          },
        };
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred while fetching registrations";
      setSessionsData((prev) => {
        const current = prev[sessionKey] ?? createDefaultSessionData();
        return {
          ...prev,
          [sessionKey]: {
            ...current,
            registrations: [],
            registrationsLoading: false,
            registrationsError: message,
            showDetails: true,
          },
        };
      });
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
        </div>

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
            const registrationsView = getNextEventRegistrations(sessionData.registrations);
            const participantsView = getLatestParticipantsEvent(sessionData.participants);
            const isParticipantsView = sessionData.activeView === "participants";
            const eventDate = isParticipantsView ? participantsView.eventDate : registrationsView.eventDate;
            const activeList = isParticipantsView ? participantsView.participants : registrationsView.registrations;
            const activeLoading = isParticipantsView ? sessionData.participantsLoading : sessionData.registrationsLoading;
            const activeError = isParticipantsView ? sessionData.participantsError : sessionData.registrationsError;
            const loadButtonLabel = activeList.length > 0 ? "Refresh" : "Show";
            const eventDateLabel = formatEventDateTime(eventDate);
            const eventDateLocalLabel = formatEventDateTimeLocal(eventDate);
            const participantsHistoryAvailable = isParticipantsView && participantsView.hasHistory;

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
                          total {isParticipantsView ? "participants" : "registrations"}
                        </p>
                      )}
                      {participantsHistoryAvailable && (
                        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous sessions archived
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="inline-flex rounded-lg border border-blue-200 dark:border-blue-800 p-1 bg-blue-50/50 dark:bg-blue-900/20">
                        {(["registrations", "participants"] as SessionView[]).map((view) => (
                          <button
                            key={view}
                            onClick={() => handleViewChange(session, view)}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                              sessionData.activeView === view
                                ? "bg-[#026fe2] text-white shadow-md"
                                : "text-[#026fe2] dark:text-blue-300 hover:bg-white/60 dark:hover:bg-blue-900/30"
                            }`}
                          >
                            {view === "registrations" ? "Registrations" : "Participants"}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          if (sessionData.activeView === "participants") {
                            fetchParticipants(session.id, session.key);
                          } else {
                            fetchRegistrations(session.id, session.key);
                          }
                        }}
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

                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => toggleDetails(session.key)}
                      className="px-4 py-2 border border-blue-200 dark:border-blue-700 text-[#026fe2] dark:text-blue-300 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-sm"
                    >
                      {sessionData.showDetails ? "Hide Details" : "Show Details"}
                    </button>
                    {!sessionData.showDetails && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 self-center">
                        Expand to view {sessionData.activeView === "participants" ? "participants" : "registrations"}.
            </p>
          )}
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
                  {sessionData.showDetails && !activeLoading && !activeError && (
                    <div className="mt-4 space-y-4">
                      {activeList.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-sm">
                            No {isParticipantsView ? "participants" : "registrations"} found for this webinar.
                          </p>
          </div>
                      ) : isParticipantsView ? (
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
                              {participantsView.participants.map((participant, indexWithinDate) => {
                                const name =
                                  participant.name ||
                                  (participant.first_name && participant.last_name
                                    ? `${participant.first_name} ${participant.last_name}`
                                    : participant.first_name || participant.last_name || "N/A");
                                const email = participant.user_email || participant.email || "N/A";
                                const phone = participant.phone_number || "N/A";
                                const joinTime = participant.join_time
                                  ? new Date(participant.join_time).toLocaleString()
                                  : "N/A";
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
                      ) : (
                        <div className="overflow-x-auto">
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
                                  Session Time
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">
                                  Registered
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-[#026fe2] dark:text-blue-400 uppercase tracking-wider">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-[#1F2A2E] divide-y divide-gray-200 dark:divide-gray-700">
                              {registrationsView.registrations.map((registrant, index) => {
                                const name =
                                  registrant.first_name || registrant.last_name
                                    ? `${registrant.first_name ?? ""} ${registrant.last_name ?? ""}`.trim() || "N/A"
                                    : "N/A";
                                const sessionTime = formatEventDateTime(parseIsoDate(registrant.start_time));
                                const registeredAt = registrant.registered_at
                                  ? new Date(registrant.registered_at).toLocaleString()
                                  : "N/A";
                                return (
                                  <tr key={registrant.registrant_id || `${session.key}-reg-${index}`} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{registrant.email}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{registrant.phone_number || "N/A"}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                      {sessionTime || "TBD"}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{registeredAt}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                      <span
                                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                          registrant.status === "in_meeting"
                                            ? "bg-green-100 text-green-700"
                                            : registrant.status === "not_attended"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-gray-100 text-gray-700"
                                        }`}
                                      >
                                        {registrant.status ? registrant.status.replace("_", " ") : registrant.joined ? "Attended" : "Registered"}
                                      </span>
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

