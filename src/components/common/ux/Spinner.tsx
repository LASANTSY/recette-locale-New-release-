// Spinner.tsx
interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'gray' | 'green' | 'red' | 'yellow' | 'purple';
    className?: string;
  }
  
  const Spinner = ({ size = 'md', color = 'blue', className = '' }: SpinnerProps) => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    };
  
    const colors = {
      blue: 'border-blue-600',
      gray: 'border-gray-600',
      green: 'border-green-600',
      red: 'border-red-600',
      yellow: 'border-yellow-600',
      purple: 'border-purple-600'
    };
  
    const classes = `
      animate-spin rounded-full border-2 border-t-transparent
      ${sizes[size]}
      ${colors[color]}
      ${className}
    `.trim();
  
    return (
      <div className={classes}></div>
    );
  };
  
  export default Spinner;