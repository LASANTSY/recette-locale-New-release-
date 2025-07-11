import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  Home,
  Settings,
  Users,
  BarChart3,
  Mail,
  Building2
} from 'lucide-react';

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  route: string;
}

interface SidebarProps {
  items?: SidebarItem[];
  activeItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  className?: string;
  accentColor?: string;
  companyName?: string;
  companyLogo?: React.ComponentType<{ size?: number; className?: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items = [
    { id: 'home', name: 'Accueil', icon: Home, route: '/' },
    { id: 'users', name: 'Utilisateurs', icon: Users, route: '/users' },
    { id: 'analytics', name: 'Analytiques', icon: BarChart3, route: '/analytics' },
    { id: 'messages', name: 'Messages', icon: Mail, route: '/messages' },
    { id: 'settings', name: 'Paramètres', icon: Settings, route: '/settings' },
  ], 
  activeItem = 'home',
  onItemClick = () => {},
  className = '',
  accentColor = '#2563eb',
  companyName = 'MonEntreprise',
  companyLogo = Building2
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const toggleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = (): void => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleItemClick = (item: SidebarItem): void => {
    onItemClick(item);
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const Logo = companyLogo;

  return (
    <>
      {/* Bouton menu mobile */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay mobile */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={toggleMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed md:relative top-0 left-0 h-full bg-white border-r border-gray-100
          transition-all duration-300 ease-in-out z-50 flex flex-col
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${className}
        `}
      >
        {/* Header avec logo et nom */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <Logo 
              size={28} 
              className="flex-shrink-0 text-gray-700"
            />
            {!isCollapsed && (
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {companyName}
              </h1>
            )}
          </div>
          
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-md hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-700"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6" role="navigation">
          <ul className="space-y-1 px-3">
            {items.map((item: SidebarItem) => {
              const isActive = activeItem === item.id;
              const Icon = item.icon;
              
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                      transition-all duration-200 ease-in-out group relative
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.name : ''}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Indicateur actif */}
                    {isActive && (
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                    
                    {/* Icône */}
                    <Icon 
                      size={20} 
                      className={`
                        flex-shrink-0 transition-colors duration-200
                        ${isActive 
                          ? 'text-blue-600' 
                          : 'text-gray-500 group-hover:text-gray-700'
                        }
                      `}
                    />
                    
                    {/* Nom de l'item */}
                    {!isCollapsed && (
                      <span className="truncate">
                        {item.name}
                      </span>
                    )}
                    
                    {/* Tooltip pour mode rétracté */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                        {item.name}
                        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900" />
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer minimaliste */}
        <div className="p-4 border-t border-gray-100">
          {!isCollapsed && (
            <div className="text-xs text-gray-400 text-center">
              © 2025 {companyName}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;