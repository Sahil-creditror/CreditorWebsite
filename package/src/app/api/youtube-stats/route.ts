import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = "AIzaSyCJKDRtak743c9fOKLhZYnnZi_PncFjov0";
  const CHANNEL_ID = "UCl_FM9KmhMA-DV6OTgr42Dw";

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    const data = await res.json();
    const stats = data.items[0].statistics;

    return NextResponse.json({
      viewCount: parseInt(stats.viewCount, 10),
      subscriberCount: parseInt(stats.subscriberCount, 10),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch YouTube stats" },
      { status: 500 }
    );
  }
}
