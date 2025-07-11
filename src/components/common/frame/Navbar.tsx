import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';

interface NotificationItem {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

interface NavbarProps {
  userName: string;
  userRole: string;
  userAvatar?: string;
  sidebarWidth?: number;
  isSidebarCollapsed?: boolean;
  notifications?: NotificationItem[];
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  userName,
  userRole,
  userAvatar,
  sidebarWidth = 256,
  isSidebarCollapsed = false,
  notifications = [],
  onProfileClick = () => {},
  onSettingsClick = () => {},
  onLogout = () => {},
  onNotificationClick = () => {},
  className = ''
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>('');
  const [showGreeting, setShowGreeting] = useState<boolean>(true);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Gestion du salut selon l'heure
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) {
      setGreeting(`Bonjour ${userName}`);
    } else if (hour < 18) {
      setGreeting(`Bon après-midi ${userName}`);
    } else {
      setGreeting(`Bonsoir ${userName}`);
    }

    // Masquer le message après 4 secondes
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [userName]);

  // Fermer les dropdowns en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
    // Ici vous pourriez ajouter la logique pour appliquer le dark mode
    document.documentElement.classList.toggle('dark');
  };

  const unreadNotifications = notifications.filter(n => !n.read);

  const getNotificationColor = (type: string): string => {
    switch (type) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      default: return 'text-blue-600';
    }
  };

  const getNotificationBg = (type: string): string => {
    switch (type) {
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <nav 
      className={`
        fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-30
        transition-all duration-300 ease-in-out shadow-sm
        ${className}
      `}
      style={{ 
        left: isSidebarCollapsed ? '64px' : `${sidebarWidth}px`,
        width: isSidebarCollapsed ? 'calc(100% - 64px)' : `calc(100% - ${sidebarWidth}px)`
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Message de salutation */}
        <div className="flex-1">
          {showGreeting && (
            <div className="animate-fadeIn">
              <h1 className="text-lg font-semibold text-gray-800 animate-slideInLeft">
                {greeting}
              </h1>
              <p className="text-sm text-gray-500 animate-slideInLeft animation-delay-200">
                {userRole}
              </p>
            </div>
          )}
        </div>

        {/* Actions de droite */}
        <div className="flex items-center space-x-4">
          {/* Bouton Dark/Light Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-gray-600" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>

          {/* Dropdown Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-hidden animate-fadeIn">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <p className="text-sm text-gray-500">
                    {unreadNotifications.length} non lues
                  </p>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => onNotificationClick(notification)}
                        className={`
                          p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                          ${!notification.read ? 'bg-blue-50' : ''}
                        `}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationColor(notification.type)}`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <Bell size={24} className="mx-auto mb-2 text-gray-300" />
                      <p>Aucune notification</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Profil */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <User size={16} className="text-gray-600" />
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-medium text-gray-800">{userName}</p>
                  <p className="text-sm text-gray-500">{userRole}</p>
                </div>
                
                <div className="py-2">
                  <button
                    onClick={() => {
                      onProfileClick();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                  >
                    <User size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Profil</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onSettingsClick();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Paramètres</span>
                  </button>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={() => {
                      onLogout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} className="text-red-500" />
                    <span className="text-sm text-red-700">Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;