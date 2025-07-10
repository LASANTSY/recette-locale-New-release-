// components/Select.tsx
import { forwardRef } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    error,
    helperText,
    options,
    placeholder,
    fullWidth = false,
    className = '',
    ...props
  }, ref) => {
    const baseClasses = 'px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white';
    const errorClasses = error ? 'border-red-500' : 'border-gray-300';
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          className={`
            ${baseClasses}
            ${errorClasses}
            ${widthClass}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Composant Checkbox
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    label,
    error,
    helperText,
    className = '',
    ...props
  }, ref) => {
    return (
      <div className="flex items-start">
        <input
          ref={ref}
          type="checkbox"
          className={`
            h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        
        {label && (
          <div className="ml-3">
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            {helperText && !error && (
              <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Composant Radio
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({
    label,
    error,
    className = '',
    ...props
  }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="radio"
          className={`
            h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        
        {label && (
          <label className="ml-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Select;