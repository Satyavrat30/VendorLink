import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, Truck, Package, DollarSign, MessageCircle, Phone } from 'lucide-react';

function OrderManagement({ user, isOnline }) {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = {
    current: user.type === 'vendor' ? [
      {
        id: 'ORD001',
        supplier: 'Kumar Wholesale',
        items: [
          { name: 'Onions', qty: 25, unit: 'kg', price: 575, rate: 23 },
          { name: 'Potatoes', qty: 20, unit: 'kg', price: 400, rate: 20 }
        ],
        total: 975,
        status: 'confirmed',
        orderDate: '2024-01-15',
        deliveryTime: '2-4 hours',
        paymentStatus: 'pending',
        estimatedDelivery: '4:00 PM',
        trackingSteps: [
          { step: 'Order Placed', completed: true, time: '2:00 PM' },
          { step: 'Confirmed', completed: true, time: '2:05 PM' },
          { step: 'Preparing', completed: false, time: '' },
          { step: 'Out for Delivery', completed: false, time: '' },
          { step: 'Delivered', completed: false, time: '' }
        ]
      },
      {
        id: 'ORD002',
        supplier: 'Sharma Spices',
        items: [
          { name: 'Red Chili Powder', qty: 5, unit: 'kg', price: 900, rate: 180 }
        ],
        total: 900,
        status: 'in_transit',
        orderDate: '2024-01-15',
        deliveryTime: '1-3 hours',
        paymentStatus: 'paid',
        estimatedDelivery: '3:30 PM',
        trackingSteps: [
          { step: 'Order Placed', completed: true, time: '1:00 PM' },
          { step: 'Confirmed', completed: true, time: '1:05 PM' },
          { step: 'Preparing', completed: true, time: '1:30 PM' },
          { step: 'Out for Delivery', completed: true, time: '2:45 PM' },
          { step: 'Delivered', completed: false, time: '' }
        ]
      }
    ] : [
      {
        id: 'ORD001',
        vendor: 'Raj Chaat Corner',
        items: [
          { name: 'Onions', qty: 25, unit: 'kg', price: 575, rate: 23 },
          { name: 'Potatoes', qty: 20, unit: 'kg', price: 400, rate: 20 }
        ],
        total: 975,
        status: 'confirmed',
        orderDate: '2024-01-15',
        deliveryTime: '2-4 hours',
        paymentStatus: 'pending',
        estimatedDelivery: '4:00 PM'
      }
    ],
    completed: user.type === 'vendor' ? [
      {
        id: 'ORD003',
        supplier: 'Gupta Oil Mills',
        items: [
          { name: 'Mustard Oil', qty: 10, unit: 'liter', price: 1200, rate: 120 }
        ],
        total: 1200,
        status: 'delivered',
        orderDate: '2024-01-14',
        deliveryTime: '4-6 hours',
        paymentStatus: 'paid',
        deliveredAt: '6:30 PM'
      }
    ] : [
      {
        id: 'ORD003',
        vendor: 'Delhi Street Food',
        items: [
          { name: 'Mustard Oil', qty: 10, unit: 'liter', price: 1200, rate: 120 }
        ],
        total: 1200,
        status: 'delivered',
        orderDate: '2024-01-14',
        deliveryTime: '4-6 hours',
        paymentStatus: 'paid',
        deliveredAt: '6:30 PM'
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle,
      in_transit: Truck,
      delivered: Package,
      cancelled: 'X'
    };
    return icons[status] || Clock;
  };

  if (selectedOrder) {
    const StatusIcon = getStatusIcon(selectedOrder.status);
    
    return (
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedOrder(null)}
            className="flex items-center text-orange-500 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </button>
          <span className="text-sm text-gray-500">#{selectedOrder.id}</span>
        </div>

        <div className="space-y-6">
          {/* Status Card */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Order Status</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(selectedOrder.status)}`}>
                <StatusIcon className="w-4 h-4 mr-1" />
                {selectedOrder.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            {/* Order Tracking */}
            {selectedOrder.trackingSteps && (
              <div className="mb-4">
                <div className="space-y-3">
                  {selectedOrder.trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          step.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.step}
                        </p>
                        {step.time && (
                          <p className="text-xs text-gray-500">{step.time}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{selectedOrder.orderDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {selectedOrder.status === 'delivered' ? 'Delivered At:' : 'Expected Delivery:'}
                </span>
                <span className="font-medium">
                  {selectedOrder.deliveredAt || selectedOrder.estimatedDelivery || selectedOrder.deliveryTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className={`font-medium ${
                  selectedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {selectedOrder.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Supplier/Vendor Info */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-3">
              {user.type === 'vendor' ? 'Supplier' : 'Vendor'} Details
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {user.type === 'vendor' ? '🏪' : '🍽️'}
                </div>
                <div>
                  <p className="font-medium">{selectedOrder.supplier || selectedOrder.vendor}</p>
                  <p className="text-sm text-gray-600">⭐ 4.8 • Verified</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.qty} {item.unit} × ₹{item.rate}/{item.unit}
                    </p>
                  </div>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-green-600">₹{selectedOrder.total}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {selectedOrder.status === 'confirmed' && (
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium">
                Cancel Order
              </button>
            )}
            
            {selectedOrder.status === 'delivered' && selectedOrder.paymentStatus === 'pending' && (
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium">
                Mark as Paid
              </button>
            )}

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Contact {user.type === 'vendor' ? 'Supplier' : 'Vendor'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {user.type === 'vendor' ? 'My Orders' : 'Orders Received'}
          </h2>
          <p className="text-sm text-gray-600">
            Track and manage your orders
          </p>
        </div>
        {!isOnline && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Offline
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'current', label: 'Current', count: orders.current.length },
          { id: 'completed', label: 'Completed', count: orders.completed.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders[activeTab].map(order => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <div
              key={order.id}
              className="card cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedOrder(order)}
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900">#{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(order.status)}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{order.orderDate}</span>
              </div>

              {/* Supplier/Vendor */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-gray-600 text-sm">
                  {user.type === 'vendor' ? 'From:' : 'To:'}
                </span>
                <span className="font-medium text-gray-900">
                  {order.supplier || order.vendor}
                </span>
              </div>

              {/* Items Summary */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">Items:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.slice(0, 3).map((item, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {item.name} ({item.qty} {item.unit})
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    <span>{order.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className={`${
                      order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">₹{order.total}</span>
              </div>
            </div>
          );
        })}
      </div>

      {orders[activeTab].length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {activeTab === 'current' 
              ? 'You don\'t have any current orders'
              : 'No completed orders yet'
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default OrderManagement;