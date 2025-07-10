// components/Dropdown.tsx
import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  separator?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
  menuClassName?: string;
  disabled?: boolean;
}

export const Dropdown = ({
  trigger,
  items,
  position = 'bottom-left',
  className = '',
  menuClassName = '',
  disabled = false
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2'
  };

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`
            absolute z-50 min-w-48 bg-white border border-gray-200 rounded-md shadow-lg
            ${positionClasses[position]}
            ${menuClassName}
          `}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <div key={index}>
                {item.separator && index > 0 && (
                  <div className="border-t border-gray-200 my-1" />
                )}
                <button
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={`
                    w-full px-4 py-2 text-left text-sm transition-colors
                    ${item.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="flex items-center">
                    {item.icon && (
                      <span className="mr-2 flex-shrink-0">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Composant DropdownButton pour une utilisation plus simple
interface DropdownButtonProps {
  label: string;
  items: DropdownItem[];
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  disabled?: boolean;
  className?: string;
}

export const DropdownButton = ({
  label,
  items,
  variant = 'outline',
  size = 'md',
  position = 'bottom-left',
  disabled = false,
  className = ''
}: DropdownButtonProps) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const trigger = (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-md
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
    >
      {label}
      <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return (
    <Dropdown
      trigger={trigger}
      items={items}
      position={position}
      disabled={disabled}
    />
  );
};

export default Dropdown;