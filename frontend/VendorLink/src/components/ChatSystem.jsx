import React, { useState } from 'react';
import { ArrowLeft, Send, Phone, MoreVertical, Circle } from 'lucide-react';
import { sendChat } from '../api';

const sendMessage = async () => {
  if (!newMessage.trim()) return;

  try {
    await sendChat({
      from: user.email,
      to: selectedChat.email, // or user id
      message: newMessage
    });
    setNewMessage('');
    // Optionally refresh chat list
  } catch (err) {
    console.error('Chat send failed:', err);
  }
};


function ChatSystem({ user, isOnline }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const chatList = user.type === 'vendor' ? [
    {
      id: 1,
      name: 'Kumar Wholesale',
      lastMessage: 'Yes, I can do ₹23/kg for onions',
      time: '2 min ago',
      unread: 2,
      online: true,
      avatar: '🏪',
      type: 'supplier'
    },
    {
      id: 2,
      name: 'Sharma Spices',
      lastMessage: 'New batch of red chili arrived',
      time: '1 hour ago',
      unread: 0,
      online: true,
      avatar: '🌶️',
      type: 'supplier'
    },
    {
      id: 3,
      name: 'Gupta Oil Mills',
      lastMessage: 'Delivery will be at 4 PM',
      time: '3 hours ago',
      unread: 1,
      online: false,
      avatar: '🛢️',
      type: 'supplier'
    }
  ] : [
    {
      id: 1,
      name: 'Raj Chaat Corner',
      lastMessage: 'Can you do bulk discount?',
      time: '5 min ago',
      unread: 1,
      online: true,
      avatar: '🍽️',
      type: 'vendor'
    },
    {
      id: 2,
      name: 'Delhi Street Food',
      lastMessage: 'Thanks for quick delivery!',
      time: '2 hours ago',
      unread: 0,
      online: false,
      avatar: '🍛',
      type: 'vendor'
    }
  ];

  const currentChat = selectedChat ? {
    ...selectedChat,
    messages: [
      {
        id: 1,
        sender: selectedChat.name,
        text: 'Hello! I need onions for tomorrow.',
        time: '10:30 AM',
        isMine: false
      },
      {
        id: 2,
        sender: user.name,
        text: 'Sure! How much quantity do you need?',
        time: '10:32 AM',
        isMine: true
      },
      {
        id: 3,
        sender: selectedChat.name,
        text: 'Around 25 kg. What\'s your rate?',
        time: '10:35 AM',
        isMine: false
      },
      {
        id: 4,
        sender: user.name,
        text: '₹25/kg. For 25kg, I can do ₹24/kg',
        time: '10:36 AM',
        isMine: true
      },
      {
        id: 5,
        sender: selectedChat.name,
        text: 'Can you do ₹23/kg? I\'m a regular customer',
        time: '10:40 AM',
        isMine: false
      },
      {
        id: 6,
        sender: user.name,
        text: 'Let me check... Yes, ₹23/kg is fine for 25kg+',
        time: '10:42 AM',
        isMine: true
      }
    ]
  } : null;

  const quickReplies = user.type === 'vendor' ? [
    'What are your rates?',
    'Do you have bulk discount?',
    'When can you deliver?',
    'Is this fresh stock?',
    'Can you do ₹X/kg?'
  ] : [
    'Yes, available',
    'Current rate is ₹X/kg',
    'Can deliver in 2 hours',
    'Fresh stock daily',
    'Bulk discount available'
  ];

  const sendMessage = () => {
    if (!newMessage.trim() || !isOnline) return;
    
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  if (!isOnline) {
    return (
      <div className="p-4">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
          <div className="text-4xl mb-4">📵</div>
          <h3 className="text-lg font-medium text-red-900 mb-2">Chat Unavailable</h3>
          <p className="text-red-700">
            Connect to internet to chat with {user.type === 'vendor' ? 'suppliers' : 'vendors'}
          </p>
        </div>
      </div>
    );
  }

  if (!selectedChat) {
    return (
      <div className="flex flex-col h-screen">
        {/* Chat List Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Messages
          </h2>
          <p className="text-sm text-gray-600">
            Chat with {user.type === 'vendor' ? 'suppliers' : 'vendors'} • Bargain rates
          </p>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chatList.map(chat => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="w-full p-4 border-b border-gray-100 hover:bg-gray-50 text-left transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                    {chat.avatar}
                  </div>
                  <Circle className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    chat.online ? 'text-green-500 fill-current' : 'text-gray-400 fill-current'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                  <span className="text-xs text-gray-400 capitalize">{chat.type}</span>
                </div>

                {chat.unread > 0 && (
                  <div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSelectedChat(null)}
            className="text-orange-500 hover:text-orange-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                {currentChat.avatar}
              </div>
              <Circle className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                currentChat.online ? 'text-green-500 fill-current' : 'text-gray-400 fill-current'
              }`} />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{currentChat.name}</h3>
              <p className="text-xs text-gray-500">
                {currentChat.online ? '🟢 Online' : '⚫ Offline'} • {currentChat.type}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {currentChat.messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.isMine
                ? 'bg-orange-500 text-white rounded-br-md'
                : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isMine ? 'text-orange-100' : 'text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2 overflow-x-auto mb-4">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => setNewMessage(reply)}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full transition-all ${
              newMessage.trim()
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatSystem;