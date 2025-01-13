"use client"
import React, { useState } from 'react';
import { useCrypto } from '@/Helper/CryptoContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Bell, CheckCircle, AlertCircle, TrendingUp, ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Order Completed',
      message: 'Your BTC purchase order has been successfully executed.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false
    },
    {
      id: 2,
      type: 'alert',
      title: 'Price Alert',
      message: 'ETH has increased by 5% in the last hour.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'Platform maintenance scheduled for tomorrow.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'price':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 1000 * 60) {
      return 'Just now';
    } else if (diff < 1000 * 60 * 60) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={markAllAsRead}
        >
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 p-4 rounded-lg ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              {getIcon(notification.type)}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-sm text-gray-500">
                    {formatTime(notification.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
              </div>
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Notifications;