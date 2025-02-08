"use client";

import { useState, useEffect } from "react";
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview";
import { PortfolioTable } from "@/components/portfolio/portfolio-table";
import { PortfolioChart } from "@/components/portfolio/portfolio-chart";
import { MarketStats } from "@/components/portfolio/market-stats";
import { QuickStats } from "@/components/portfolio/quick-stats";
import { SelectedCrypto } from "@/components/portfolio/selected-crypto";
import {
  QuickStatsSkeleton,
  SelectedCryptoSkeleton,
  ChartSkeleton,
  OverviewSkeleton,
  MarketStatsSkeleton,
  TableSkeleton,
} from "@/components/portfolio/skeletons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCryptoContext } from "@/contexts/CryptoContext";
import { Wallet, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PortfolioPage() {
  const { selectedCrypto, error, retryFetch } = useCryptoContext();
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className=" mx-auto p-4 sm:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">Portfolio</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your crypto assets and market insights
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Tabs defaultValue="overview" className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button className="w-full sm:w-auto">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Transaction History
            </Button>
          </div>
        </div>

        {/* {error && (
          <Alert variant="destructive" className="bg-red-700/10 text-red-700">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}

        {error && (
          <Alert variant="destructive" className="bg-red-700/10 text-red-700">
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={retryFetch}
                className="px-3 py-1 text-sm bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
              >
                Retry
              </button>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        {isDataLoading ? <QuickStatsSkeleton /> : <QuickStats />}

        {/* Selected Crypto */}
        {isDataLoading ? (
          <SelectedCryptoSkeleton />
        ) : (
          selectedCrypto && <SelectedCrypto crypto={selectedCrypto} />
        )}

        {/* Charts and Stats */}
        <div className="grid gap-6 lg:grid-cols-7">
          <div className="lg:col-span-4 space-y-6">
            {isDataLoading ? (
              <>
                <ChartSkeleton />
                <OverviewSkeleton />
              </>
            ) : (
              <>
                <PortfolioChart />
                <PortfolioOverview />
              </>
            )}
          </div>
          <div className="lg:col-span-3">
            {isDataLoading ? <MarketStatsSkeleton /> : <MarketStats />}
          </div>
        </div>

        {/* Assets Table */}
        {isDataLoading ? <TableSkeleton /> : <PortfolioTable />}
      </div>
    </div>
  );
}
