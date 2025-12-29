import nodemailer from "nodemailer";

/**
 * Email service for sending notifications to team members
 */

interface TeamNotificationData {
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  meetingLink: string;
  sessionDate?: string;
  webinarId?: string;
}

/**
 * Get the email transporter configured from environment variables
 * Optimized for Gmail SMTP with proper connection settings
 */
function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined;
  const secure = process.env.SMTP_SECURE === "true"; // true for 465, false for other ports
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD;

  if (!host) {
    throw new Error("SMTP_HOST is not configured. Please set SMTP_HOST in environment variables.");
  }

  if (!port) {
    throw new Error("SMTP_PORT is not configured. Please set SMTP_PORT in environment variables.");
  }

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASS in environment variables.");
  }

  console.log(`[EMAIL] Configuring SMTP transporter for: ${user}`);
  console.log(`[EMAIL] Host: ${host}, Port: ${port}, Secure: ${secure}`);

  // Gmail SMTP configuration optimized for reliability
  // Disable connection pooling to avoid timeout issues
  const transporterConfig: any = {
    host,
    port,
    secure, // false for 587 (uses STARTTLS), true for 465 (SSL)
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
    // Gmail-specific TLS settings
    tls: {
      // Gmail requires valid certificates
      rejectUnauthorized: true,
      // Use modern TLS
      minVersion: "TLSv1.2",
    },
    // Increased timeout settings for Gmail
    connectionTimeout: 30000, // 30 seconds
    socketTimeout: 30000, // 30 seconds
    greetingTimeout: 15000, // 15 seconds
    // Disable connection pooling - can cause timeout issues
    pool: false,
  };

  // Add debug options only in development
  if (process.env.NODE_ENV === "development") {
    transporterConfig.debug = true;
    transporterConfig.logger = true;
  }

  return nodemailer.createTransport(transporterConfig);
}

/**
 * Get team email addresses from environment variable
 * Format: comma-separated list of emails
 * Example: TEAM_EMAILS=team1@example.com,team2@example.com,team3@example.com
 */
function getTeamEmails(): string[] {
  const teamEmailsEnv = process.env.TEAM_EMAILS || process.env.WEBINAR_TEAM_EMAILS;
  
  if (!teamEmailsEnv) {
    console.warn("⚠️  TEAM_EMAILS environment variable not set. No team notifications will be sent.");
    return [];
  }

  // Split by comma and trim whitespace
  return teamEmailsEnv
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email.length > 0 && email.includes("@"));
}

/**
 * Format date/time string to PST timezone
 * Returns formatted string with both date and time like "Monday, January 15, 2024 at 11:15 AM PST"
 */
function formatToPST(dateString?: string): string | null {
  if (!dateString) return null;
  
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    
    // Format date part in PST timezone
    const datePart = date.toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    // Format time part in PST timezone
    const timePart = date.toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
    
    // Combine date and time
    return `${datePart} at ${timePart}`;
  } catch (error) {
    console.error("[EMAIL] Error formatting date to PST:", error);
    return null;
  }
}

/**
 * Generate HTML email template for team notification
 */
function generateTeamNotificationEmail(data: TeamNotificationData): string {
  const { attendeeName, attendeeEmail, attendeePhone, meetingLink, sessionDate } = data;
  const sessionTimePST = formatToPST(sessionDate);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Webinar Registration</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(to bottom, #001428 0%, #002b5c 30%, #026fe2 60%, #45beff 85%, #bfdbfe 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">New Webinar Registration</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #001428; margin-top: 0;">Attendee Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Name:</td>
            <td style="padding: 8px 0; color: #333;">${attendeeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0; color: #333;">${attendeeEmail}</td>
          </tr>
          ${attendeePhone ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 8px 0; color: #333;">${attendeePhone}</td>
          </tr>
          ` : ""}
          ${sessionTimePST ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Session Time:</td>
            <td style="padding: 8px 0; color: #333;">${sessionTimePST}</td>
          </tr>
          ` : ""}
        </table>
      </div>

      <div style="background: #fff; padding: 20px; border: 2px solid #026fe2; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #001428; margin-top: 0;">Meeting Link</h2>
        <p style="color: #666; margin-bottom: 15px;">
          Click the button below to join the webinar session and connect with the attendee:
        </p>
        <a href="${meetingLink}" 
           style="display: inline-block; background: #026fe2; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0;">
          Join Webinar Session
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 15px;">
          Or copy this link: <br>
          <span style="word-break: break-all; color: #666;">${meetingLink}</span>
        </p>
      </div>

      <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; border-radius: 4px; margin-bottom: 20px;">
        <p style="margin: 0; color: #856404;">
          <strong>Note:</strong> Please join the meeting at the scheduled time to connect with the attendee and answer their questions.
        </p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px; text-align: center;">
        <p>This is an automated notification from Creditor Academy Webinar System</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate plain text email for team notification
 */
function generateTeamNotificationText(data: TeamNotificationData): string {
  const { attendeeName, attendeeEmail, attendeePhone, meetingLink, sessionDate } = data;
  const sessionTimePST = formatToPST(sessionDate);

  return `
New Webinar Registration

Attendee Information:
- Name: ${attendeeName}
- Email: ${attendeeEmail}
${attendeePhone ? `- Phone: ${attendeePhone}` : ""}
${sessionTimePST ? `- Session Time: ${sessionTimePST}` : ""}

Meeting Link:
${meetingLink}

Please join the meeting at the scheduled time to connect with the attendee and answer their questions.

---
This is an automated notification from Creditor Academy Webinar System
  `.trim();
}

/**
 * Send email notification to team members when someone registers for a webinar
 */
export async function sendTeamNotificationEmail(data: TeamNotificationData): Promise<void> {
  console.log("[EMAIL] =================================================");
  console.log("[EMAIL] Starting team notification email process");
  console.log("[EMAIL] =================================================");
  
  // Check environment variables first
  console.log("[EMAIL] Checking environment variables...");
  console.log("[EMAIL] SMTP_USER:", process.env.SMTP_USER ? "✅ SET" : "❌ NOT SET");
  console.log("[EMAIL] SMTP_PASS:", process.env.SMTP_PASS ? "✅ SET" : "❌ NOT SET");
  console.log("[EMAIL] TEAM_EMAILS:", process.env.TEAM_EMAILS ? "✅ SET" : "❌ NOT SET");
  
  const teamEmails = getTeamEmails();
  console.log("[EMAIL] Parsed team emails:", teamEmails.length, "addresses");

  if (teamEmails.length === 0) {
    console.error("⚠️  No team emails configured. Skipping team notification.");
    console.error("⚠️  Please set TEAM_EMAILS in .env.local");
    return;
  }

  // Check if SMTP is configured
  if (!process.env.SMTP_USER && !process.env.EMAIL_USER) {
    console.log("═══════════════════════════════════════════════════");
    console.log("📧 EMAIL TEST MODE (SMTP not configured)");
    console.log("═══════════════════════════════════════════════════");
    console.log("Team Notification Email:");
    console.log("To:", teamEmails.join(", "));
    console.log("Subject: New Webinar Registration - " + data.attendeeName);
    console.log("Attendee:", data.attendeeName, `(${data.attendeeEmail})`);
    console.log("Meeting Link:", data.meetingLink);
    console.log("═══════════════════════════════════════════════════");
    console.log("⚠️  To actually send emails, add to .env.local:");
    console.log("   SMTP_HOST=smtp.gmail.com");
    console.log("   SMTP_PORT=587");
    console.log("   SMTP_SECURE=false");
    console.log("   SMTP_USER=your-email@example.com");
    console.log("   SMTP_PASS=your-app-password");
    console.log("   EMAIL_FROM=noreply@example.com");
    console.log("   TEAM_EMAILS=email1@example.com,email2@example.com");
    console.log("═══════════════════════════════════════════════════");
    return;
  }

  try {
    console.log("[EMAIL] Preparing to send team notification email...");
    console.log("[EMAIL] Recipients:", teamEmails.length, "team members");
    
    const transporter = getEmailTransporter();
    const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER;
    
    if (!fromEmail) {
      throw new Error("EMAIL_FROM is not configured. Please set EMAIL_FROM in environment variables.");
    }

    // Skip verification to avoid timeout - go straight to sending
    // Verification can sometimes pass but actual sending fails
    console.log("[EMAIL] Skipping connection verification (going straight to send)...");

    const mailOptions = {
      from: `"Creditor Academy" <${fromEmail}>`,
      to: teamEmails.join(", "),
      subject: `New Webinar Registration - ${data.attendeeName}`,
      text: generateTeamNotificationText(data),
      html: generateTeamNotificationEmail(data),
      // Add reply-to for better email handling
      replyTo: data.attendeeEmail,
      // Gmail-specific headers
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        "Importance": "high",
      },
    };

    console.log("[EMAIL] Sending email to team members...");
    console.log("[EMAIL] From:", fromEmail);
    console.log("[EMAIL] To:", teamEmails.join(", "));
    console.log("[EMAIL] Subject: New Webinar Registration - " + data.attendeeName);
    
    // Send email with increased timeout
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Email send timeout after 30 seconds")), 30000)
      )
    ]) as any;
    
    console.log("═══════════════════════════════════════════════════");
    console.log("✅ Team notification email sent successfully!");
    console.log("═══════════════════════════════════════════════════");
    console.log("Message ID:", info.messageId);
    console.log("From:", fromEmail);
    console.log("Sent to:", teamEmails.length, "recipients");
    console.log("Recipients:", teamEmails.join(", "));
    console.log("Attendee:", data.attendeeName, `(${data.attendeeEmail})`);
    console.log("Meeting Link:", data.meetingLink);
    console.log("═══════════════════════════════════════════════════");
  } catch (error: any) {
    console.error("═══════════════════════════════════════════════════");
    console.error("❌ Failed to send team notification email");
    console.error("═══════════════════════════════════════════════════");
    console.error("Error Message:", error.message);
    console.error("Error Code:", error.code || "N/A");
    
    if (error.code === "EAUTH") {
      console.error("⚠️  AUTHENTICATION FAILED");
      console.error("   - Check SMTP_USER and SMTP_PASS in .env.local");
      console.error("   - Make sure you're using Gmail App Password (not regular password)");
      console.error("   - For Gmail: Enable 2FA and generate App Password");
      console.error("   - App Password generator: https://myaccount.google.com/apppasswords");
      console.error("   - Current SMTP_USER:", process.env.SMTP_USER || "NOT SET");
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      console.error("⚠️  CONNECTION TIMEOUT");
      console.error("   - Check your internet connection");
      console.error("   - Verify SMTP_HOST and SMTP_PORT settings");
      console.error("   - Gmail SMTP: smtp.gmail.com:587");
      console.error("   - Firewall may be blocking the connection");
    } else if (error.code === "EENVELOPE") {
      console.error("⚠️  INVALID EMAIL ADDRESSES");
      console.error("   - Check TEAM_EMAILS configuration");
      console.error("   - Format: email1@example.com,email2@example.com");
      console.error("   - Current TEAM_EMAILS:", process.env.TEAM_EMAILS || "NOT SET");
    } else if (error.response) {
      console.error("⚠️  SMTP SERVER ERROR");
      console.error("   - Response Code:", error.responseCode);
      console.error("   - Response:", error.response);
    } else {
      console.error("⚠️  UNKNOWN ERROR");
      console.error("   - Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    }
    
    console.error("═══════════════════════════════════════════════════");
    console.error("⚠️  Registration will continue despite email failure.");
    console.error("═══════════════════════════════════════════════════");
  }
}

