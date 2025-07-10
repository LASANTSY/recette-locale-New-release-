// Badge.tsx
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  outline?: boolean;
  className?: string;
}

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  rounded = false,
  outline = false,
  className = ''
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium';
  
  const variants = {
    default: outline 
      ? 'bg-gray-100 text-gray-800 border border-gray-300'
      : 'bg-gray-100 text-gray-800',
    primary: outline 
      ? 'bg-blue-50 text-blue-700 border border-blue-200'
      : 'bg-blue-100 text-blue-800',
    success: outline 
      ? 'bg-green-50 text-green-700 border border-green-200'
      : 'bg-green-100 text-green-800',
    warning: outline 
      ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
      : 'bg-yellow-100 text-yellow-800',
    error: outline 
      ? 'bg-red-50 text-red-700 border border-red-200'
      : 'bg-red-100 text-red-800',
    info: outline 
      ? 'bg-blue-50 text-blue-700 border border-blue-200'
      : 'bg-blue-100 text-blue-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };

  const roundedClasses = rounded ? 'rounded-full' : 'rounded';

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${roundedClasses}
    ${className}
  `.trim();

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;