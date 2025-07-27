import React from 'react';
import { Wifi, WifiOff, LogOut, Store, Utensils } from 'lucide-react';

function Header({ user, isOnline, onLogout }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {user?.type === 'vendor' ? (
              <Utensils className="w-6 h-6 text-vendor-500" />
            ) : (
              <Store className="w-6 h-6 text-supplier-500" />
            )}
            <h1 className="text-xl font-bold text-gray-900">
              VendorLink
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-xs text-gray-500">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.type}</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;