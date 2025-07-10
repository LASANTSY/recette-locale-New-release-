// Progress.tsx
interface ProgressProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
    showLabel?: boolean;
    label?: string;
    className?: string;
  }
  
  const Progress = ({ 
    value, 
    max = 100, 
    size = 'md',
    color = 'blue',
    showLabel = false,
    label,
    className = ''
  }: ProgressProps) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
    const sizes = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    };
  
    const colors = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      yellow: 'bg-yellow-600',
      red: 'bg-red-600',
      purple: 'bg-purple-600'
    };
  
    return (
      <div className={className}>
        {(showLabel || label) && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {label || 'Progress'}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        
        <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
          <div
            className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default Progress;