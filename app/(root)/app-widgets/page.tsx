"use client";

import { Suspense } from "react";
import { MarketOverview } from "@/components/widgets/market-overview";
import { TrendingCoins } from "@/components/widgets/trending-coins";
import { GlobalStats } from "@/components/widgets/global-stats";
import { NewsWidget } from "@/components/widgets/news-widget";
import { VolumeChart } from "@/components/widgets/volume-chart";
import { FearGreedIndex } from "@/components/widgets/fear-greed-index";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCryptoContext } from "@/contexts/CryptoContext";

export default function WidgetsPage() {
  const { error } = useCryptoContext();
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Widgets</h2>
        <p className="text-muted-foreground">
          Market overview and cryptocurrency insights
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-700/10 text-red-700">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Suspense fallback={<Skeleton className="h-[300px]" />}>
        <MarketOverview />
      </Suspense>

      <div className="grid gap-8 md:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-[400px]" />}>
          <TrendingCoins />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[400px]" />}>
          <GlobalStats />
        </Suspense>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-[400px]" />}>
          <VolumeChart />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[400px]" />}>
          <FearGreedIndex />
        </Suspense>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px]" />}>
        <NewsWidget />
      </Suspense>
    </div>
  );
}
