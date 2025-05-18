// app/api/news/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://cryptopanic.com/api/free/v1/posts/?auth_token=${process.env.CRYPTO_NEWS_API_TOKEN}&filter=rising`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
