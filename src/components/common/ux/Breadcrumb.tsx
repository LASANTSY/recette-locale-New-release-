// Breadcrumb.tsx
import type { ReactNode } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

const Breadcrumb = ({ 
  items, 
  separator = '/',
  className = ''
}: BreadcrumbProps) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="text-gray-400 mx-2">
                {separator}
              </span>
            )}
            
            {index === items.length - 1 ? (
              <span className="flex items-center text-gray-500 text-sm">
                {item.icon && (
                  <span className="mr-1">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                onClick={item.onClick}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200"
              >
                {item.icon && (
                  <span className="mr-1">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;