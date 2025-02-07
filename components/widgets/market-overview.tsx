"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCryptoContext } from "@/contexts/CryptoContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface LabelProps {
  viewBox: {
    cx: number;
    cy: number;
  };
}

export function MarketOverview() {
  const { cryptos, isLoading } = useCryptoContext();

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--destructive))",
    "hsl(var(--muted))",
  ];

  const marketCapData = useMemo(() => {
    if (!cryptos) return [];
    return cryptos
      .slice(0, 5)
      .map((crypto) => ({
        name: crypto.symbol.toUpperCase(),
        value: crypto.market_cap,
      }))
      .sort((a, b) => b.value - a.value);
  }, [cryptos]);

  const totalMarketCap = marketCapData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const totalVolume =
    cryptos
      ?.slice(0, 5)
      .reduce((sum, crypto) => sum + crypto.total_volume, 0) ?? 0;

  if (isLoading) {
    return <Skeleton className="h-[500px] w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Market capitalization distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Market Cap</p>
              <p className="text-2xl font-bold">
                ${(totalMarketCap / 1e9).toFixed(2)}B
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-2xl font-bold">
                ${(totalVolume / 1e9).toFixed(2)}B
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">BTC Dominance</p>
              <p className="text-2xl font-bold">
                {(
                  ((marketCapData[0]?.value || 0) / totalMarketCap) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={marketCapData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  cornerRadius={4}
                  dataKey="value"
                >
                  {marketCapData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      stroke="hsl(var(--background))"
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-foreground font-medium"
                >
                  <tspan
                    x="50%"
                    dy="-0.5em"
                    className="text-sm fill-muted-foreground"
                  >
                    Total Cap
                  </tspan>
                  <tspan x="50%" dy="1.5em" className="text-lg font-bold">
                    ${(totalMarketCap / 1e9).toFixed(2)}B
                  </tspan>
                </text>
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ background: payload[0].color }}
                          />
                          <span className="font-medium">{data.name}</span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          ${(data.value / 1e9).toFixed(2)}B
                        </div>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  content={({ payload }) => (
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {payload?.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ background: entry.color }}
                          />
                          <span className="text-sm">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
