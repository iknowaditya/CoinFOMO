"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FearGreedData {
  value: string;
  value_classification: string;
  timestamp: string;
}

interface APIResponse {
  data: FearGreedData[];
  metadata: {
    error: null | string;
  };
}

export function FearGreedIndex() {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_FEAR_GREED_API_URL;
        if (!API_URL) {
          throw new Error("Fear & Greed API URL not configured");
        }

        const response = await fetch(`${API_URL}?limit=1&format=json`);
        const result: APIResponse = await response.json();

        if (result.metadata.error) {
          throw new Error(result.metadata.error);
        }

        setData(result.data[0]);
      } catch (err) {
        console.error("Error fetching fear & greed index:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-[180px] mb-2" />
          <Skeleton className="h-4 w-[150px]" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fear & Greed Index</CardTitle>
          <CardDescription>Market sentiment indicator</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            Failed to load data. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  const getColor = (value: number) => {
    if (value >= 80) return "text-green-500";
    if (value >= 60) return "text-green-400";
    if (value >= 40) return "text-yellow-500";
    if (value >= 20) return "text-orange-500";
    return "text-red-500";
  };

  const getValue = () => {
    const numericValue = parseInt(data?.value || "0");
    return {
      value: numericValue,
      color: getColor(numericValue),
    };
  };

  const { value, color } = getValue();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fear & Greed Index</CardTitle>
        <CardDescription>Crypto market sentiment indicator</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div
            className={`text-5xl font-bold ${color} transition-colors duration-300`}
          >
            {value}
          </div>
          <div className="text-xl font-medium text-center">
            {data?.value_classification}
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date(parseInt(data?.timestamp || "0") * 1000).toLocaleString()}
          </div>
          <div className="w-full max-w-md grid grid-cols-5 gap-2 text-xs text-center">
            <div className="text-red-500">Extreme Fear</div>
            <div className="text-orange-500">Fear</div>
            <div className="text-yellow-500">Neutral</div>
            <div className="text-green-400">Greed</div>
            <div className="text-green-500">Extreme Greed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
