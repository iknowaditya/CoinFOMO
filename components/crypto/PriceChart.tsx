import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes"; // Assuming you're using next-themes for theme management

interface PriceChartProps {
  data: { date: string; price: number }[];
  isLoading: boolean;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, isLoading }) => {
  const { theme } = useTheme(); // Get the current theme

  // Determine if the currency is falling
  const isFalling =
    data.length > 1 && data[data.length - 1].price < data[0].price;

  // Define colors for dark and light modes
  const axisStrokeColor = theme === "dark" ? "#666" : "#888";
  const tooltipBackgroundColor = theme === "dark" ? "black" : "white";
  const tooltipBorderColor = theme === "dark" ? "#333" : "#ddd";
  const tooltipTextColor = theme === "dark" ? "white" : "black";

  // Define gradient colors based on the trend
  const gradientStartColor = isFalling ? "#ef4444" : "#22c55e"; // Red for falling, green for rising
  const gradientEndColor = theme === "dark" ? "transparent" : "transparent"; // Adjust as needed

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        {/* Define the Gradient */}
        <defs>
          <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor={gradientStartColor}
              stopOpacity={0.8}
            />
            <stop offset="100%" stopColor={gradientEndColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* X and Y Axis */}
        <XAxis
          dataKey="date"
          stroke={axisStrokeColor}
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value, index) => {
            const date = new Date(value);
            const day = date.getDate();
            return day % 2 === 0
              ? date.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                })
              : "";
          }}
          tickMargin={5}
          minTickGap={5}
          padding={{ left: 10, right: 10 }}
          dy={-5}
          interval="preserveStartEnd" // Ensures spacing remains even
        />

        <YAxis
          stroke={axisStrokeColor}
          fontSize={10} // Smaller font size for mobile
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          domain={[
            Math.min(...data.map((d) => d.price)),
            Math.max(...data.map((d) => d.price)),
          ]}
          width={50} // Reduced width for mobile
          padding={{ top: 10, bottom: 10 }} // Reduced padding for mobile
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBackgroundColor,
            border: `1px solid ${tooltipBorderColor}`,
            borderRadius: "8px", // Smaller border radius for mobile
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            color: tooltipTextColor,
            fontFamily: "Arial, sans-serif",
            fontSize: "12px", // Smaller font size for mobile
            padding: "8px", // Reduced padding for mobile
          }}
          labelStyle={{ color: tooltipTextColor }}
          formatter={(value) => [`$${Number(value).toLocaleString()}`, "Price"]}
        />

        {/* Area with Gradient Fill */}
        <Area
          type="monotone"
          dataKey="price"
          stroke={gradientStartColor} // Dynamic stroke color based on trend
          fill="url(#priceGradient)" // Apply Gradient Fill
          strokeWidth={2}
          dot={false}
          fillOpacity={1} // Set fill opacity as needed
          animationDuration={500}
          isAnimationActive={true}
          activeDot={{ r: 6 }} // Smaller active dot for mobile
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
