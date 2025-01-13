"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [wallet, setWallet] = useState({
    balances: {},
    transactions: []
  });
  const [marketData, setMarketData] = useState({
    prices: {},
    volumes: {},
    trends: {}
  });
  const [orderBook, setOrderBook] = useState({
    buyOrders: [],
    sellOrders: []
  });

  // Authentication methods
  const login = async (credentials) => {
    // Implement login logic
    try {
      // API call would go here
      setUser({ id: 'mock-id', ...credentials });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setWallet({ balances: {}, transactions: [] });
  };

  // Market data methods
  const updateMarketData = async () => {
    try {
      // API call would go here
      const mockData = {
        prices: {
          BTC: 45000,
          ETH: 2800,
          // Add more currencies
        },
        volumes: {
          BTC: 1500000,
          ETH: 900000,
        },
        trends: {
          BTC: 'up',
          ETH: 'down',
        }
      };
      setMarketData(mockData);
    } catch (error) {
      console.error('Failed to update market data:', error);
    }
  };

  // Order management methods
  const placeOrder = async (orderType, amount, price) => {
    if (!user) return false;
    
    try {
      const newOrder = {
        id: Date.now(),
        userId: user.id,
        type: orderType,
        amount,
        price,
        status: 'pending',
        timestamp: new Date().toISOString()
      };

      if (orderType === 'buy') {
        setOrderBook(prev => ({
          ...prev,
          buyOrders: [...prev.buyOrders, newOrder]
        }));
      } else {
        setOrderBook(prev => ({
          ...prev,
          sellOrders: [...prev.sellOrders, newOrder]
        }));
      }
      
      return true;
    } catch (error) {
      console.error('Order placement failed:', error);
      return false;
    }
  };

  // Wallet management methods
  const updateWalletBalance = async () => {
    if (!user) return;

    try {
      // API call would go here
      const mockBalances = {
        BTC: 0.5,
        ETH: 2.0,
        USDT: 1000
      };
      setWallet(prev => ({
        ...prev,
        balances: mockBalances
      }));
    } catch (error) {
      console.error('Failed to update wallet balance:', error);
    }
  };

  useEffect(() => {
    if (user) {
      updateWalletBalance();
      updateMarketData();
    }
  }, [user]);

  const value = {
    user,
    login,
    logout,
    wallet,
    marketData,
    orderBook,
    selectedCurrency,
    setSelectedCurrency,
    placeOrder,
    updateMarketData,
    updateWalletBalance
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};


export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};

export default CryptoContext;