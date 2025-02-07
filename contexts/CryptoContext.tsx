"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  max_supply: number | null; // Make this required
  market_cap_rank: number;
  ath: number;
  ath_date: string;
  ath_change_percentage: number;
  atl: number;
  atl_date: string;
  atl_change_percentage: number;
  last_updated: string;
  total_supply: number | null;
  fully_diluted_valuation: number | null; // Add this
  price_change_24h: number; // Add this
  market_cap_change_24h: number; // Add this
  market_cap_change_percentage_24h: number; // Add this
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
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export function CryptoProvider({ children }: { children: ReactNode }) {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true); // Set initial loading to true
  const [isHistoricalLoading, setIsHistoricalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<"1d" | "7d" | "30d" | "1y">("30d");

  const fetchHistoricalData = async (id: string, days: number) => {
    setIsHistoricalLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch historical data");
      }

      const data = await response.json();
      // console.log(data);
      setHistoricalData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setHistoricalData(null);
    } finally {
      setIsHistoricalLoading(false);
    }
  };

  // Fetch initial crypto data and set Bitcoin as default
  useEffect(() => {
    const fetchAllCryptoData = async () => {
      try {
        setIsLoading(true);
        const pages = [1, 2];

        const responses = await Promise.all(
          pages.map((page) =>
            fetch(
              `${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/markets?${process.env.NEXT_PUBLIC_COINGECKO_PARAMS}&per_page=249&page=${page}`
            )
          )
        );

        const jsonData = await Promise.all(
          responses.map((res) => {
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            return res.json();
          })
        );

        const allCryptos = jsonData.flat();
        setCryptos(allCryptos);

        const bitcoin = allCryptos.find((crypto) => crypto.id === "bitcoin");
        if (bitcoin) {
          setSelectedCrypto(bitcoin);
          const daysMap = { "1d": 1, "7d": 7, "30d": 30, "1y": 365 };
          await fetchHistoricalData(bitcoin.id, daysMap[timeFrame]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCryptoData();
  }, [timeFrame]); // Empty dependency array as we only want this to run once on mount

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
