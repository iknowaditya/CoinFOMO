"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useCryptoContext } from "@/contexts/CryptoContext";
import { CryptoData } from "@/contexts/CryptoContext";

export function Search() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { cryptos, setSelectedCrypto, fetchHistoricalData } =
    useCryptoContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelectCrypto = async (coin: CryptoData) => {
    setSelectedCrypto(coin);
    await fetchHistoricalData(coin.id, 10);
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <div className="flex h-9 w-full items-center rounded-xl border border-input bg-background px-3 text-sm ring-offset-background cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span className="text-muted-foreground">Search coins (⌘ + K)</span>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <DialogTitle className="sr-only">Search Cryptocurrencies</DialogTitle>
          <DialogDescription className="sr-only">
            Search and select cryptocurrencies to view their details
          </DialogDescription>

          <CommandInput placeholder="Search cryptocurrencies..." />
          <CommandList>
            <CommandEmpty>No cryptocurrencies found.</CommandEmpty>
            <CommandGroup
              heading="Cryptocurrencies"
              className="text-sm font-medium text-foreground"
            >
              {cryptos.map((coin) => (
                <CommandItem
                  key={coin.id}
                  value={coin.id}
                  onSelect={() => handleSelectCrypto(coin)}
                  className="flex items-center cursor-pointer hover:bg-accent"
                >
                  <div className="flex items-center w-full gap-2">
                    <img
                      src={coin.image}
                      alt={`${coin.name} logo`}
                      className="h-5 w-5 object-contain"
                    />
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {coin.symbol.toUpperCase()}
                    </span>
                    <span className="ml-auto text-sm text-muted-foreground">
                      ${coin.current_price.toLocaleString()}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
