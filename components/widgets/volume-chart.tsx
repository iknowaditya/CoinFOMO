"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCryptoContext } from "@/contexts/CryptoContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export function VolumeChart() {
  const { historicalData, selectedCrypto, isHistoricalLoading } =
    useCryptoContext();

  if (isHistoricalLoading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  if (!historicalData?.total_volumes) {
    return null;
  }

  const data = historicalData.total_volumes.map(([timestamp, volume]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    volume: volume / 1e6, // Convert to millions
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Volume</CardTitle>
        <CardDescription>24h trading volume over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${value}M`} width={80} />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toFixed(2)}M`,
                  "Volume",
                ]}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorVolume)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
