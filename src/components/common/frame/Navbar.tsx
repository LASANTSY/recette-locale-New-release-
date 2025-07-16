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
import { useTheme } from '../../../context/ThemeContext';

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
  className = ''
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>('');
  const [showGreeting, setShowGreeting] = useState<boolean>(false);
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

  // Gestion du salut selon l'heure avec animation améliorée
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

    // Animation d'entrée du message
    const showTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 300);

    // Masquer le message après 5 secondes sur desktop seulement
    let hideTimer: NodeJS.Timeout;
    if (!isMobile) {
      hideTimer = setTimeout(() => {
        setShowGreeting(false);
      }, 5000);
    } else {
      // Sur mobile, toujours afficher
      setShowGreeting(true);
    }

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
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

  // Calculer le nombre réel de notifications non lues
  const unreadNotifications = notifications.filter(n => !n.read);
  const unreadCount = unreadNotifications.length;

  // Calculer la position et la largeur de la navbar
  const getNavbarStyles = () => {
    if (isMobile) {
      return {
        left: '0',
        right: '0',
        width: '100%'
      };
    }
    
    // Mode desktop - s'adapter au sidebar
    if (isSidebarCollapsed) {
      return {
        left: '64px', // Largeur du sidebar collapsé
        right: '0',
        width: 'calc(100% - 64px)'
      };
    } else {
      return {
        left: `${sidebarWidth}px`,
        right: '0',
        width: `calc(100% - ${sidebarWidth}px)`
      };
    }
  };

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
        fixed top-0 h-16 transition-all duration-300 ease-in-out shadow-sm z-30
        ${isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
        }
        border-b
        ${className}
      `}
      style={getNavbarStyles()}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Bouton menu mobile + Message de salutation */}
        <div className="flex items-center flex-1 min-w-0">
          {/* Bouton menu mobile */}
          {isMobile && (
            <button
              onClick={onToggleSidebar}
              className={`
                p-2 rounded-lg mr-3 transition-all duration-200 hover:scale-105
                ${isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
                }
              `}
              aria-label="Toggle sidebar"
            >
              <div className="transition-transform duration-300">
                {isSidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
              </div>
            </button>
          )}

          {/* Message de salutation avec animation améliorée */}
          <div className="flex-1 min-w-0">
            <div className={`
              flex items-center gap-2 truncate
              transition-all duration-700 ease-out transform
              ${showGreeting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
            `}>
              <h5 className={`
                text-xs text-base sm:text-lg font-semibold truncate transition-colors duration-300
                ${isDarkMode ? 'text-white' : 'text-gray-800'}
                ${showGreeting ? 'animate-pulse' : ''}
              `}>
                {isMobile ? userName : greeting}
              </h5>
              <p className={`
                text-xs sm:text-sm truncate transition-colors duration-300
                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              `}>
                {userRole}
              </p>
            </div>
          </div>
        </div>

        {/* Actions de droite */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Bouton Dark/Light Mode */}
          <button
            onClick={toggleTheme}
            className={`
              p-2 rounded-lg transition-all duration-200 hover:scale-105
              ${isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
              }
            `}
            aria-label="Toggle dark mode"
          >
            <div className="transition-transform duration-300">
              {isDarkMode ? (
                <Sun size={18} className="sm:w-5 sm:h-5" />
              ) : (
                <Moon size={18} className="sm:w-5 sm:h-5" />
              )}
            </div>
          </button>

          {/* Dropdown Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`
                relative p-2 rounded-lg transition-all duration-200 hover:scale-105
                ${isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
                }
              `}
              aria-label="Notifications"
            >
              <Bell size={18} className="sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className={`
                  absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full 
                  w-5 h-5 flex items-center justify-center font-medium
                  transition-all duration-300 animate-bounce
                  ${unreadCount > 99 ? 'text-[10px]' : ''}
                `}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className={`
                absolute right-0 mt-2 w-72 sm:w-80 rounded-lg shadow-lg border max-h-96 overflow-hidden
                transform transition-all duration-300 ease-out
                animate-in slide-in-from-top-2 fade-in-0
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
                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => onNotificationClick(notification)}
                        className={`
                          p-3 border-b cursor-pointer transition-all duration-200 hover:scale-[1.02]
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
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 animate-pulse" />
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
                flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105
                ${isDarkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
                }
              `}
              aria-label="Profile menu"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform duration-200 hover:scale-110">
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
              
              <ChevronDown size={14} className={`
                sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-200
                ${isProfileOpen ? 'rotate-180' : ''}
                ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}
              `} />
            </button>

            {isProfileOpen && (
              <div className={`
                absolute right-0 mt-2 w-48 rounded-lg shadow-lg border
                transform transition-all duration-300 ease-out
                animate-in slide-in-from-top-2 fade-in-0
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
                      w-full flex items-center space-x-2 px-4 py-2 text-left transition-all duration-200 hover:scale-105
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
                      w-full flex items-center space-x-2 px-4 py-2 text-left transition-all duration-200 hover:scale-105
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
                      w-full flex items-center space-x-2 px-4 py-2 text-left transition-all duration-200 hover:scale-105
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

// Composant de démonstration
// const NavbarDemo = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//   const sampleNotifications = [
//     {
//       id: '1',
//       message: 'Nouveau message de John Doe',
//       time: 'Il y a 5 minutes',
//       read: false,
//       type: 'info' as const
//     },
//     {
//       id: '2',
//       message: 'Mise à jour système disponible',
//       time: 'Il y a 30 minutes',
//       read: false,
//       type: 'warning' as const
//     },
//     {
//       id: '3',
//       message: 'Tâche terminée avec succès',
//       time: 'Il y a 1 heure',
//       read: true,
//       type: 'success' as const
//     },
//     {
//       id: '4',
//       message: 'Erreur de connexion détectée',
//       time: 'Il y a 2 heures',
//       read: false,
//       type: 'error' as const
//     }
//   ];

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Sidebar simulée */}
//       <div className={`
//         fixed left-0 top-0 h-full transition-all duration-300 z-20
//         ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
//         ${isSidebarCollapsed ? 'w-16' : 'w-64'}
//         border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
//         hidden md:block
//       `}>
//         <div className="p-4">
//           <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
//             {isSidebarCollapsed ? 'S' : 'Sidebar'}
//           </div>
//         </div>
//       </div>

//       {/* Navbar */}
//       <Navbar
//         userName="Jean Dupont"
//         userRole="Développeur Full Stack"
//         sidebarWidth={256}
//         isSidebarCollapsed={isSidebarCollapsed}
//         notifications={sampleNotifications}
//         onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//         onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
//         isDarkMode={isDarkMode}
//         onNotificationClick={(notification) => console.log('Notification clicked:', notification)}
//         onProfileClick={() => console.log('Profile clicked')}
//         onSettingsClick={() => console.log('Settings clicked')}
//         onLogout={() => console.log('Logout clicked')}
//       />

//       {/* Contenu principal */}
//       <div className={`
//         pt-16 transition-all duration-300
//         ${window.innerWidth >= 768 ? (isSidebarCollapsed ? 'ml-16' : 'ml-64') : ''}
//       `}>
//         <div className="p-6">
//           <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
//             <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
//               Démonstration de la Navbar
//             </h2>
//             <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               Cette navbar s'adapte automatiquement à l'état du sidebar en mode desktop et reste centrée en mode mobile.
//             </p>
//             <div className="space-y-2">
//               <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 • Notifications non lues: {sampleNotifications.filter(n => !n.read).length}
//               </p>
//               <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 • Mode sombre: {isDarkMode ? 'Activé' : 'Désactivé'}
//               </p>
//               <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 • Sidebar: {isSidebarCollapsed ? 'Réduite' : 'Étendue'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavbarDemo;