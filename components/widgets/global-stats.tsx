"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCryptoContext } from "@/contexts/CryptoContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function GlobalStats() {
  const { cryptos, isLoading } = useCryptoContext();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[180px]" />
          <Skeleton className="h-4 w-[280px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  const dominanceData = cryptos
    ?.slice(0, 10)
    .map((coin) => ({
      name: coin.symbol.toUpperCase(),
      marketCap: coin.market_cap / 1e9, // Convert to billions
      volume: coin.total_volume / 1e9, // Convert to billions
    }))
    .sort((a, b) => b.marketCap - a.marketCap);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Dominance</CardTitle>
        <CardDescription>Top cryptocurrencies by market share</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dominanceData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis type="number" tickFormatter={(value) => `$${value}B`} />
              <YAxis
                dataKey="name"
                type="category"
                width={50}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}B`]}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
                cursor={{ fill: "hsl(var(--accent))" }}
              />
              <Bar
                dataKey="marketCap"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
