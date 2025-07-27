import React from 'react';
import { TrendingUp, Users, DollarSign, Clock, ShoppingCart, MessageCircle, Package, AlertTriangle } from 'lucide-react';

function Dashboard({ user, onNavigate, isOnline }) {
  const stats = user.type === 'vendor' ? {
    title: 'Your Business Overview',
    cards: [
      { label: 'Orders This Month', value: '24', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Trusted Suppliers', value: '12', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Money Saved', value: '₹8,450', icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-50' },
      { label: 'Pending Orders', value: '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' }
    ]
  } : {
    title: 'Your Business Overview',
    cards: [
      { label: 'Orders Received', value: '156', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Active Vendors', value: '89', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Revenue This Month', value: '₹45,200', icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-50' },
      { label: 'Products Listed', value: '28', icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-50' }
    ]
  };

  const quickActions = user.type === 'vendor' ? [
    { id: 'marketplace', label: 'Find Suppliers', icon: ShoppingCart, color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'orders', label: 'Track Orders', icon: Package, color: 'bg-green-500 hover:bg-green-600' },
    { id: 'chat', label: 'Chat & Bargain', icon: MessageCircle, color: 'bg-purple-500 hover:bg-purple-600' }
  ] : [
    { id: 'marketplace', label: 'Manage Products', icon: ShoppingCart, color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'orders', label: 'View Orders', icon: Package, color: 'bg-green-500 hover:bg-green-600' },
    { id: 'chat', label: 'Chat with Vendors', icon: MessageCircle, color: 'bg-purple-500 hover:bg-purple-600' }
  ];

  const recentActivity = user.type === 'vendor' ? [
    { text: 'Order delivered from Kumar Wholesale', time: '2 hours ago', status: 'success', icon: '✅' },
    { text: 'New message from Sharma Spices', time: '4 hours ago', status: 'info', icon: '💬' },
    { text: 'Order placed for vegetables', time: '1 day ago', status: 'pending', icon: '⏳' }
  ] : [
    { text: 'New order from Raj Chaat Corner', time: '1 hour ago', status: 'success', icon: '🆕' },
    { text: 'Payment received ₹2,500', time: '3 hours ago', status: 'success', icon: '💰' },
    { text: 'Message from vendor about delivery', time: '5 hours ago', status: 'info', icon: '📱' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">Welcome back!</h2>
            <p className="text-orange-100">{user.name}</p>
            <p className="text-orange-100 text-sm">{user.businessName}</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-300">⭐</span>
                <span className="text-sm font-medium">{user.rating}</span>
              </div>
              {user.verified && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  ✓ Verified
                </span>
              )}
              <span className="text-xs bg-orange-600 px-2 py-1 rounded-full">
                Trust: {user.trustScore}%
              </span>
            </div>
          </div>
          <div className="text-6xl opacity-20">
            {user.type === 'vendor' ? '🍽️' : '🏪'}
          </div>
        </div>
        
        {!isOnline && (
          <div className="mt-4 p-3 bg-orange-600 rounded-lg flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <p className="text-sm">You're offline. Some features may be limited.</p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{stats.title}</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className={`p-4 rounded-xl border ${card.bg}`}>
                <Icon className={`w-6 h-6 mb-3 ${card.color}`} />
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <div className="text-sm text-gray-600">{card.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                disabled={!isOnline && action.id === 'chat'}
                className={`p-4 rounded-xl text-white font-medium transition-all flex items-center space-x-3 ${
                  isOnline || action.id !== 'chat'
                    ? action.color
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{action.label}</span>
                {!isOnline && action.id === 'chat' && (
                  <span className="text-xs bg-gray-400 px-2 py-1 rounded ml-auto">Offline</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="card">
              <div className="flex items-start space-x-3">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-medium">{activity.text}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'success' ? 'bg-green-100 text-green-800' :
                  activity.status === 'info' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="text-blue-900 font-medium mb-1">Pro Tip</h3>
            <p className="text-blue-800 text-sm">
              {user.type === 'vendor' 
                ? 'Build relationships with 3-5 trusted suppliers for better rates and reliable delivery. Use the chat feature to negotiate bulk discounts.'
                : 'Respond quickly to vendor messages to build trust and get more orders. Maintain consistent quality to improve your ratings.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;