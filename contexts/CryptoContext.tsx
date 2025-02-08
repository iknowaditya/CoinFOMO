"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Rate Limiting Configuration
const RATE_LIMIT = {
  maxRequests: 30,
  timeWindow: 60000, // 1 minute in milliseconds
  requests: [] as number[],
};

// Cache Configuration
const CACHE = {
  data: new Map<string, { data: any; timestamp: number }>(),
  duration: 30000, // 30 seconds in milliseconds
};

// Rate Limiting Function
function checkRateLimit() {
  const now = Date.now();
  RATE_LIMIT.requests = RATE_LIMIT.requests.filter(
    (time) => now - time < RATE_LIMIT.timeWindow
  );

  if (RATE_LIMIT.requests.length >= RATE_LIMIT.maxRequests) {
    throw new Error("Rate limit exceeded. Please try again in a minute.");
  }

  RATE_LIMIT.requests.push(now);
  return true;
}

// Cache Functions
function getCachedData(key: string) {
  const cached = CACHE.data.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE.duration) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  CACHE.data.set(key, { data, timestamp: Date.now() });
}

// Types and Interfaces
export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  max_supply: number | null;
  market_cap_rank: number;
  ath: number;
  ath_date: string;
  ath_change_percentage: number;
  atl: number;
  atl_date: string;
  atl_change_percentage: number;
  last_updated: string;
  total_supply: number | null;
  fully_diluted_valuation: number | null;
  price_change_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
}

export interface HistoricalData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

interface CryptoContextType {
  cryptos: CryptoData[];
  setCryptos: (cryptos: CryptoData[]) => void;
  selectedCrypto: CryptoData | null;
  setSelectedCrypto: (crypto: CryptoData | null) => void;
  historicalData: HistoricalData | null;
  setHistoricalData: (data: HistoricalData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isHistoricalLoading: boolean;
  setIsHistoricalLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  timeFrame: "1d" | "7d" | "30d" | "1y";
  setTimeFrame: (timeFrame: "1d" | "7d" | "30d" | "1y") => void;
  fetchHistoricalData: (id: string, days: number) => Promise<void>;
  retryFetch: () => Promise<void>;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export function CryptoProvider({ children }: { children: ReactNode }) {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoricalLoading, setIsHistoricalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<"1d" | "7d" | "30d" | "1y">("30d");
  const [lastFetchAttempt, setLastFetchAttempt] = useState<number>(0);

  const fetchWithRateLimit = async (url: string, options = {}) => {
    try {
      checkRateLimit();
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (error instanceof Error && error.message.includes("Rate limit")) {
        const waitTime = Math.ceil(
          (RATE_LIMIT.timeWindow - (Date.now() - RATE_LIMIT.requests[0])) / 1000
        );
        throw new Error(
          `Rate limit exceeded. Please wait ${waitTime} seconds.`
        );
      }
      throw error;
    }
  };

  const fetchHistoricalData = async (id: string, days: number) => {
    setIsHistoricalLoading(true);
    setError(null);

    try {
      const cacheKey = `historical_${id}_${days}`;
      const cachedData = getCachedData(cacheKey);

      if (cachedData) {
        setHistoricalData(cachedData);
        return;
      }

      const response = await fetchWithRateLimit(
        `${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      );

      const data = await response.json();
      setCachedData(cacheKey, data);
      setHistoricalData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch historical data"
      );
      setHistoricalData(null);
    } finally {
      setIsHistoricalLoading(false);
    }
  };

  const fetchAllCryptoData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setLastFetchAttempt(Date.now());

      const cachedData = getCachedData("all_cryptos");
      if (cachedData) {
        setCryptos(cachedData);
        if (!selectedCrypto) {
          const bitcoin = cachedData.find(
            (crypto: CryptoData) => crypto.id === "bitcoin"
          );
          if (bitcoin) {
            setSelectedCrypto(bitcoin);
            const daysMap = { "1d": 1, "7d": 7, "30d": 30, "1y": 365 };
            await fetchHistoricalData(bitcoin.id, daysMap[timeFrame]);
          }
        }
        return;
      }

      const pages = [1, 2];
      const responses = await Promise.all(
        pages.map((page) =>
          fetchWithRateLimit(
            `${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/markets?${process.env.NEXT_PUBLIC_COINGECKO_PARAMS}&per_page=249&page=${page}`
          )
        )
      );

      const jsonData = await Promise.all(responses.map((res) => res.json()));

      const allCryptos = jsonData.flat();
      setCachedData("all_cryptos", allCryptos);
      setCryptos(allCryptos);

      if (!selectedCrypto) {
        const bitcoin = allCryptos.find((crypto) => crypto.id === "bitcoin");
        if (bitcoin) {
          setSelectedCrypto(bitcoin);
          const daysMap = { "1d": 1, "7d": 7, "30d": 30, "1y": 365 };
          await fetchHistoricalData(bitcoin.id, daysMap[timeFrame]);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch crypto data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const retryFetch = async () => {
    const now = Date.now();
    if (now - lastFetchAttempt < 5000) {
      // Prevent rapid retries
      setError("Please wait a few seconds before retrying");
      return;
    }
    await fetchAllCryptoData();
  };

  useEffect(() => {
    fetchAllCryptoData();
  }, [timeFrame]);

  return (
    <CryptoContext.Provider
      value={{
        cryptos,
        setCryptos,
        selectedCrypto,
        setSelectedCrypto,
        historicalData,
        setHistoricalData,
        isLoading,
        setIsLoading,
        isHistoricalLoading,
        setIsHistoricalLoading,
        error,
        setError,
        timeFrame,
        setTimeFrame,
        fetchHistoricalData,
        retryFetch,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export function useCryptoContext() {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error("useCryptoContext must be used within a CryptoProvider");
  }
  return context;
}
