// AdministrateurLayout.tsx
import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BarChart3, 
  Mail, 
  Calendar, 
  Settings,
  MoreHorizontal 
} from 'lucide-react';
import { Navbar, Sidebar } from '../common/frame/IndexExport';
import { mockNotifications } from '../common/data/mockNotifications';
import { mockUserData } from '../common/data/mockUserData';

// Définition des types
type SidebarItem = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  route: string;
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const AdministrateurLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('dashboard');

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', name: 'Tableau de bord', icon: Home, route: '/' },
    { id: 'users', name: 'Utilisateurs', icon: Users, route: '/users' },
    { id: 'analytics', name: 'Analytiques', icon: BarChart3, route: '/analytics' },
    { id: 'messages', name: 'Messages', icon: Mail, route: '/messages' },
    { id: 'calendar', name: 'Calendrier', icon: Calendar, route: '/calendar' },
    { id: 'settings', name: 'Paramètres', icon: Settings, route: '/settings' }
  ];

  const handleItemClick = (item: SidebarItem): void => {
    setActiveItem(item.id);
    console.log('Navigation vers:', item.route);
  };

  const handleLogout = (): void => {
    console.log('Déconnexion...');
  };

  const handleNotificationClick = (notification: NotificationItem): void => {
    console.log('Notification cliquée:', notification);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar 
        items={sidebarItems}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        accentColor="#3b82f6"
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          userName={mockUserData.userName}
          userRole={mockUserData.userRole}
          userAvatar={mockUserData.userAvatar}
          sidebarWidth={isSidebarCollapsed ? 64 : 256}
          isSidebarCollapsed={isSidebarCollapsed}
          notifications={mockNotifications}
          onLogout={handleLogout}
          onNotificationClick={handleNotificationClick}
          onProfileClick={() => console.log('Profil cliqué')}
          onSettingsClick={() => console.log('Paramètres cliqués')}
          onToggleSidebar={toggleSidebar}
          onToggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className={`rounded-lg shadow-sm border p-6 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Dashboard Principal
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div 
                      key={num} 
                      className={`rounded-lg p-4 hover:bg-opacity-80 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <h3 className={`font-semibold mb-2 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        Widget {num}
                      </h3>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
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
    </div>
  );
};

export default AdministrateurLayout;