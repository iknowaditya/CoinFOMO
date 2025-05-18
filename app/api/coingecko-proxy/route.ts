import { NextRequest } from "next/server";

// ====== In-memory rate limiting (per IP) ======
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // max 10 requests per minute per IP
const requestCounts: Record<string, { count: number; timestamp: number }> = {};

export async function GET(request: NextRequest) {
  // Get client IP from x-forwarded-for header, fallback to 127.0.0.1
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

  // Rate limiting logic
  const now = Date.now();
  if (
    !requestCounts[ip] ||
    now - requestCounts[ip].timestamp > RATE_LIMIT_WINDOW
  ) {
    requestCounts[ip] = { count: 1, timestamp: now };
  } else {
    requestCounts[ip].count += 1;
  }
  if (requestCounts[ip].count > RATE_LIMIT_MAX) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please wait and try again.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // ====== Proxy logic ======
  const { searchParams } = request.nextUrl;
  const endpoint = searchParams.get("endpoint");
  if (!endpoint) {
    return new Response(
      JSON.stringify({ error: "Missing endpoint parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Build CoinGecko API URL
  searchParams.delete("endpoint");
  const coingeckoUrl = `https://api.coingecko.com/api/v3/${endpoint}${
    searchParams.toString() ? "?" + searchParams.toString() : ""
  }`;

  try {
    const response = await fetch(coingeckoUrl, {
      headers: {
        Accept: "application/json",
      },
      // Optionally, you can forward more headers if needed
      next: { revalidate: 30 }, // Cache for 30 seconds at the CDN (optional)
    });

    // Forward CoinGecko's response status and body
    const data = await response.text(); // Use text() to forward as-is
    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30", // Cache in browser for 30s (optional)
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch from CoinGecko" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
