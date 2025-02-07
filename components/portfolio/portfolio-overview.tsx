"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCryptoContext } from "@/contexts/CryptoContext";
import { formatLargeNumber } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  LineChart,
  BarChart4,
} from "lucide-react";

export function PortfolioOverview() {
  const { cryptos } = useCryptoContext();

  const cards = [
    {
      title: "Total Portfolio Value",
      value: formatLargeNumber(
        cryptos.reduce((acc, coin) => acc + coin.current_price, 0)
      ),
      icon: DollarSign,
      change: "+2.5% from last month",
      changeType: "increase",
    },
    {
      title: "24h Change",
      value: `${cryptos
        .reduce((acc, coin) => acc + coin.price_change_percentage_24h, 0)
        .toFixed(2)}%`,
      icon: LineChart,
      change: "4 price updates",
      changeType:
        cryptos.reduce(
          (acc, coin) => acc + coin.price_change_percentage_24h,
          0
        ) >= 0
          ? "increase"
          : "decrease",
    },
    {
      title: "Total Volume",
      value: formatLargeNumber(
        cryptos.reduce((acc, coin) => acc + coin.total_volume, 0)
      ),
      icon: BarChart4,
      change: "+12.5% from last week",
      changeType: "increase",
    },
    {
      title: "Market Cap",
      value: formatLargeNumber(
        cryptos.reduce((acc, coin) => acc + coin.market_cap, 0)
      ),
      icon: TrendingUp,
      change: "+5.12% from yesterday",
      changeType: "increase",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <Card key={i} className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <card.icon className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span
                className={card.changeType === "decrease" ? "text-red-500" : ""}
              >
                {card.value}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.changeType === "increase" ? (
                <TrendingUp className="h-4 w-4 text-green-500 inline mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 inline mr-1" />
              )}
              {card.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
