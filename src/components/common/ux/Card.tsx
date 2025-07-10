// components/Card.tsx
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  onClick?: () => void;
}

export const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  shadow = 'md',
  border = true,
  onClick
}: CardProps) => {
  const baseClasses = 'bg-white rounded-lg transition-all';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };
  
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  const borderClasses = border ? 'border border-gray-200' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      className={`
        ${baseClasses}
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${hoverClasses}
        ${borderClasses}
        ${clickableClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Composants utilitaires pour Card
export const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`text-gray-700 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mt-4 ${className}`}>
    {children}
  </div>
);

export default Card;