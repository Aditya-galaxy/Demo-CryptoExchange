"use client"
import React, { useState } from 'react';
import { useCrypto } from '@/Helper/CryptoContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TradingInterface = () => {
  const { 
    selectedCurrency, 
    marketData, 
    wallet, 
    placeOrder,
    user 
  } = useCrypto();

  const [orderDetails, setOrderDetails] = useState({
    amount: '',
    price: '',
    total: '0'
  });

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    const total = amount * (orderDetails.price || marketData.prices[selectedCurrency] || 0);
    setOrderDetails(prev => ({
      ...prev,
      amount,
      total: total.toFixed(2)
    }));
  };

  const handlePriceChange = (e) => {
    const price = e.target.value;
    const total = orderDetails.amount * price;
    setOrderDetails(prev => ({
      ...prev,
      price,
      total: total.toFixed(2)
    }));
  };

  const handleOrder = async (type) => {
    if (!user) {
      alert('Please login to trade');
      return;
    }

    const success = await placeOrder(
      type,
      parseFloat(orderDetails.amount),
      parseFloat(orderDetails.price || marketData.prices[selectedCurrency])
    );

    if (success) {
      setOrderDetails({ amount: '', price: '', total: '0' });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Trade {selectedCurrency}</h2>
        <div className="text-sm">
          Current Price: ${marketData.prices[selectedCurrency]?.toLocaleString() || 'Loading...'}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="buy" className="w-1/2">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="w-1/2">Sell</TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount ({selectedCurrency})</label>
                <Input
                  type="number"
                  value={orderDetails.amount}
                  onChange={handleAmountChange}
                  placeholder={`Amount in ${selectedCurrency}`}
                  min="0"
                  step="0.0001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (USD)</label>
                <Input
                  type="number"
                  value={orderDetails.price}
                  onChange={handlePriceChange}
                  placeholder="Market Price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total (USD)</label>
                <Input
                  type="text"
                  value={orderDetails.total}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <Button 
                onClick={() => handleOrder('buy')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Buy {selectedCurrency}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sell">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Available: {wallet.balances[selectedCurrency] || 0} {selectedCurrency}</label>
                <Input
                  type="number"
                  value={orderDetails.amount}
                  onChange={handleAmountChange}
                  placeholder={`Amount in ${selectedCurrency}`}
                  min="0"
                  max={wallet.balances[selectedCurrency] || 0}
                  step="0.0001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (USD)</label>
                <Input
                  type="number"
                  value={orderDetails.price}
                  onChange={handlePriceChange}
                  placeholder="Market Price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total (USD)</label>
                <Input
                  type="text"
                  value={orderDetails.total}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <Button 
                onClick={() => handleOrder('sell')}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Sell {selectedCurrency}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradingInterface;