import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import ChatSystem from './components/ChatSystem';
import OrderManagement from './components/OrderManagement';
import ProfilePage from './components/ProfilePage';
import BottomNavigation from './components/BottomNavigation';
import Header from './components/Header';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} isOnline={isOnline} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={currentUser} 
        isOnline={isOnline} 
        onLogout={handleLogout} 
      />

      <main className="pb-20">
        {currentPage === 'dashboard' && (
          <Dashboard 
            user={currentUser} 
            onNavigate={navigateTo}
            isOnline={isOnline}
          />
        )}
        {currentPage === 'marketplace' && (
          <Marketplace 
            user={currentUser}
            onNavigate={navigateTo}
            isOnline={isOnline}
          />
        )}
        {currentPage === 'chat' && (
          <ChatSystem 
            user={currentUser}
            isOnline={isOnline}
          />
        )}
        {currentPage === 'orders' && (
          <OrderManagement 
            user={currentUser}
            isOnline={isOnline}
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage 
            user={currentUser}
            isOnline={isOnline}
          />
        )}
      </main>

      <BottomNavigation 
        currentPage={currentPage}
        onNavigate={navigateTo}
        userType={currentUser?.type}
      />
    </div>
  );
}

export default App;