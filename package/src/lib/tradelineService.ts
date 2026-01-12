/**
 * TradelineSupply Service Layer
 * 
 * SECURITY: This file must NEVER be imported into client components.
 * All TradelineSupply API calls are server-side only.
 * 
 * This service handles:
 * - OAuth 1.0 authentication with TradelineSupply using consumer key + secret
 * - Fetching live tradeline list from WooCommerce REST API
 * - Applying markup percentage
 * - Filtering available tradelines (stock > 0)
 * - Removing non-compliant fields
 * 
 * Based on TradelineSupply PHP reference implementation.
 */

import crypto from "crypto";

// In-memory cache for tradeline data
// Cache expires after 5-10 minutes to balance freshness and API rate limits
interface CacheEntry {
  data: ProcessedTradeline[];
  timestamp: number;
}

let tradelineCache: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes (adjustable to 10 minutes if needed)

/**
 * Raw tradeline data from TradelineSupply API
 * Based on actual API response structure from /wp-json/wc/v3/pricing
 */
interface TradelineSupplyRawTradeline {
  image?: string;
  bank_name: string;
  card_id: string;
  credit_limit: string;
  credit_limit_original?: number;
  date_opened: string;
  date_opened_original?: number | string;
  purchase_deadline: string;
  purchase_deadline_original?: number | string;
  reporting_period: string;
  reporting_period_original?: number | string;
  stock: number;
  price: number;
  [key: string]: any; // Allow other fields but we'll filter them
}

/**
 * Processed tradeline data for frontend consumption
 * Only includes compliant, safe fields
 */
export interface ProcessedTradeline {
  id: string;
  tradelineId: string; // card_id from API
  bankName: string;
  last4: string; // Extracted from card_id if available
  ageYears: number; // Calculated from date_opened
  creditLimit: number;
  utilizationPercent: number; // Default to 0, not provided by API
  statementDate: string; // reporting_period
  price: number; // Price after markup applied
  slotsTotal: number; // Default
  slotsAvailable: number; // stock from API
  notes?: string;
}

/**
 * Get TradelineSupply API endpoint URL
 */
function getTradelineSupplyEndpoint(): string {
  return (
    process.env.TRADELINE_API_BASE_URL ||
    process.env.TRADELINE_BASE_URL ||
    "https://tradelinesupply.com/wp-json/wc/v3/pricing"
  );
}

/**
 * URL encode according to RFC 3986 (used by OAuth 1.0)
 * Matches PHP wc_rest_urlencode_rfc3986 function
 */
function wcRestUrlEncodeRfc3986(value: string): string {
  return encodeURIComponent(value)
    .replace(/%20/g, "+")
    .replace(/%7E/g, "~")
    .replace(/\+/g, "%20")
    .replace(/%7E/g, "~");
}

/**
 * Join parameters with equals sign (for OAuth signature)
 * Matches PHP join_with_equals_sign function
 */
function joinWithEqualsSign(
  params: Record<string, string | number>,
  queryParams: string[] = [],
  key = ""
): string[] {
  const result: string[] = [...queryParams];
  
  for (const [paramKey, paramValue] of Object.entries(params)) {
    let finalKey = paramKey;
    if (key) {
      finalKey = `${key}%5B${paramKey}%5D`; // Handle multi-dimensional array
    }
    const string = `${finalKey}=${paramValue}`;
    result.push(wcRestUrlEncodeRfc3986(string));
  }
  
  return result;
}

/**
 * Generate OAuth 1.0 signature for TradelineSupply API
 * Based on TradelineSupply PHP reference implementation
 * Matches the exact PHP logic from index.php
 */
function generateOAuthSignature(
  url: string,
  consumerKey: string,
  consumerSecret: string
): string {
  const timestamp = Math.floor(Date.now() / 1000);
  
  // OAuth parameters (must match PHP implementation exactly)
  const params: Record<string, string | number> = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: timestamp,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp,
  };

  // Build query string for URL (unencoded for query string)
  const query: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    query.push(`${key}=${value}`);
  }

  // Build string to sign (must match PHP logic)
  const httpMethod = "GET";
  const baseRequestUri = encodeURIComponent(url); // rawurlencode in PHP
  
  // Normalize parameters and join with equals sign, then join with &
  const normalizedParams = joinWithEqualsSign(params);
  const queryString = normalizedParams.join("%26"); // Join with & (encoded)
  const stringToSign = `${httpMethod}&${baseRequestUri}&${queryString}`;

  // Generate signature
  const hashAlgorithm = "sha1";
  const secret = `${consumerSecret}&`;
  const signature = crypto
    .createHmac(hashAlgorithm, secret)
    .update(stringToSign)
    .digest("base64");

  // Build final URL with OAuth parameters (query string, not encoded)
  const authQuery = query.join("&") + `&oauth_signature=${signature}`;
  return `${url}?${authQuery}`;
}

/**
 * Calculate age in years from date opened
 */
function calculateAgeYears(dateOpened: string | number | undefined): number {
  if (!dateOpened) return 0;
  
  let date: Date;
  if (typeof dateOpened === "number") {
    // Unix timestamp (seconds)
    date = new Date(dateOpened * 1000);
  } else if (typeof dateOpened === "string") {
    // Try to parse date string
    date = new Date(dateOpened);
  } else {
    return 0;
  }

  if (isNaN(date.getTime())) return 0;

  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffYears);
}

/**
 * Extract last 4 digits from card_id
 */
function extractLast4(cardId: string): string {
  if (!cardId) return "0000";
  const cleaned = cardId.replace(/\D/g, ""); // Remove non-digits
  return cleaned.slice(-4).padStart(4, "0");
}

/**
 * Parse credit limit from string (e.g., "$15,000" -> 15000)
 */
function parseCreditLimit(creditLimit: string | number): number {
  if (typeof creditLimit === "number") return creditLimit;
  if (!creditLimit) return 0;
  
  // Handle string numbers (like "23000")
  const str = String(creditLimit).trim();
  
  // Remove currency symbols, commas, spaces, and HTML tags
  const cleaned = str
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[$, ]/g, "") // Remove currency symbols and spaces
    .replace(/[^\d.]/g, ""); // Remove everything except digits and decimal point
    
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Fetch tradelines from TradelineSupply API
 * 
 * COMPLIANCE: Only fetches tradelines with stock > 0
 * Removes any fields that could be non-compliant
 */
async function fetchTradelinesFromAPI(): Promise<ProcessedTradeline[]> {
  const consumerKey = process.env.TRADELINE_CONSUMER_KEY;
  const consumerSecret = process.env.TRADELINE_CONSUMER_SECRET;
  const markupPercent = parseFloat(process.env.TRADELINE_MARKUP_PERCENT || "0");

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "TradelineSupply credentials not configured. Set TRADELINE_CONSUMER_KEY and TRADELINE_CONSUMER_SECRET environment variables."
    );
  }

  const baseUrl = getTradelineSupplyEndpoint();
  
  // Generate OAuth 1.0 signed URL
  const signedUrl = generateOAuthSignature(baseUrl, consumerKey, consumerSecret);

  try {
    const response = await fetch(signedUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "cache-control": "no-cache",
      },
      // Server-side fetch should not cache
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `TradelineSupply API error: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const data = await response.json();

    // Log the raw response for debugging (remove in production if needed)
    console.log("[tradelineService] API Response:", JSON.stringify(data).substring(0, 500));

    // TradelineSupply API returns an array directly
    if (!Array.isArray(data)) {
      console.error("[tradelineService] Unexpected response structure:", typeof data, Object.keys(data || {}));
      throw new Error("Unexpected TradelineSupply API response structure - expected array");
    }

    const rawTradelines: TradelineSupplyRawTradeline[] = data;
    
    // Log sample tradeline for debugging
    if (rawTradelines.length > 0) {
      console.log("[tradelineService] Sample raw tradeline:", JSON.stringify(rawTradelines[0]).substring(0, 300));
    }

    // Process and filter tradelines
    const processed: ProcessedTradeline[] = rawTradelines
      .filter((tl) => {
        // Only include tradelines with stock > 0
        // Check if price exists (could be price, base_price, or other field names)
        const hasPrice = tl.price !== undefined && tl.price !== null && Number(tl.price) > 0;
        const hasStock = tl.stock !== undefined && tl.stock !== null && Number(tl.stock) > 0;
        return hasStock && hasPrice;
      })
      .map((tl, index) => {
        // Extract price from various possible field names
        // The API might use: price, base_price, cost, amount, etc.
        let basePrice = 0;
        if (tl.price !== undefined && tl.price !== null) {
          basePrice = typeof tl.price === "number" ? tl.price : parseFloat(String(tl.price)) || 0;
        } else if ((tl as any).base_price !== undefined) {
          basePrice = typeof (tl as any).base_price === "number" 
            ? (tl as any).base_price 
            : parseFloat(String((tl as any).base_price)) || 0;
        }
        
        // If still no price, log warning but don't filter out (we'll use 0 as fallback)
        if (basePrice === 0) {
          console.warn("[tradelineService] No price found for tradeline:", tl.card_id, "Available fields:", Object.keys(tl));
          // Try to find price in other possible fields
          const possiblePriceFields = ['cost', 'amount', 'base_price', 'unit_price'];
          for (const field of possiblePriceFields) {
            if ((tl as any)[field] !== undefined) {
              const altPrice = typeof (tl as any)[field] === "number" 
                ? (tl as any)[field] 
                : parseFloat(String((tl as any)[field])) || 0;
              if (altPrice > 0) {
                basePrice = altPrice;
                console.log(`[tradelineService] Found price in field '${field}':`, basePrice);
                break;
              }
            }
          }
        }
        
        // Apply markup to price
        const priceWithMarkup = basePrice * (1 + markupPercent / 100);

        // Calculate age from date_opened
        const ageYears = calculateAgeYears(tl.date_opened_original || tl.date_opened);

        // Parse credit limit - handle string numbers
        const creditLimitValue = tl.credit_limit_original || tl.credit_limit || "0";
        const creditLimit = parseCreditLimit(creditLimitValue);

        // Extract last 4 from card_id
        const last4 = extractLast4(tl.card_id);

        // Ensure we have valid data - log if missing
        const bankName = tl.bank_name?.trim() || "Unknown Bank";
        if (bankName === "Unknown Bank") {
          console.warn("[tradelineService] Missing bank_name for tradeline:", tl.card_id);
        }

        return {
          id: `tl-${tl.card_id || `index-${index}`}`,
          tradelineId: String(tl.card_id || ""),
          bankName,
          last4,
          ageYears,
          creditLimit,
          utilizationPercent: 0, // Not provided by API, default to 0
          statementDate: String(tl.reporting_period || tl.reporting_period_original || "N/A"),
          price: Math.round(priceWithMarkup * 100) / 100, // Round to 2 decimal places
          slotsTotal: Math.max(tl.stock + 5, tl.stock), // Estimate total slots (API only provides current stock)
          slotsAvailable: tl.stock,
        };
      })
      .filter((tl) => {
        // Only filter out if critical fields are missing
        // Allow items with price = 0 to pass through (will show warning on frontend)
        const hasValidId = tl.tradelineId !== "" && tl.tradelineId !== "undefined";
        const hasCreditLimit = tl.creditLimit > 0;
        const hasStock = tl.slotsAvailable > 0;
        
        if (!hasValidId || !hasStock) {
          console.warn("[tradelineService] Filtering out tradeline:", {
            id: tl.id,
            tradelineId: tl.tradelineId,
            stock: tl.slotsAvailable,
          });
        }
        
        return hasValidId && hasStock;
      });

    return processed;
  } catch (error: any) {
    console.error("[tradelineService] Error fetching tradelines:", error);
    throw new Error(
      `Failed to fetch tradelines: ${error.message || "Unknown error"}`
    );
  }
}

/**
 * Get tradelines with caching
 * 
 * Returns cached data if available and fresh, otherwise fetches from API
 */
export async function getTradelines(): Promise<ProcessedTradeline[]> {
  // Check cache
  if (tradelineCache) {
    const age = Date.now() - tradelineCache.timestamp;
    if (age < CACHE_TTL_MS) {
      return tradelineCache.data;
    }
  }

  // Fetch fresh data
  const tradelines = await fetchTradelinesFromAPI();

  // Update cache
  tradelineCache = {
    data: tradelines,
    timestamp: Date.now(),
  };

  return tradelines;
}

/**
 * Clear the tradeline cache (useful for testing or manual refresh)
 */
export function clearTradelineCache(): void {
  tradelineCache = null;
}
