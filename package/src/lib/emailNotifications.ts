/**
 * Email Notification Service
 * 
 * This module handles automated email notifications for webinar participants.
 * These functions should be called at appropriate times (typically via cron jobs or scheduled tasks).
 */

import {
  getWebinarRegistrants,
  getSessionParticipants,
  sendMissedSessionEmail,
  sendFeedbackEmail,
  Registrant,
  Participant,
} from './api';

/**
 * Process post-webinar emails
 * This should be called after a webinar ends (e.g., 30 minutes after scheduled end time)
 * 
 * @param webinarId - The Zoom webinar ID
 * @returns Object with success status and details
 */
export async function processPostWebinarEmails(webinarId: string): Promise<{
  success: boolean;
  missedEmailsSent: number;
  feedbackEmailsSent: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let missedEmailsSent = 0;
  let feedbackEmailsSent = 0;

  try {
    // 1. Get all registrants
    const registrantsResult = await getWebinarRegistrants(webinarId);
    if (!registrantsResult.success || !registrantsResult.data) {
      errors.push('Failed to fetch registrants: ' + registrantsResult.error);
      return { success: false, missedEmailsSent: 0, feedbackEmailsSent: 0, errors };
    }

    const registrants = registrantsResult.data;
    const registrantEmails = new Set(registrants.map(r => r.email.toLowerCase()));

    // 2. Get all participants (who actually joined)
    const participantsResult = await getSessionParticipants(webinarId);
    if (!participantsResult.success || !participantsResult.data) {
      errors.push('Failed to fetch participants: ' + participantsResult.error);
      return { success: false, missedEmailsSent: 0, feedbackEmailsSent: 0, errors };
    }

    const participants = participantsResult.data;
    const participantEmails = new Set(participants.map(p => p.user_email.toLowerCase()));

    // 3. Find who missed the session (registered but didn't join)
    const missedEmails = Array.from(registrantEmails).filter(
      email => !participantEmails.has(email)
    );

    // 4. Send "You Missed the Session" emails
    if (missedEmails.length > 0) {
      const missedResult = await sendMissedSessionEmail({
        webinar_id: webinarId,
        registrant_emails: missedEmails,
      });

      if (missedResult.success && missedResult.data) {
        missedEmailsSent = missedResult.data.sent;
      } else {
        errors.push('Failed to send missed session emails: ' + missedResult.error);
      }
    }

    // 5. Send feedback emails to participants
    if (participantEmails.size > 0) {
      const feedbackResult = await sendFeedbackEmail({
        webinar_id: webinarId,
        participant_emails: Array.from(participantEmails),
      });

      if (feedbackResult.success && feedbackResult.data) {
        feedbackEmailsSent = feedbackResult.data.sent;
      } else {
        errors.push('Failed to send feedback emails: ' + feedbackResult.error);
      }
    }

    return {
      success: errors.length === 0,
      missedEmailsSent,
      feedbackEmailsSent,
      errors,
    };
  } catch (error: any) {
    errors.push('Unexpected error: ' + error.message);
    return { success: false, missedEmailsSent: 0, feedbackEmailsSent: 0, errors };
  }
}

/**
 * Get statistics for a webinar
 * 
 * @param webinarId - The Zoom webinar ID
 * @returns Statistics object
 */
export async function getWebinarStats(webinarId: string): Promise<{
  success: boolean;
  stats?: {
    totalRegistrants: number;
    totalParticipants: number;
    attendanceRate: number;
    noShowCount: number;
  };
  error?: string;
}> {
  try {
    // Get registrants
    const registrantsResult = await getWebinarRegistrants(webinarId);
    if (!registrantsResult.success || !registrantsResult.data) {
      return {
        success: false,
        error: 'Failed to fetch registrants: ' + registrantsResult.error,
      };
    }

    // Get participants
    const participantsResult = await getSessionParticipants(webinarId);
    if (!participantsResult.success || !participantsResult.data) {
      return {
        success: false,
        error: 'Failed to fetch participants: ' + participantsResult.error,
      };
    }

    const totalRegistrants = registrantsResult.data.length;
    const totalParticipants = participantsResult.data.length;
    const attendanceRate = totalRegistrants > 0 
      ? (totalParticipants / totalRegistrants) * 100 
      : 0;
    const noShowCount = totalRegistrants - totalParticipants;

    return {
      success: true,
      stats: {
        totalRegistrants,
        totalParticipants,
        attendanceRate: Math.round(attendanceRate * 100) / 100,
        noShowCount,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: 'Unexpected error: ' + error.message,
    };
  }
}

/**
 * Helper to check if a webinar has ended
 * 
 * @param startTime - ISO 8601 start time string
 * @param durationMinutes - Duration in minutes
 * @param bufferMinutes - Buffer time after end (default 30 minutes)
 * @returns true if webinar has ended (including buffer)
 */
export function hasWebinarEnded(
  startTime: string,
  durationMinutes: number,
  bufferMinutes: number = 30
): boolean {
  const start = new Date(startTime).getTime();
  const end = start + (durationMinutes + bufferMinutes) * 60 * 1000;
  return Date.now() >= end;
}

