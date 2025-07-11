// AdministrateurLayout.tsx
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import {Navbar, Sidebar} from '../common/frame/IndexExport';
import { mockNotifications } from './mockNotifications';
import { mockUserData } from './mockUserData';
import { NotificationItem } from './types';

const AdministrateurLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleLogout = (): void => {
    console.log('Déconnexion...');
  };

  const handleNotificationClick = (notification: NotificationItem): void => {
    console.log('Notification cliquée:', notification);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar simulée */}
      <Sidebar/>

      {/* Navbar */}
      <Navbar
        userName={mockUserData.userName}
        userRole={mockUserData.userRole}
        userAvatar={mockUserData.userAvatar}
        sidebarWidth={256}
        isSidebarCollapsed={isSidebarCollapsed}
        notifications={mockNotifications}
        onLogout={handleLogout}
        onNotificationClick={handleNotificationClick}
        onProfileClick={() => console.log('Profil cliqué')}
        onSettingsClick={() => console.log('Paramètres cliqués')}
      />

      {/* Contenu principal */}
      <main 
        className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard Principal
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Widget {num}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Contenu du widget avec des données importantes.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdministrateurLayout;