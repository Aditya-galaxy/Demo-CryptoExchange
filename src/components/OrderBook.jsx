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

const OrderBook = () => {
  const { orderBook, selectedCurrency } = useCrypto();

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(num);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-bold">Order Book ({selectedCurrency}/USD)</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Buy Orders */}
          <div>
            <h3 className="text-sm font-medium text-green-600 mb-2">Buy Orders</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBook.buyOrders
                  .sort((a, b) => b.price - a.price)
                  .slice(0, 10)
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-green-600">
                        ${formatNumber(order.price)}
                      </TableCell>
                      <TableCell>{formatNumber(order.amount)}</TableCell>
                      <TableCell>
                        ${formatNumber(order.price * order.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Sell Orders */}
          <div>
            <h3 className="text-sm font-medium text-red-600 mb-2">Sell Orders</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBook.sellOrders
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 10)
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-red-600">
                        ${formatNumber(order.price)}
                      </TableCell>
                      <TableCell>{formatNumber(order.amount)}</TableCell>
                      <TableCell>
                        ${formatNumber(order.price * order.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderBook;