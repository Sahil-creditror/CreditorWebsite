/**
 * API Route: Process Webinar Emails
 * 
 * This endpoint can be called by a cron job or scheduled task to process
 * post-webinar emails (missed session and feedback emails).
 * 
 * Usage:
 * POST /api/process-webinar-emails
 * Body: { "webinarId": "YOUR_WEBINAR_ID" }
 * 
 * You can set up a cron job service (like Vercel Cron, AWS EventBridge, or any external cron service)
 * to call this endpoint after each webinar ends.
 */

import { NextRequest, NextResponse } from 'next/server';
import { processPostWebinarEmails } from '@/lib/emailNotifications';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { webinarId } = body;

    if (!webinarId) {
      return NextResponse.json(
        { error: 'webinarId is required' },
        { status: 400 }
      );
    }

    // Optional: Add authentication/authorization here
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Process emails
    const result = await processPostWebinarEmails(webinarId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Emails processed successfully',
        missedEmailsSent: result.missedEmailsSent,
        feedbackEmailsSent: result.feedbackEmailsSent,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Some errors occurred',
        missedEmailsSent: result.missedEmailsSent,
        feedbackEmailsSent: result.feedbackEmailsSent,
        errors: result.errors,
      }, { status: 207 }); // 207 Multi-Status
    }
  } catch (error: any) {
    console.error('Error processing webinar emails:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check status
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Webinar email processing endpoint',
    usage: 'POST with { "webinarId": "YOUR_WEBINAR_ID" }',
  });
}

