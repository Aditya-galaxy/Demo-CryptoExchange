"use client"
import React from 'react';
import { useCrypto } from '@/Helper/CryptoContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MarketOverview = () => {
  const { marketData, setSelectedCurrency } = useCrypto();

  const getPercentageChange = (currency) => {
    // Mock data - in real app, calculate from historical data
    const mockChanges = {
      BTC: 2.5,
      ETH: -1.8,
      USDT: 0.1,
    };
    return mockChanges[currency] || 0;
  };

  // Mock price history data
  const generatePriceHistory = (currency) => {
    const basePrice = marketData.prices[currency] || 1000;
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      price: basePrice * (1 + (Math.random() * 0.1 - 0.05))
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Market Overview</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(marketData.prices).map(([currency, price]) => (
              <Card 
                key={currency}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCurrency(currency)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{currency}/USD</h3>
                    <p className="text-2xl">${price.toLocaleString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    getPercentageChange(currency) > 0 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getPercentageChange(currency)}%
                  </span>
                </div>
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generatePriceHistory(currency)}>
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={getPercentageChange(currency) > 0 ? '#16a34a' : '#dc2626'} 
                        dot={false}
                      />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Volume: ${marketData.volumes[currency]?.toLocaleString()}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;