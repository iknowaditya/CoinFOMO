"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import PriceChart from "@/components/crypto/PriceChart";
import CryptoList from "@/components/crypto/CryptoList";
import Pagination from "@/components/Pagination/pagination";
import { CryptoData, TimeFrame } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useCryptoContext } from "@/contexts/CryptoContext";
import RightCards from "@/components/RightCards/rightCards";

const Dashboard = () => {
  const {
    cryptos,
    selectedCrypto,
    setSelectedCrypto,
    historicalData,
    isLoading,
    error,
    retryFetch,
    timeFrame,
    setTimeFrame,
    fetchHistoricalData,
  } = useCryptoContext();

  const [currentPage, setCurrentPage] = useState(1);
  const chartSectionRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  const handleCryptoSelect = async (crypto: CryptoData) => {
    setSelectedCrypto(crypto);
    const daysMap: Record<TimeFrame, number> = {
      "1d": 1,
      "7d": 7,
      "30d": 30,
      "1y": 365,
    };
    await fetchHistoricalData(crypto.id, daysMap[timeFrame]);
    chartSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTimeFrameChange = async (period: TimeFrame) => {
    setTimeFrame(period);
    if (selectedCrypto) {
      const daysMap: Record<TimeFrame, number> = {
        "1d": 1,
        "7d": 7,
        "30d": 30,
        "1y": 365,
      };
      await fetchHistoricalData(selectedCrypto.id, daysMap[period]);
    }
  };

  const prepareChartData = () => {
    if (!historicalData?.prices) return [];
    return historicalData.prices.map((item) => ({
      date: new Date(item[0]).toLocaleDateString(),
      price: item[1],
    }));
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cryptos?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((cryptos?.length || 0) / itemsPerPage);

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-6" ref={chartSectionRef}>
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="space-y-6">
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

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {isLoading ? (
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              ) : (
                selectedCrypto && (
                  <>
                    <img
                      src={selectedCrypto.image}
                      alt={selectedCrypto.name}
                      className="w-12 h-12"
                    />
                    <div>
                      <h2 className="dark:text-gray-400 text-gray-600 font-medium text-sm">
                        {selectedCrypto.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl md:text-3xl font-bold">
                          {formatCurrency(selectedCrypto.current_price)}
                        </h1>
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                          {selectedCrypto.symbol.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <span
                          className={`flex items-center ${
                            selectedCrypto.price_change_percentage_24h >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedCrypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(
                            selectedCrypto.price_change_percentage_24h
                          ).toFixed(2)}
                          %
                        </span>
                        <span className="dark:text-gray-400 text-gray-600 text-sm flex w-28 items-center ">
                          24h Change
                        </span>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>

            {/* Time Frame Controls */}
            <div className="items-end md:items-center justify-end flex w-full md:h-24 bg-red-20">
              {isLoading ? (
                <div className="flex gap-2 md:gap-4 flex-wrap md:flex-nowrap">
                  {["1d", "7d", "30d", "1y"].map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-10 w-16 sm:w-20 rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 md:gap-4 flex-wrap md:flex-nowrap dark:bg-zinc-800 bg-zinc-100 px-2  py-1  rounded-full">
                  {(["1d", "7d", "30d", "1y"] as const).map((period) => (
                    <Button
                      key={period}
                      variant={timeFrame === period ? "default" : "ghost"}
                      className={`rounded-full text-sm sm:text-base ${
                        timeFrame === period
                          ? "bg-green-600 hover:bg-green-700"
                          : "dark:hover:bg-zinc-700 hover:bg-zinc-200"
                      }`}
                      onClick={() => handleTimeFrameChange(period)}
                      disabled={isLoading}
                    >
                      {period.toUpperCase()}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chart Card */}
          <Card className=" border  rounded-3xl">
            <CardContent className="p-4 md:p-6">
              <div className="h-[300px] md:h-[400px]">
                <PriceChart data={prepareChartData()} isLoading={isLoading} />
              </div>
            </CardContent>
          </Card>

          {/* Crypto List */}
          <div className="space-y-4">
            <CryptoList
              cryptos={currentItems}
              selectedCryptoId={selectedCrypto?.id || null}
              onSelect={handleCryptoSelect}
              isLoading={isLoading}
            />

            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Cards Section */}
      <div className="w-full xl:w-[400px] flex-shrink-0">
        <RightCards />
      </div>
    </div>
  );
};

export default Dashboard;
