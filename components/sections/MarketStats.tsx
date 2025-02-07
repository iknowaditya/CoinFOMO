"use client";

import React from "react";
import { formatLargeNumber } from "@/lib/utils";
import { DollarSign, Volume2, CoinsIcon, Wallet } from "lucide-react";

interface MarketStatsProps {
  marketCap: number;
  volume: number;
  circulatingSupply: number;
  totalSupply: number | null;
  symbol: string;
}

const MarketStats = ({
  marketCap,
  volume,
  circulatingSupply,
  totalSupply,
  symbol,
}: MarketStatsProps) => {
  const stats = [
    {
      icon: <DollarSign className="h-4 w-4 text-zinc-500" />,
      label: "Market Cap",
      value: formatLargeNumber(marketCap),
    },
    {
      icon: <Volume2 className="h-4 w-4 text-zinc-500" />,
      label: "24h Volume",
      value: formatLargeNumber(volume),
    },
    {
      icon: <CoinsIcon className="h-4 w-4 text-zinc-500" />,
      label: "Circulating Supply",
      value: formatLargeNumber(circulatingSupply),
      symbol: symbol.toUpperCase(),
    },
    {
      icon: <Wallet className="h-4 w-4 text-zinc-500" />,
      label: "Total Supply",
      value: totalSupply ? formatLargeNumber(totalSupply) : "∞",
      symbol: symbol.toUpperCase(),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Market Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="dark:bg-zinc-900 bg-zinc-100 rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="dark:text-zinc-400 text-zinc-600 font-medium text-sm">
                {stat.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold">{stat.value}</span>
              {stat.symbol && (
                <span className="dark:text-zinc-400 text-zinc-600 font-medium text-sm">
                  {stat.symbol}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketStats;
