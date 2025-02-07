import { Card } from "@/components/ui/card";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { CryptoData } from "@/contexts/CryptoContext";

interface SelectedCryptoProps {
  crypto: CryptoData;
}

export function SelectedCrypto({ crypto }: SelectedCryptoProps) {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary/10 to-background">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Crypto Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="h-12 w-12 sm:h-16 sm:w-16"
              />
              <div className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-background flex items-center justify-center">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <h3 className="text-xl sm:text-2xl font-bold line-clamp-1">
                  {crypto.name}
                </h3>
                <span className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium">
                  {crypto.symbol.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <p className="text-xl sm:text-2xl font-medium">
                  ${crypto.current_price.toLocaleString()}
                </p>
                <div
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full ${
                    crypto.price_change_percentage_24h >= 0
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {crypto.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                Market Cap
              </p>
              <p className="text-base sm:text-lg font-bold">
                ${(crypto.market_cap / 1e9).toFixed(2)}B
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                24h Volume
              </p>
              <p className="text-base sm:text-lg font-bold">
                ${(crypto.total_volume / 1e6).toFixed(2)}M
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                Rank
              </p>
              <p className="text-base sm:text-lg font-bold">
                #{crypto.market_cap_rank}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
