"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCryptoContext } from "@/contexts/CryptoContext";
import { TrendingUp, TrendingDown, ExternalLink, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Pagination from "@/components/Pagination/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PortfolioTable() {
  const { cryptos } = useCryptoContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Load saved page size from localStorage
  useEffect(() => {
    const savedPageSize = localStorage.getItem("tablePageSize");
    if (savedPageSize) {
      setItemsPerPage(Number(savedPageSize));
    }
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(cryptos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cryptos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (value: string) => {
    const newSize = Number(value);
    setItemsPerPage(newSize);
    setCurrentPage(1);
    localStorage.setItem("tablePageSize", String(newSize));
  };

  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6">
        <CardTitle>Your Assets</CardTitle>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Favorites</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View favorite assets</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        {/* Items per page selector */}
        <div className="mb-4 px-4 sm:px-0 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>

        <ScrollArea className="w-full px-2 sm:px-0">
          <div className="border rounded-xl  ">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50px] hidden lg:flex items-center justify-start">
                    #
                  </TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead className=" hidden lg:table-cell">Price</TableHead>
                  <TableHead className=" hidden lg:table-cell">
                    Change
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    24h High
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    24h Low
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-right">
                    Market Cap
                  </TableHead>
                  {/* <TableHead className="w-[50px]"></TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((coin, index) => (
                  <TableRow
                    key={coin.id}
                    className="group hover:bg-accent/50 transition-colors"
                  >
                    <TableCell className="font-medium w-[50px] hidden lg:flex">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="h-6 w-6 sm:h-8 sm:w-8"
                        />
                        <div>
                          <div className="font-medium line-clamp-1">
                            {coin.name}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {coin.symbol.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium hidden lg:table-cell">
                      <div className="flex flex-col">
                        <span>${coin.current_price.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground md:hidden">
                          Vol: ${(coin.total_volume / 1e6).toFixed(2)}M
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right  hidden lg:table-cell">
                      <div className="items-center gap-1 justify-end md:justify-start hidden sm:flex">
                        {coin.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`${
                            coin.price_change_percentage_24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell font-medium text-green-500">
                      ${coin.high_24h.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell font-medium text-red-500">
                      ${coin.low_24h.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right">
                      <div className="font-medium">
                        ${(coin.market_cap / 1e9).toFixed(2)}B
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Vol: ${(coin.total_volume / 1e6).toFixed(2)}M
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:flex">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <ScrollBar orientation="horizontal" /> */}
        </ScrollArea>

        {/* Pagination Section */}
        <div className="mt-4  flex-col sm:flex-row items-center justify-between gap-4 px-4 hidden sm:flex">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, cryptos.length)} of{" "}
            {cryptos.length} entries
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
