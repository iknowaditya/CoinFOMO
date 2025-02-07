import { DollarSign, LineChart, BarChart4, Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";

const quickStats = [
  {
    title: "Total Balance",
    value: "$45,231.89",
    change: "+2.5%",
    icon: DollarSign,
    changeColor: "text-green-500",
  },
  {
    title: "Total Profit/Loss",
    value: "$12,234.45",
    change: "+12.5%",
    icon: LineChart,
    changeColor: "text-green-500",
  },
  {
    title: "Portfolio Value",
    value: "$58,442.32",
    change: "+5.12%",
    icon: BarChart4,
    changeColor: "text-green-500",
  },
  {
    title: "Total Assets",
    value: "12",
    change: "+2 today",
    icon: Landmark,
    changeColor: "text-green-500",
  },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat, index) => (
        <Card
          key={index}
          className="p-4 sm:p-6 hover:shadow-lg transition-all border border-border/50 hover:border-primary/20"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-sm font-medium text-muted-foreground line-clamp-1">
                {stat.title}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold mt-1 line-clamp-1">
                {stat.value}
              </h3>
              <p className={`text-sm ${stat.changeColor} mt-1`}>
                {stat.change}
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
              <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
