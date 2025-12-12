/**
 * API Configuration
 * 
 * Update the BASE_URL with your backend API URL
 * Example: 'https://your-backend-api.com/api' or 'http://localhost:3001/api'
 */

export const API_CONFIG = {
  // ⚠️ IMPORTANT: Replace this with your actual backend API URL
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://testbackend-hcoy.onrender.com/api',
  // BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://creditor.onrender.com/api',
  // Timeout in milliseconds
  TIMEOUT: 30000,
};

/**
 * API Endpoints for Zoom Webinar Integration
 */
export const API_ENDPOINTS = {
  // Register user for webinar and send session link via email
  REGISTER_WEBINAR: (webinarId: string) => `/webinars/${webinarId}/registrants`,
  
  // Get list of registered users
  GET_REGISTRANTS: (webinarId: string) => `/webinars/${webinarId}/registrants`,
  
  // Get participants who joined the session (after session ends)
  GET_PARTICIPANTS: (webinarId: string) => `/past_webinars/${webinarId}/participants`,
  
  // Send "You Missed the Session" email
  SEND_MISSED_EMAIL: '/emails/missed-session',
  
  // Send feedback email to users who joined
  SEND_FEEDBACK_EMAIL: '/emails/feedback',
  
  // Get webinar details
  GET_WEBINAR: (webinarId: string) => `/webinars/${webinarId}`,
};

/**
 * Default Webinar ID
 * Update this with your actual Zoom webinar ID
 */
export const DEFAULT_WEBINAR_ID = process.env.NEXT_PUBLIC_WEBINAR_ID || '85345478550';

