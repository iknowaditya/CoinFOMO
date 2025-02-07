"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCryptoContext } from "@/contexts/CryptoContext";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

export function MarketStats() {
  const { cryptos } = useCryptoContext();

  // Calculate market statistics
  const topGainer = [...cryptos].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  )[0];

  const topLoser = [...cryptos].sort(
    (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
  )[0];

  const totalMarketCap = cryptos.reduce(
    (sum, coin) => sum + coin.market_cap,
    0
  );
  const totalVolume = cryptos.reduce((sum, coin) => sum + coin.total_volume, 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Top Gainer */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-green-500/10">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-green-500/20">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Top Gainer (24h)</p>
                <p className="text-xs text-muted-foreground">
                  {topGainer?.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-500">
                +{topGainer?.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="text-xs text-muted-foreground">
                ${topGainer?.current_price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Top Loser */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-red-500/10">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-red-500/20">
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Top Loser (24h)</p>
                <p className="text-xs text-muted-foreground">
                  {topLoser?.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-red-500">
                {topLoser?.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="text-xs text-muted-foreground">
                ${topLoser?.current_price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Total Market Cap</p>
              </div>
              <p className="text-lg font-semibold">
                ${(totalMarketCap / 1e9).toFixed(2)}B
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">24h Volume</p>
              </div>
              <p className="text-lg font-semibold">
                ${(totalVolume / 1e9).toFixed(2)}B
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cryptos.slice(0, 5).map((coin) => (
              <div key={coin.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{coin.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    ${coin.current_price.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
