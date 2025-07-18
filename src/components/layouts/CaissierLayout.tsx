import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { 
  Home, 
  Users, 
  BarChart3, 
  Mail, 
  Calendar, 
  Settings,
} from 'lucide-react';
import { Navbar, Sidebar } from '../common/frame/IndexExport';
import { mockNotifications } from '../common/data/mockNotifications';
import { mockUserData } from '../common/data/mockUserData';
import { useTheme } from '../../context/ThemeContext';

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

const CaissierLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const { theme } = useTheme();

  const SIDEBAR_WIDTH_EXPANDED = 256;
  const SIDEBAR_WIDTH_COLLAPSED = 64;
  const NAVBAR_HEIGHT = 64;

  const sidebarItems: SidebarItem[] = [
    { id: 'encaissement', name: 'Encaissement', icon: Home, route: '/' },
    { id: 'ticketing', name: 'Ticketing', icon: Users, route: '/users' },
    { id: 'historiques', name: 'Historiques', icon: BarChart3, route: '/analytics' },
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

  const currentSidebarWidth = isSidebarCollapsed 
    ? SIDEBAR_WIDTH_COLLAPSED 
    : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar fixe */}
      <div 
        className="fixed left-0 top-0 h-full z-20 transition-all duration-300 ease-in-out"
        style={{ width: `${currentSidebarWidth}px` }}
      >
        <Sidebar 
          items={sidebarItems}
          activeItem={activeItem}
          onItemClick={handleItemClick}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          // accentColor="#3b82f6"
        />
      </div>

      {/* Contenu principal */}
      <div 
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        // style={{ 
        //   marginLeft: `${currentSidebarWidth}px`,
        //   width: `calc(100% - ${currentSidebarWidth}px)`
        // }}
      >
        {/* Navbar fixe */}
        <div 
          className="fixed top-0 z-10 w-full"
          style={{
            height: `${NAVBAR_HEIGHT}px`,
            width: `calc(100% - ${currentSidebarWidth}px)`
          }}
        >
          <Navbar
            userName={mockUserData.userName}
            userRole={mockUserData.userRole}
            userAvatar={mockUserData.userAvatar}
            sidebarWidth={currentSidebarWidth}
            isSidebarCollapsed={isSidebarCollapsed}
            notifications={mockNotifications}
            onLogout={handleLogout}
            onNotificationClick={handleNotificationClick}
            onProfileClick={() => console.log('Profil cliqué')}
            onSettingsClick={() => console.log('Paramètres cliqués')}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* Contenu scrollable */}
        <Outlet/>
      </div>
    </div>
  );
};

export default CaissierLayout;