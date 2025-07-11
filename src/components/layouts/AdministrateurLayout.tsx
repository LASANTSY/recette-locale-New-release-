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

  // Constantes pour les dimensions
  const SIDEBAR_WIDTH_EXPANDED = 256;
  const SIDEBAR_WIDTH_COLLAPSED = 64;
  const NAVBAR_HEIGHT = 64;

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

  // Calcul de la largeur du sidebar actuelle
  const currentSidebarWidth = isSidebarCollapsed 
    ? SIDEBAR_WIDTH_COLLAPSED 
    : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Sidebar 
        items={sidebarItems}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        accentColor="#3b82f6"
      />

      {/* Contenu principal avec navbar et contenu */}
      <div className="flex-1 flex flex-col">
        {/* Navbar - s'ajuste automatiquement à la largeur disponible */}
        <div 
          className="fixed top-0 right-0 z-10"
          style={{
            width: `calc(100% - ${currentSidebarWidth}px)`,
            height: `${NAVBAR_HEIGHT}px`
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
            onToggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Contenu principal - avec marge pour éviter le chevauchement */}
        <main 
          className="flex-1 overflow-y-auto"
          style={{
            marginTop: `${NAVBAR_HEIGHT}px`,
            paddingLeft: '0px' // Pas de padding left car le sidebar est en position fixe
          }}
        >
          <div className="p-8">
            <div className="max-w-full mx-auto">
              {/* Header de la page */}
              <div className={`mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <h1 className="text-3xl font-bold mb-2">
                  Dashboard Principal
                </h1>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Bienvenue dans votre espace d'administration
                </p>
              </div>

              {/* Contenu principal */}
              <div className={`rounded-lg shadow-sm border p-6 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                
                {/* Grille de widgets responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[
                    { title: 'Utilisateurs Total', value: '1,234', icon: Users, color: 'bg-blue-500' },
                    { title: 'Messages', value: '56', icon: Mail, color: 'bg-green-500' },
                    { title: 'Événements', value: '23', icon: Calendar, color: 'bg-purple-500' },
                    { title: 'Analytiques', value: '89%', icon: BarChart3, color: 'bg-orange-500' },
                    { title: 'Paramètres', value: '12', icon: Settings, color: 'bg-red-500' },
                    { title: 'Autres', value: '45', icon: MoreHorizontal, color: 'bg-indigo-500' }
                  ].map((widget, index) => (
                    <div 
                      key={index} 
                      className={`rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${widget.color}`}>
                          <widget.icon size={20} className="text-white" />
                        </div>
                        <span className={`text-2xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {widget.value}
                        </span>
                      </div>
                      <h3 className={`font-semibold text-sm ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {widget.title}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Section supplémentaire */}
                <div className="mt-8">
                  <h2 className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Activité Récente
                  </h2>
                  <div className={`rounded-lg p-4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Aucune activité récente à afficher. Les données seront mises à jour automatiquement.
                    </p>
                  </div>
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