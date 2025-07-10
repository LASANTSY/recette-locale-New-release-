// components/Loading.tsx
// import type { ReactNode } from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

export const Loading = ({
  size = 'md',
  color = 'primary',
  fullScreen = false,
  text,
  className = ''
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  };

  const spinner = (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          {spinner}
          {text && (
            <p className="mt-2 text-sm text-gray-600">{text}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center">
        {spinner}
        {text && (
          <p className="mt-2 text-sm text-gray-600">{text}</p>
        )}
      </div>
    </div>
  );
};

// Composant Skeleton pour le loading des contenus
interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  lines?: number;
  avatar?: boolean;
}

export const Skeleton = ({
  width = '100%',
  height = '1rem',
  className = '',
  lines = 1,
  avatar = false
}: SkeletonProps) => {
  if (avatar) {
    return (
      <div className={`animate-pulse flex space-x-4 ${className}`}>
        <div className="rounded-full bg-gray-200 h-12 w-12"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded"
          style={{
            width: index === lines - 1 ? '75%' : width,
            height: height
          }}
        />
      ))}
    </div>
  );
};

// Composant Spinner simple
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

export const Spinner = ({ size = 'md', color = 'primary' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    primary: 'border-blue-600',
    secondary: 'border-gray-600',
    white: 'border-white'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color]}
        border-2 border-t-transparent rounded-full animate-spin
      `}
    />
  );
};

export default Loading;