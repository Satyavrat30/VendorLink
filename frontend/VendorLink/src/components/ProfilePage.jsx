import React, { useState } from 'react';
import { Edit2, Save, X, Star, Award, Users, Calendar, Settings, HelpCircle, Phone, FileText } from 'lucide-react';

function ProfilePage({ user, isOnline }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    businessName: user.businessName,
    phone: user.phone,
    location: user.location,
    category: user.category
  });

  const handleSave = () => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const stats = user.type === 'vendor' ? [
    { label: 'Total Orders', value: '156', icon: '📦' },
    { label: 'Trusted Suppliers', value: '12', icon: '🤝' },
    { label: 'Money Saved', value: '₹25,400', icon: '💰' },
    { label: 'Member Since', value: 'Jan 2024', icon: '📅' }
  ] : [
    { label: 'Orders Fulfilled', value: '890', icon: '✅' },
    { label: 'Active Vendors', value: '45', icon: '👥' },
    { label: 'Revenue Earned', value: '₹1,25,600', icon: '💰' },
    { label: 'Member Since', value: 'Jan 2024', icon: '📅' }
  ];

  const achievements = user.type === 'vendor' ? [
    { title: 'Trusted Buyer', desc: 'Made 100+ successful orders', icon: Award, color: 'text-yellow-600' },
    { title: 'Early Bird', desc: 'One of the first 500 vendors', icon: Star, color: 'text-blue-600' },
    { title: 'Community Member', desc: 'Active for 6+ months', icon: Users, color: 'text-green-600' }
  ] : [
    { title: 'Reliable Supplier', desc: 'Maintained 4.8+ rating', icon: Star, color: 'text-yellow-600' },
    { title: 'Quick Responder', desc: 'Average response time < 10 min', icon: Award, color: 'text-blue-600' },
    { title: 'Top Seller', desc: 'Top 10% supplier this month', icon: Award, color: 'text-purple-600' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl">
            {user.type === 'vendor' ? '🍽️' : '🏪'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-orange-100">{user.businessName}</p>
            <p className="text-orange-100 text-sm">📍 {user.location}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="font-medium">{user.rating}</span>
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
        </div>
      </div>

      {/* Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Information */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            disabled={!isOnline}
            className={`flex items-center space-x-1 text-sm font-medium ${
              isOnline 
                ? 'text-orange-600 hover:text-orange-700' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Name', key: 'name', icon: '👤' },
            { label: 'Business Name', key: 'businessName', icon: '🏢' },
            { label: 'Phone', key: 'phone', icon: '📱' },
            { label: 'Location', key: 'location', icon: '📍' },
            { label: 'Category', key: 'category', icon: '🏷️' }
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.icon} {field.label}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData[field.key]}
                  onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                  {formData[field.key]}
                </p>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="card">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-6 h-6 ${achievement.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* App Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">App Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Get notified about new orders and messages</p>
            </div>
            <button className="w-12 h-6 bg-orange-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Offline Mode</p>
              <p className="text-sm text-gray-600">Cache data for offline access</p>
            </div>
            <button className="w-12 h-6 bg-orange-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Language</p>
              <p className="text-sm text-gray-600">English (हिंदी coming soon)</p>
            </div>
            <button className="text-orange-600 text-sm font-medium">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Support & Help */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support & Help</h3>
        <div className="space-y-3">
          {[
            { label: 'Help Center', icon: HelpCircle },
            { label: 'Contact Support', icon: Phone },
            { label: 'Rate the App', icon: Star },
            { label: 'Terms & Privacy', icon: FileText }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">{item.label}</span>
                <span className="ml-auto text-gray-400">→</span>
              </button>
            );
          })}
        </div>
      </div>

      {!isOnline && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            🔄 You're offline. Profile changes will sync when you're back online.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;