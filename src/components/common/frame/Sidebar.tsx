import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  Landmark
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  route: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  className?: string;
  // accentColor?: string;
  companyName?: string;
  companyLogo?: React.ComponentType<{ size?: number; className?: string }>;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items,
  activeItem = 'home',
  onItemClick = () => {},
  className = '',
  // accentColor = '#00C21C',
  companyName = 'Anjaranaka',
  companyLogo = Landmark, // Icône représentant une mairie/administration
  isCollapsed = false,
  onToggleCollapse = () => {},
}) => {
  const { theme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobile = (): void => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleItemClick = (item: SidebarItem): void => {
    onItemClick(item);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const Logo = companyLogo;

  const sidebarCollapsed = isMobile ? false : isCollapsed;

  return (
    <>
      {/* Bouton menu mobile */}
      <button
        onClick={toggleMobile}
        className={`md:hidden fixed top-2 left-4 z-50 p-1 rounded-lg shadow-sm border transition-colors
          ${theme === 'dark' ? 'dark bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}
        aria-label="Toggle mobile menu"
      >
        <Menu size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} />
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
          fixed md:relative top-0 left-0 h-full transition-all duration-300 ease-in-out z-50 flex flex-col
          ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}
          border-r
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${className}
        `}
      >
        {/* Header avec logo */}
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center p-[18px]' : 'justify-between p-[13px]'} ${isMobile ? 'p-[18px]' : ''} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}> 
          <div className="flex items-center gap-3 min-w-0">
            <Logo 
              size={28} 
              className="flex-shrink-0 text-[#00C21C]"
            />
            {!sidebarCollapsed && (
              <h4 className={`text-lg font-bold truncate ${theme === 'dark' ? 'text-[#00E621]' : 'text-[#00C21C]'}`}>
                {companyName}
              </h4>
            )}
          </div>
          
          {/* Bouton collapse seulement visible en mode desktop */}
          {!isMobile && !sidebarCollapsed && (
            <button
              onClick={onToggleCollapse}
              className={`hidden md:flex rounded-md transition-colors
                ${theme === 'dark' ? 'dark hover:bg-gray-800 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-50 text-gray-500 hover:text-gray-700'}`}
              aria-label="Réduire le menu"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Bouton expand en mode collapsed */}
        {!isMobile && sidebarCollapsed && (
          <div className="flex justify-center pt-2">
            <button
              onClick={onToggleCollapse}
              className={`rounded-md transition-colors
                ${theme === 'dark' ? 'dark hover:bg-gray-800 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-50 text-gray-500 hover:text-gray-700'}`}
              aria-label="Développer le menu"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

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
                        ? `font-medium border border-opacity-30 ${theme === 'dark' ? 'bg-[#00E621]/20 border-[#00E621]' : 'bg-[#00C21C]/10 border-[#00C21C]'}`
                        : `${theme === 'dark' ? 'dark hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-50 text-gray-700'}`
                      }
                      ${sidebarCollapsed ? 'justify-center' : ''}
                    `}
                    style={isActive ? {
                      color: theme === 'dark' ? '#00E621' : darkenColor('#00C21C', 20)
                    } : {}}
                    title={sidebarCollapsed ? item.name : ''}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
                        style={{ backgroundColor: theme === 'dark' ? '#00E621' : '#00C21C' }}
                      />
                    )}
                    <Icon 
                      size={20} 
                      className={`flex-shrink-0 transition-colors duration-200 ${isActive ? (theme === 'dark' ? 'text-[#00E621]' : 'text-[#00C21C]') : (theme === 'dark' ? 'text-gray-400' : 'text-[#5D5D5D]')}`}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate">
                        {item.name}
                      </span>
                    )}
                    {sidebarCollapsed && (
                      <div className={`absolute left-full ml-2 px-3 py-1.5 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none
                        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                      >
                        {item.name}
                        <div className={`absolute top-1/2 -left-1 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent
                          ${theme === 'dark' ? 'border-r-gray-900' : 'border-r-white'}`}
                        />
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {/* Footer */}
        <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className={`flex ${sidebarCollapsed ? 'justify-center' : ''}`}>
            {!sidebarCollapsed && (
              <div className={`text-xs text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} {companyName}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Fonctions utilitaires pour la gestion des couleurs
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function darkenColor(hex: string, percent: number): string {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.floor(r * (100 - percent) / 100);
  g = Math.floor(g * (100 - percent) / 100);
  b = Math.floor(b * (100 - percent) / 100);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default Sidebar;