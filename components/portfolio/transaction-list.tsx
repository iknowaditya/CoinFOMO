"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCryptoContext } from "@/contexts/CryptoContext";

interface TransactionListProps {
  coinId: string;
}

export function TransactionList({ coinId }: TransactionListProps) {
  const { selectedCrypto } = useCryptoContext();

  if (!selectedCrypto) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add your transaction items here */}
          <div className="text-muted-foreground">No transactions yet</div>
        </div>
      </CardContent>
    </Card>
  );
}
