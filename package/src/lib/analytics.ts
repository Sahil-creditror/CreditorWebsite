/**
 * Centralized Analytics & Conversion Event Dispatcher
 * Safely dispatches custom events to Google Tag Manager (dataLayer),
 * Google Analytics (gtag), and Meta Pixel (fbq).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "webinar_modal_open"
  | "course_track_select"
  | "webinar_registration_submit"
  | "lms_outbound_click"
  | "contact_form_submit";

export function trackEvent(
  eventName: AnalyticsEvent | string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event: eventName,
    ...params,
    timestamp: new Date().toISOString(),
  };

  // Google Tag Manager (dataLayer)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  // Google Analytics (gtag)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Meta Pixel (fbq)
  if (typeof window.fbq === "function") {
    if (eventName === "webinar_registration_submit" || eventName === "contact_form_submit") {
      window.fbq("track", "Lead", params);
    } else if (eventName === "lms_outbound_click") {
      window.fbq("track", "InitiateCheckout", params);
    } else {
      window.fbq("trackCustom", eventName, params);
    }
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug(`[Analytics] ${eventName}:`, eventPayload);
  }
}

export const analytics = {
  trackWebinarModalOpen: (source?: string) =>
    trackEvent("webinar_modal_open", { source: source || "unknown" }),

  trackCourseTrackSelect: (courseName: string) =>
    trackEvent("course_track_select", { course: courseName }),

  trackWebinarRegistrationSubmit: (details: { format: string; sessionTime?: string }) =>
    trackEvent("webinar_registration_submit", details),

  trackLmsOutboundClick: (planOrCourse: string, destinationUrl: string) =>
    trackEvent("lms_outbound_click", { target: planOrCourse, destination: destinationUrl }),

  trackContactFormSubmit: (purpose: string) =>
    trackEvent("contact_form_submit", { purpose }),
};

