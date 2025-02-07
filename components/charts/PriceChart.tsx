import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";
import { Activity } from "lucide-react";
import { PriceChange } from "@/types/index";

interface PriceChartProps {
  data: PriceChange[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  // Custom tooltip component
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="border rounded-lg p-3 shadow-lg dark:bg-black bg-white">
          <p className=" text-sm mb-1">{label}</p>
          <p
            className={`text-lg font-bold ${
              value >= 0 ? "text-[#00b147]" : "text-red-500"
            }`}
          >
            {value.toFixed(2)}%
          </p>
          <p className="  text-xs mt-1">
            {value >= 0 ? "Price Increase" : "Price Decrease"}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate max absolute value for consistent scale
  const maxValue = Math.max(...data.map((item) => Math.abs(item.value)));

  return (
    <div className="w-full space-y-4">
      <div className="h-48 sm:h-56 lg:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            barGap={0}
            barSize={32}
          >
            {/* Subtle grid lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a20"
              vertical={false}
            />

            {/* Zero reference line */}
            <ReferenceLine y={0} stroke="#404040" strokeWidth={2} />

            {/* Axes styling */}
            <XAxis
              dataKey="period"
              axisLine={false}
              tick={{ fill: "#71717a", fontSize: "12px", fontWeight: "500" }}
              tickLine={false}
              dy={10}
            />
            <YAxis
              domain={[-maxValue, maxValue]}
              axisLine={false}
              tick={{ fill: "#71717a", fontSize: "12px" }}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              dx={-10}
            />

            {/* Enhanced tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#27272a20" }}
            />

            {/* Animated bars with custom rendering */}
            <Bar
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value >= 0 ? "#00b147" : "#ef4444"}
                  radius={[4, 4, 0, 0].join(",")}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Enhanced legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2 dark:text-zinc-400 text-zinc-600">
          <Activity className="h-4 w-4" />
          <span className="text-sm font-medium">Price Change Analysis</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00b147] rounded-sm"></div>
            <span className="text-xs text-zinc-400">Increase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span className="text-xs text-zinc-400">Decrease</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
