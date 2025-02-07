"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useCryptoContext } from "@/contexts/CryptoContext";
import LoadingSkeleton from "./LoadingSkeleton";
import MarketStats from "@/components/sections/MarketStats";
import TimeStatCard from "@/components/cards/TimeStatCard";
import PriceChart from "@/components/charts/PriceChart";
import { PriceChange } from "@/types";

const RightCards = () => {
  const { selectedCrypto, isLoading } = useCryptoContext();

  const priceChanges: PriceChange[] = selectedCrypto
    ? [
        {
          period: "24H",
          value: selectedCrypto.price_change_percentage_24h || 0,
          label: "24 Hours",
        },
        {
          period: "7D",
          value: selectedCrypto.price_change_percentage_7d_in_currency || 0,
          label: "7 Days",
        },
        {
          period: "30D",
          value: selectedCrypto.price_change_percentage_30d_in_currency || 0,
          label: "30 Days",
        },
      ].filter((item) => typeof item.value === "number")
    : [];

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!selectedCrypto) {
    return (
      <div className="h-full rounded-3xl">
        <Card className="h-full  border  rounded-2xl p-4">
          <div className="text-center text-gray-400">
            Select a cryptocurrency to view analysis
          </div>
        </Card>
      </div>
    );
  }

  const timeStats = [
    {
      label: "All-Time High",
      price: formatCurrency(selectedCrypto.ath),
      date: new Date(selectedCrypto.ath_date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      changePercentage: selectedCrypto.ath_change_percentage || 0,
      type: "high" as const,
    },
    {
      label: "All-Time Low",
      price: formatCurrency(selectedCrypto.atl),
      date: new Date(selectedCrypto.atl_date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      changePercentage: selectedCrypto.atl_change_percentage || 0,
      type: "low" as const,
    },
  ];

  return (
    <div className="h-full flex flex-col gap-4  ">
      {/* Market Overview Card */}
      <Card className="flex-shrink-0  border rounded-2xl p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img
              src={selectedCrypto.image}
              alt={selectedCrypto.name}
              className="w-8 h-8"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold">
                  {selectedCrypto.symbol.toUpperCase()}
                </span>
                <span className="dark:text-zinc-400 text-zinc-600 font-medium text-sm">
                  {selectedCrypto.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`${
                    selectedCrypto.price_change_percentage_24h >= 0
                      ? "text-[#00b147]"
                      : "text-red-500"
                  } text-xs`}
                >
                  {selectedCrypto.price_change_percentage_24h >= 0 ? "+" : ""}
                  {selectedCrypto.price_change_percentage_24h?.toFixed(2)}%
                </span>
                <span className="dark:text-zinc-400 text-zinc-600 text-xs">
                  24h Change
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-2">
            <span className="dark:text-zinc-400 text-zinc-600 text-xl sm:text-3xl md:text-4xl">
              #
            </span>
            <span className="text-3xl  md:text-6xl font-bold ">
              {selectedCrypto.market_cap_rank}
            </span>
          </div>
        </div>

        {/* Market Statistics */}
        <MarketStats
          marketCap={selectedCrypto.market_cap}
          volume={selectedCrypto.total_volume}
          circulatingSupply={selectedCrypto.circulating_supply}
          totalSupply={selectedCrypto.total_supply}
          symbol={selectedCrypto.symbol}
        />
      </Card>

      {/* Price Analysis Card */}
      <Card className="flex-shrink-0 border rounded-2xl p-4 overflow-auto h-[570px] w-full ">
        <h2 className="text-lg font-bold mb-4">Price Analysis</h2>
        <div className="space-y-4">
          {/* Time Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {timeStats.map((stat, index) => (
              <TimeStatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Price Change Chart */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-4">Price Changes</h3>
            <div className="h-40">
              <PriceChart data={priceChanges} />
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Analysis Card */}
      <Card className="flex-shrink-0  border  rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Market Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="dark:text-zinc-400 text-zinc-600">
              Market Dominance
            </span>
            <span className="font-medium">
              {selectedCrypto.market_cap_rank <= 1 ? "67.8" : "12.4"}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="dark:text-zinc-400 text-zinc-600">
              Price Change (7d)
            </span>
            <span
              className={`font-medium ${
                selectedCrypto.price_change_percentage_7d_in_currency >= 0
                  ? "text-[#00b147]"
                  : "text-red-500"
              }`}
            >
              {selectedCrypto.price_change_percentage_7d_in_currency?.toFixed(
                2
              )}
              %
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="dark:text-zinc-400 text-zinc-600">
              Trading Volume
            </span>
            <span className="font-medium">
              {formatCurrency(selectedCrypto.total_volume)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RightCards;
