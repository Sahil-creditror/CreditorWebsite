/**
 * API Route: Get Webinar Statistics
 * 
 * This endpoint retrieves statistics for a webinar including
 * registrant count, participant count, and attendance rate.
 * 
 * Usage:
 * GET /api/webinar-stats?webinarId=YOUR_WEBINAR_ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { getWebinarStats } from '@/lib/emailNotifications';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const webinarId = searchParams.get('webinarId');

    if (!webinarId) {
      return NextResponse.json(
        { error: 'webinarId query parameter is required' },
        { status: 400 }
      );
    }

    const result = await getWebinarStats(webinarId);

    if (result.success && result.stats) {
      return NextResponse.json({
        success: true,
        stats: result.stats,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error fetching webinar stats:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

