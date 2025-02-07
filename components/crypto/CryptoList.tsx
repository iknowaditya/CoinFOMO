import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CryptoData } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoListProps {
  cryptos: CryptoData[];
  selectedCryptoId: string | null;
  onSelect: (crypto: CryptoData) => void;
  isLoading: boolean;
}

const CryptoList: React.FC<CryptoListProps> = ({
  cryptos,
  selectedCryptoId,
  onSelect,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border rounded-3xl 
        dark:bg-zinc-900 bg-zinc-100 
        dark:border-zinc-800 border-zinc-200"
          >
            <Skeleton className="w-8 h-8 rounded-full dark:bg-zinc-900 bg-zinc-100" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2 dark:bg-zinc-900 bg-zinc-100" />
              <Skeleton className="h-4 w-16 dark:bg-zinc-900 bg-zinc-100" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-24 mb-2 dark:bg-zinc-900 bg-zinc-100" />
              <Skeleton className="h-4 w-16 dark:bg-zinc-900 bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {cryptos.map((crypto) => (
        <div
          key={crypto.id}
          onClick={() => onSelect(crypto)}
          className={`border transition-all flex items-center justify-between p-4 rounded-3xl cursor-pointer 
      ${
        selectedCryptoId === crypto.id
          ? "dark:bg-zinc-900 bg-zinc-200 dark:border-zinc-800 border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-300"
          : "dark:bg-zinc-950 bg-white dark:border-zinc-800 border-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
      }`}
        >
          <div className="flex items-center gap-4">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-8 h-8 dark:bg-zinc-900 rounded-full"
            />
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                {crypto.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {crypto.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatCurrency(crypto.current_price)}
            </p>
            <p
              className={`flex items-center justify-end ${
                crypto.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {crypto.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoList;
