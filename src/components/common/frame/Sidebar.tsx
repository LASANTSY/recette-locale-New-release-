import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X
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
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items = [], 
  activeItem = '',
  onItemClick = () => {},
  className = '',
  accentColor = '#3b82f6'
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
    // Fermer le menu mobile après clic
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  // Fonction pour convertir hex en rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return hex;
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <>
      {/* Bouton menu mobile */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay mobile */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed md:relative top-0 left-0 h-full bg-white border-r border-gray-200 
          transition-all duration-300 ease-in-out z-50 flex flex-col shadow-lg md:shadow-none
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              Navigation
            </h2>
          )}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4" role="navigation">
          <ul className="space-y-1 px-2">
            {items.map((item: SidebarItem) => {
              const isActive = activeItem === item.id;
              const Icon = item.icon;
              
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                      transition-all duration-200 ease-in-out group relative overflow-hidden
                      ${isActive 
                        ? 'text-white shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    style={{
                      backgroundColor: isActive ? hexToRgba(accentColor, 0.15) : 'transparent',
                      backgroundImage: isActive 
                        ? `linear-gradient(135deg, ${hexToRgba(accentColor, 0.12)}, ${hexToRgba(accentColor, 0.18)})` 
                        : 'none'
                    }}
                    title={isCollapsed ? item.name : ''}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Barre verticale active */}
                    {isActive && (
                      <div 
                        className="absolute left-0 top-0 w-1 h-full rounded-r-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                    
                    {/* Effet de hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-gray-50 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
                    
                    {/* Icône */}
                    <Icon 
                      size={20} 
                      className={`
                        flex-shrink-0 transition-all duration-200 relative z-10
                        ${isActive 
                          ? 'text-blue-600 scale-110' 
                          : 'text-gray-600 group-hover:text-gray-900 group-hover:scale-105'
                        }
                      `}
                    />
                    
                    {/* Nom de l'item */}
                    {!isCollapsed && (
                      <span className={`
                        font-medium truncate relative z-10 transition-colors duration-200
                        ${isActive ? 'text-blue-600' : 'text-gray-700 group-hover:text-gray-900'}
                      `}>
                        {item.name}
                      </span>
                    )}
                    
                    {/* Tooltip pour mode rétracté */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="text-xs text-gray-500 text-center">
              © 2025 Mon App
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// Exemple d'utilisation
// const App: React.FC = () => {
//   const [activeItem, setActiveItem] = useState<string>('dashboard');

//   const sidebarItems: SidebarItem[] = [
//     { id: 'dashboard', name: 'Tableau de bord', icon: Home, route: '/' },
//     { id: 'users', name: 'Utilisateurs', icon: Users, route: '/users' },
//     { id: 'analytics', name: 'Analytiques', icon: BarChart3, route: '/analytics' },
//     { id: 'messages', name: 'Messages', icon: Mail, route: '/messages' },
//     { id: 'calendar', name: 'Calendrier', icon: Calendar, route: '/calendar' },
//     { id: 'settings', name: 'Paramètres', icon: Settings, route: '/settings' }
//   ];

//   const handleItemClick = (item: SidebarItem): void => {
//     setActiveItem(item.id);
//     console.log('Navigation vers:', item.route);
//   };

//   return (
//     <div className="h-screen bg-gray-50 flex">
//       <Sidebar 
//         items={sidebarItems}
//         activeItem={activeItem}
//         onItemClick={handleItemClick}
//         accentColor="#3b82f6"
//       />
      
//       {/* Contenu principal */}
//       <main className="flex-1 p-8 md:p-12 overflow-auto">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8">
//             Contenu Principal
//           </h1>
          
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <h2 className="text-xl font-semibold mb-4">
//               Item actif: {sidebarItems.find(item => item.id === activeItem)?.name}
//             </h2>
            
//             <p className="text-gray-600 mb-6">
//               Ceci est un exemple de contenu principal. La sidebar est entièrement responsive 
//               et s'adapte automatiquement aux différentes tailles d'écran.
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {[1, 2, 3, 4, 5, 6].map((num: number) => (
//                 <div key={num} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
//                   <h3 className="font-medium text-gray-900 mb-2">
//                     Élément {num}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Contenu d'exemple pour démontrer le layout responsive.
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default App;