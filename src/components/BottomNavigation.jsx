import React from 'react';
import { Home, ShoppingCart, MessageCircle, Package, User } from 'lucide-react';

function BottomNavigation({ currentPage, onNavigate, userType }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'marketplace', label: userType === 'vendor' ? 'Suppliers' : 'Products', icon: ShoppingCart },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                isActive
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-gray-600'}`} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;