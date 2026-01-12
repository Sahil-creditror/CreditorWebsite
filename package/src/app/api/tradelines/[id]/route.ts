/**
 * Get Single Tradeline by ID
 * 
 * Endpoint: GET /api/tradelines/[id]
 * 
 * Returns a single tradeline by ID from the API
 */

import { NextRequest, NextResponse } from "next/server";
import { getTradelines } from "@/lib/tradelineService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Remove 'tl-' prefix if present
    const tradelineId = id.startsWith("tl-") ? id.substring(3) : id;

    // Fetch all tradelines (uses cache)
    const tradelines = await getTradelines();

    // Find the tradeline by id or tradelineId
    const tradeline = tradelines.find(
      (t) => t.id === id || t.tradelineId === tradelineId || t.id === tradelineId
    );

    if (!tradeline) {
      return NextResponse.json(
        {
          success: false,
          error: "Tradeline not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        tradeline,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error: any) {
    console.error("[api/tradelines/[id]] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch tradeline",
      },
      { status: 500 }
    );
  }
}
