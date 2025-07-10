// Checkbox.tsx
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  variant?: 'default' | 'switch';
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  indeterminate = false,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  if (variant === 'switch') {
    return (
      <div className={`${className}`}>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className="sr-only"
              {...props}
            />
            <div className={`
              w-11 h-6 bg-gray-200 rounded-full shadow-inner transition-colors duration-200
              ${props.checked ? 'bg-blue-600' : 'bg-gray-200'}
            `}></div>
            <div className={`
              absolute w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 top-1
              ${props.checked ? 'translate-x-6' : 'translate-x-1'}
            `}></div>
          </div>
          {label && (
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-700">{label}</span>
              {description && (
                <p className="text-xs text-gray-500">{description}</p>
              )}
            </div>
          )}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <label className="flex items-start cursor-pointer">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`
              w-4 h-4 text-blue-600 bg-white border-gray-300 rounded 
              focus:ring-blue-500 focus:ring-2 focus:ring-offset-0
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
            `}
            {...props}
          />
          {indeterminate && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-2 h-0.5 bg-blue-600 rounded"></div>
            </div>
          )}
        </div>
        
        {label && (
          <div className="ml-3">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        )}
      </label>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;