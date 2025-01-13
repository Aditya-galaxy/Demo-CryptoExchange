"use client"
import React from 'react';
import { useCrypto } from '@/Helper/CryptoContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Wallet = () => {
  const { wallet, marketData, user } = useCrypto();

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center">Please login to view your wallet</p>
        </CardContent>
      </Card>
    );
  }

  const calculateTotalValue = () => {
    return Object.entries(wallet.balances).reduce((total, [currency, amount]) => {
      const price = marketData.prices[currency] || 0;
      return total + (amount * price);
    }, 0);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Your Wallet</h2>
        <p className="text-sm text-gray-500">
          Total Value: ${calculateTotalValue().toLocaleString()}
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Currency</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Price (USD)</TableHead>
              <TableHead>Value (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(wallet.balances).map(([currency, balance]) => (
              <TableRow key={currency}>
                <TableCell className="font-medium">{currency}</TableCell>
                <TableCell>{balance.toFixed(8)}</TableCell>
                <TableCell>
                  ${marketData.prices[currency]?.toLocaleString() || '0'}
                </TableCell>
                <TableCell>
                  ${((balance || 0) * (marketData.prices[currency] || 0)).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wallet.transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
                  <TableCell className={`font-medium ${
                    tx.type === 'buy' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type.toUpperCase()}
                  </TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.currency}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                      tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Wallet;