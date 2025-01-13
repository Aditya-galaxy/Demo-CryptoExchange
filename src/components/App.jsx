"use client"
import React, { useState } from 'react';
import { CryptoProvider, useCrypto } from '@/Helper/CryptoContext';
import Auth from './Auth';
import MarketOverview from './MarketOverview';
import TradingInterface from './TradingInterface';
import Wallet from './Wallet';
import OrderBook from './OrderBook';
import PriceChart from './PriceChart';
import TransactionHistory from './TransactionHistory';
import Settings from './Settings';
import Notifications from './Notifications';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Settings as SettingsIcon, 
  Bell, 
  User,
  LogOut
} from 'lucide-react';

const App = () => {
  const [currentTab, setCurrentTab] = useState('market');
  const { user, logout } = useCrypto();

  const renderContent = () => {
    switch (currentTab) {
      case 'market':
        return (
          <>
            <MarketOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PriceChart />
              </div>
              <div>
                <OrderBook />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TradingInterface />
              <Wallet />
            </div>
            <TransactionHistory />
          </>
        );
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <CryptoProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-16 bg-white border-r border-gray-200">
          <div className="flex flex-col items-center h-full py-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentTab('market')}
              className={currentTab === 'market' ? 'bg-gray-100' : ''}
            >
              <Home className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentTab('notifications')}
              className={`mt-4 ${currentTab === 'notifications' ? 'bg-gray-100' : ''}`}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentTab('settings')}
              className={`mt-4 ${currentTab === 'settings' ? 'bg-gray-100' : ''}`}
            >
              <SettingsIcon className="h-5 w-5" />
            </Button>
            <div className="mt-auto">
              {user && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    className="mt-4"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="pl-16 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Crypto Exchange ABC</h1>
              <Auth />
            </header>

            <main className="space-y-8">
              {renderContent()}
            </main>

            <footer className="mt-16 text-center text-gray-500">
              <p>© 2025 Crypto Exchange. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </CryptoProvider>
  );
};

export default App;