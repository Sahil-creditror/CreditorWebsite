export const RECENT_REGISTRATION_LIMIT = 50;

export type RegistrationLike = {
  registered_at?: string | null;
  start_time?: string | null;
  registration_time?: string;
  date?: string;
};

export function getRegistrationTimestamp(reg: RegistrationLike): number {
  const candidates = [reg.registration_time, reg.registered_at, reg.start_time, reg.date];

  for (const value of candidates) {
    if (value && typeof value === "string") {
      const ts = Date.parse(value);
      if (!Number.isNaN(ts)) return ts;
    }
  }

  return 0;
}

export function sortRegistrationsByRecent<T extends RegistrationLike>(registrations: T[]): T[] {
  return [...registrations].sort((a, b) => getRegistrationTimestamp(b) - getRegistrationTimestamp(a));
}

export function limitRecentRegistrations<T extends RegistrationLike>(
  registrations: T[],
  limit = RECENT_REGISTRATION_LIMIT
): T[] {
  return sortRegistrationsByRecent(registrations).slice(0, limit);
}
