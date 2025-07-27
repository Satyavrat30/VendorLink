import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Truck, MessageCircle, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';

function Marketplace({ user, onNavigate, isOnline }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🛒' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'spices', name: 'Spices', icon: '🌶️' },
    { id: 'oil', name: 'Oil & Ghee', icon: '🛢️' },
    { id: 'flour', name: 'Flour & Grains', icon: '🌾' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' }
  ];

  const suppliers = [
    {
      id: 1,
      name: 'Kumar Wholesale',
      location: 'Chandni Chowk, Delhi',
      rating: 4.8,
      verified: true,
      minOrder: 500,
      deliveryTime: '2-4 hours',
      speciality: 'vegetables',
      trustScore: 95,
      responseTime: '< 5 min',
      products: [
        { name: 'Onions', price: 25, unit: 'kg', minQty: 10, stock: 'High' },
        { name: 'Potatoes', price: 20, unit: 'kg', minQty: 10, stock: 'Medium' },
        { name: 'Tomatoes', price: 40, unit: 'kg', minQty: 5, stock: 'Low' }
      ]
    },
    {
      id: 2,
      name: 'Sharma Spices',
      location: 'Khari Baoli, Delhi',
      rating: 4.9,
      verified: true,
      minOrder: 300,
      deliveryTime: '1-3 hours',
      speciality: 'spices',
      trustScore: 98,
      responseTime: '< 2 min',
      products: [
        { name: 'Red Chili Powder', price: 180, unit: 'kg', minQty: 2, stock: 'High' },
        { name: 'Turmeric Powder', price: 200, unit: 'kg', minQty: 2, stock: 'High' },
        { name: 'Garam Masala', price: 350, unit: 'kg', minQty: 1, stock: 'Medium' }
      ]
    },
    {
      id: 3,
      name: 'Gupta Oil Mills',
      location: 'Azadpur, Delhi',
      rating: 4.6,
      verified: false,
      minOrder: 1000,
      deliveryTime: '4-6 hours',
      speciality: 'oil',
      trustScore: 87,
      responseTime: '< 15 min',
      products: [
        { name: 'Mustard Oil', price: 120, unit: 'liter', minQty: 5, stock: 'High' },
        { name: 'Refined Oil', price: 110, unit: 'liter', minQty: 5, stock: 'Medium' },
        { name: 'Ghee', price: 450, unit: 'kg', minQty: 2, stock: 'Low' }
      ]
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || supplier.speciality === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const startChat = (supplier) => {
    onNavigate('chat');
  };

  const getStockColor = (stock) => {
    switch(stock) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search suppliers or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {showFilters && (
          <div className="card">
            <h4 className="font-medium text-gray-900 mb-3">Filters</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Minimum Rating</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Any Rating</option>
                  <option>4+ Stars</option>
                  <option>4.5+ Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Max Delivery Time</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Any Time</option>
                  <option>Within 2 hours</option>
                  <option>Within 4 hours</option>
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="verified" className="mr-2" />
                <label htmlFor="verified" className="text-sm text-gray-700">Verified suppliers only</label>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isOnline && (
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              You're offline. Showing cached suppliers. Connect to see latest updates.
            </p>
          </div>
        </div>
      )}

      {/* Suppliers List */}
      <div className="space-y-4">
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className="card">
            {/* Supplier Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                  {supplier.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Trust: {supplier.trustScore}%
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{supplier.location}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{supplier.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{supplier.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>{supplier.responseTime}</span>
                  </div>
                </div>
              </div>
              
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
            </div>

            {/* Minimum Order Info */}
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800 font-medium">
                  Minimum Order: ₹{supplier.minOrder}
                </span>
                <div className="flex items-center text-sm text-blue-600">
                  <Truck className="w-4 h-4 mr-1" />
                  <span>Free delivery above minimum</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-3">Available Products</h4>
              <div className="space-y-2">
                {supplier.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-gray-900">{product.name}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStockColor(product.stock)}`}>
                          {product.stock} Stock
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Min order: {product.minQty} {product.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{product.price}/{product.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => startChat(supplier)}
                disabled={!isOnline}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                  isOnline
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat & Bargain</span>
              </button>
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                onClick={() => onNavigate('orders')}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Quick Order</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default Marketplace;