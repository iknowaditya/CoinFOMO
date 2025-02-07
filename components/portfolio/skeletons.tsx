import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Quick Stats Skeleton
export const QuickStatsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-36 mb-2" />
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </Card>
    ))}
  </div>
);

// Selected Crypto Skeleton
export const SelectedCryptoSkeleton = () => (
  <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary/10 to-background">
    <CardContent className="p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background">
              <Skeleton className="h-full w-full rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-4 w-24 mx-auto" />
              <Skeleton className="h-6 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Chart Skeleton
export const ChartSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </CardContent>
  </Card>
);

// Overview Skeleton
export const OverviewSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {[...Array(4)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-36 mb-2" />
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </Card>
    ))}
  </div>
);

// Market Stats Skeleton
export const MarketStatsSkeleton = () => (
  <Card>
    <CardContent className="p-6 space-y-6">
      <Skeleton className="h-8 w-1/3" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Table Skeleton
export const TableSkeleton = () => (
  <Card>
    <CardContent className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 flex justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
