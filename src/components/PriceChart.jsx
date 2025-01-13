"use client"
import React, { useState } from 'react';
import { useCrypto } from '@/Helper/CryptoContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

const PriceChart = () => {
  const { selectedCurrency, marketData } = useCrypto();
  const [timeframe, setTimeframe] = useState('1d');

  // Generate mock historical data
  const generateHistoricalData = () => {
    const basePrice = marketData.prices[selectedCurrency] || 50000;
    const intervals = {
      '1h': 60,
      '1d': 24,
      '1w': 7,
      '1m': 30,
      '1y': 12
    };

    const data = [];
    const points = intervals[timeframe];
    let currentPrice = basePrice;

    for (let i = 0; i < points; i++) {
      const volatility = 0.02; // 2% price volatility
      const priceChange = currentPrice * (1 + (Math.random() * volatility * 2 - volatility));
      const volume = Math.random() * basePrice * 100;
      
      data.push({
        time: new Date(Date.now() - (points - i) * 3600000).toLocaleString(),
        price: priceChange,
        volume: volume
      });

      currentPrice = priceChange;
    }

    return data;
  };

  const data = generateHistoricalData();

  const timeframes = [
    { label: '1H', value: '1h' },
    { label: '1D', value: '1d' },
    { label: '1W', value: '1w' },
    { label: '1M', value: '1m' },
    { label: '1Y', value: '1y' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{selectedCurrency}/USD Price Chart</h2>
          <div className="flex space-x-2">
            {timeframes.map(({ label, value }) => (
              <Button
                key={value}
                variant={timeframe === value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time"
                tickFormatter={(time) => {
                  const date = new Date(time);
                  return timeframe === '1h' ? date.toLocaleTimeString() : date.toLocaleDateString();
                }}
              />
              <YAxis 
                yAxisId="price"
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <YAxis 
                yAxisId="volume"
                orientation="right"
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value, name) => [
                  name === 'price' 
                    ? `$${value.toLocaleString()}`
                    : `$${(value/1000).toFixed(0)}K`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                yAxisId="price"
                dot={false}
                name="Price"
              />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#9333ea"
                yAxisId="volume"
                dot={false}
                name="Volume"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;