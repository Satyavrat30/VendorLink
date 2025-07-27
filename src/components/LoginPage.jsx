import React, { useState } from 'react';
import { Utensils, Store, Wifi, WifiOff, CheckCircle } from 'lucide-react';

function LoginPage({ onLogin, isOnline }) {
  const [userType, setUserType] = useState('vendor');
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    businessName: '',
    location: '',
    category: ''
  });

  const categories = {
    vendor: ['Street Food', 'Chaat Corner', 'Tea Stall', 'Juice Bar', 'Snacks', 'Other'],
    supplier: ['Vegetables', 'Spices', 'Oil & Ghee', 'Flour & Grains', 'Dairy', 'Other']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      ...formData,
      type: userType,
      id: Date.now().toString(),
      rating: Math.floor(Math.random() * 1.5) + 4, // 4-5 stars
      verified: Math.random() > 0.2, // 80% verified
      joinedDate: new Date().toISOString(),
      trustScore: Math.floor(Math.random() * 20) + 80 // 80-100 trust score
    };

    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500 p-4 rounded-full">
              <Utensils className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VendorLink</h1>
          <p className="text-gray-600 mb-4">
            Connecting street food vendors with trusted suppliers
          </p>
          
          {/* Connection Status */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 font-medium">Offline Mode</span>
              </>
            )}
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* User Type Selection */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 text-center">I am a:</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('vendor')}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  userType === 'vendor'
                    ? 'border-vendor-500 bg-vendor-50 text-vendor-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Utensils className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Street Vendor</div>
                <div className="text-xs mt-1">Buy raw materials</div>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('supplier')}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  userType === 'supplier'
                    ? 'border-supplier-500 bg-supplier-50 text-supplier-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Store className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Supplier</div>
                <div className="text-xs mt-1">Sell raw materials</div>
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input-field"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  placeholder="Raj Kumar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="input-field"
                  placeholder={userType === 'vendor' ? 'Raj Chaat Corner' : 'Kumar Wholesale'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select Category</option>
                  {categories[userType].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="input-field"
                  placeholder="Chandni Chowk, Delhi"
                />
              </div>

              <button
                type="submit"
                disabled={!isOnline}
                className={`w-full mt-6 ${
                  isOnline
                    ? 'btn-primary'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed py-3 px-6 rounded-lg'
                }`}
              >
                {isOnline ? 'Get Started' : 'Connect to Internet'}
              </button>
            </form>

            {!isOnline && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 flex items-center">
                  <WifiOff className="w-4 h-4 mr-2" />
                  You're offline. Connect to internet to get started.
                </p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="text-center">
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                Trusted suppliers
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                Direct chat
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                Works offline
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;