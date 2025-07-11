import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Menu,
  X
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
  onToggleSidebar?: () => void;
  onToggleDarkMode?: () => void;
  isDarkMode?: boolean;
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
  onToggleSidebar = () => {},
  onToggleDarkMode = () => {},
  isDarkMode = false,
  className = ''
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>('');
  const [showGreeting, setShowGreeting] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Détecter la taille de l'écran
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    // Masquer le message après 4 secondes sur desktop seulement
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowGreeting(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [userName, isMobile]);

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

  const unreadNotifications = notifications.filter(n => !n.read);

  const getNotificationColor = (type: string): string => {
    switch (type) {
      case 'error': return isDarkMode ? 'text-red-400' : 'text-red-600';
      case 'warning': return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
      case 'success': return isDarkMode ? 'text-green-400' : 'text-green-600';
      default: return isDarkMode ? 'text-blue-400' : 'text-blue-600';
    }
  };

  const getNotificationBg = (type: string): string => {
    if (isDarkMode) {
      switch (type) {
        case 'error': return 'bg-red-900/20 border-red-800';
        case 'warning': return 'bg-yellow-900/20 border-yellow-800';
        case 'success': return 'bg-green-900/20 border-green-800';
        default: return 'bg-blue-900/20 border-blue-800';
      }
    } else {
      switch (type) {
        case 'error': return 'bg-red-50 border-red-200';
        case 'warning': return 'bg-yellow-50 border-yellow-200';
        case 'success': return 'bg-green-50 border-green-200';
        default: return 'bg-blue-50 border-blue-200';
      }
    }
  };

  return (
    <nav 
      className={`
        h-16 transition-all duration-300 ease-in-out shadow-sm z-30
        ${isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
        }
        ${isMobile ? 'w-full' : ''}
        border-b
        ${className}
      `}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Bouton menu mobile + Message de salutation */}
        <div className="flex items-center flex-1 min-w-0">
          {/* Bouton menu mobile */}
          {isMobile && (
            <button
              onClick={onToggleSidebar}
              className={`
                p-2 rounded-lg mr-3 transition-colors duration-200
                ${isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
                }
              `}
              aria-label="Toggle sidebar"
            >
              {isSidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          )}

          {/* Message de salutation */}
          <div className="flex-1 min-w-0">
            {(showGreeting || isMobile) && (
              <div className={`transition-opacity duration-500 ${showGreeting ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className={`
                  text-base sm:text-lg font-semibold truncate
                  ${isDarkMode ? 'text-white' : 'text-gray-800'}
                `}>
                  {isMobile ? userName : greeting}
                </h1>
                <p className={`
                  text-xs sm:text-sm truncate
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                `}>
                  {userRole}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions de droite */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Bouton Dark/Light Mode */}
          <button
            onClick={onToggleDarkMode}
            className={`
              p-2 rounded-lg transition-colors duration-200
              ${isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
              }
            `}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun size={18} className="sm:w-5 sm:h-5" />
            ) : (
              <Moon size={18} className="sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Dropdown Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`
                relative p-2 rounded-lg transition-colors duration-200
                ${isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
                }
              `}
              aria-label="Notifications"
            >
              <Bell size={18} className="sm:w-5 sm:h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse">
                  {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className={`
                absolute right-0 mt-2 w-72 sm:w-80 rounded-lg shadow-lg border max-h-96 overflow-hidden animate-fadeIn
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
                }
              `}>
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Notifications
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
                          p-3 border-b cursor-pointer transition-colors
                          ${isDarkMode 
                            ? `border-gray-700 hover:bg-gray-700 ${!notification.read ? 'bg-gray-700/50' : ''}` 
                            : `border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`
                          }
                        `}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationColor(notification.type)}`} />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <Bell size={24} className={`mx-auto mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        Aucune notification
                      </p>
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
              className={`
                flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200
                ${isDarkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
                }
              `}
              aria-label="Profile menu"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <User size={14} className="sm:w-4 sm:h-4 text-gray-600" />
                )}
              </div>
              
              {/* Nom utilisateur - caché sur très petits écrans */}
              <div className="hidden sm:block text-left min-w-0">
                <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {userName}
                </p>
                <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {userRole}
                </p>
              </div>
              
              <ChevronDown size={14} className={`sm:w-4 sm:h-4 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </button>

            {isProfileOpen && (
              <div className={`
                absolute right-0 mt-2 w-48 rounded-lg shadow-lg border animate-fadeIn
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
                }
              `}>
                <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userName}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {userRole}
                  </p>
                </div>
                
                <div className="py-2">
                  <button
                    onClick={() => {
                      onProfileClick();
                      setIsProfileOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-2 px-4 py-2 text-left transition-colors
                      ${isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-200' 
                        : 'hover:bg-gray-50 text-gray-700'
                      }
                    `}
                  >
                    <User size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span className="text-sm">Profil</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onSettingsClick();
                      setIsProfileOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-2 px-4 py-2 text-left transition-colors
                      ${isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-200' 
                        : 'hover:bg-gray-50 text-gray-700'
                      }
                    `}
                  >
                    <Settings size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span className="text-sm">Paramètres</span>
                  </button>
                  
                  <hr className={`my-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                  
                  <button
                    onClick={() => {
                      onLogout();
                      setIsProfileOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-2 px-4 py-2 text-left transition-colors
                      ${isDarkMode 
                        ? 'hover:bg-red-900/20 text-red-400' 
                        : 'hover:bg-red-50 text-red-700'
                      }
                    `}
                  >
                    <LogOut size={16} className={isDarkMode ? 'text-red-400' : 'text-red-500'} />
                    <span className="text-sm">Déconnexion</span>
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