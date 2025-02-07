// Crypto Types
export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export type TimeFrame = "1d" | "7d" | "30d" | "1y";

// Component Props
export interface CryptoListProps {
  cryptos: CryptoData[];
  selectedCryptoId: string | null;
  onSelect: (crypto: CryptoData) => void;
  isLoading: boolean;
}

export interface TimeStats {
  label: string;
  price: string;
  date: string;
  changePercentage: number;
  type: "high" | "low";
}

// Component Props Types
export interface PriceChange {
  period: string;
  value: number;
  label: string;
}

// Auth Types
export interface UserType {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: UserType | null;
  isLoading: boolean;
  error: string | null;
}

// MongoDB Schema Types
export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

// Existing types...

export interface UserType {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}
