import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatLargeNumber = (value: number): string => {
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixIndex = 0;
  let formattedValue = value;

  while (formattedValue >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedValue /= 1000;
    suffixIndex++;
  }

  // For values less than 1, return with maximum 6 decimal places
  if (value < 1) {
    return value.toFixed(6);
  }

  // For values >= 1, format with 2 decimal places max
  return `$${formattedValue.toFixed(2)}${suffixes[suffixIndex]}`;
};
