/**
 * TradelineSupply API Route
 * 
 * SECURITY: This route handles all TradelineSupply API communication server-side.
 * Consumer key and secret are NEVER exposed to the browser.
 * 
 * Endpoint: GET /api/tradelines
 * 
 * Features:
 * - Server-side authentication with TradelineSupply
 * - In-memory caching (5-10 minutes)
 * - Error handling and rate limiting protection
 * - Compliance filtering (only approved & available tradelines)
 * - Markup application
 */

import { NextRequest, NextResponse } from "next/server";
import { getTradelines } from "@/lib/tradelineService";

// Simple rate limiting: track requests per IP
// In production, consider using Redis or a proper rate limiting library
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 requests per minute per IP

/**
 * Check if request exceeds rate limit
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    // Reset or create new record
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  // Check various headers for IP (handles proxies/load balancers)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

/**
 * GET /api/tradelines
 * 
 * Returns list of available tradelines from TradelineSupply
 * 
 * Response:
 * {
 *   success: true,
 *   tradelines: ProcessedTradeline[],
 *   cached: boolean
 * }
 * 
 * Errors:
 * - 429: Rate limit exceeded
 * - 500: Server error (API failure, missing credentials, etc.)
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Fetch tradelines (service handles caching internally)
    const tradelines = await getTradelines();

    // Log for debugging
    console.log(`[api/tradelines] Returning ${tradelines.length} tradelines`);
    if (tradelines.length > 0) {
      console.log(`[api/tradelines] Sample tradeline:`, {
        id: tradelines[0].id,
        bankName: tradelines[0].bankName,
        price: tradelines[0].price,
        creditLimit: tradelines[0].creditLimit,
      });
    }

    return NextResponse.json(
      {
        success: true,
        tradelines,
        count: tradelines.length,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // 5 min cache, 10 min stale
        },
      }
    );
  } catch (error: any) {
    console.error("[api/tradelines] Error:", error);

    // Don't expose internal error details to client
    const errorMessage =
      error.message || "Failed to fetch tradelines. Please try again later.";

    // Check if it's a configuration error
    if (errorMessage.includes("credentials not configured")) {
      return NextResponse.json(
        {
          success: false,
          error: "Tradeline service is not properly configured.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Only allow GET requests
export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
