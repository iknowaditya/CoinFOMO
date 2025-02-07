"use client";
import React from "react";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { TimeStats } from "@/types/index";

interface TimeStatCardProps {
  stat: TimeStats;
}

const TimeStatCard = ({ stat }: TimeStatCardProps) => {
  return (
    <div className="dark:bg-zinc-900 bg-zinc-100 rounded-2xl p-3 sm:p-4">
      <div className="flex items-center dark:text-zinc-400 text-zinc-600 mb-2">
        <span className="text-xs sm:text-sm">{stat.label}</span>
      </div>
      <p className="text-base sm:text-lg font-semibold">{stat.price}</p>
      <div className="flex items-center gap-2 mt-2">
        <Calendar className="h-3 w-3 dark:text-zinc-400 text-zinc-600" />
        <span className="text-xs dark:text-zinc-400 text-zinc-600">
          {stat.date}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-1">
        {stat.type === "high" ? (
          <TrendingDown className="h-3 w-3 text-red-500" />
        ) : (
          <TrendingUp className="h-3 w-3 text-green-600" />
        )}
        <span className="text-xs dark:text-zinc-400 text-zinc-600">
          {stat.changePercentage.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default TimeStatCard;
