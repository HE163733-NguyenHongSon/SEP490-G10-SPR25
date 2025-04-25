export const Button = ({ 
    variant = 'default', 
    onClick, 
    className = '', 
    children 
  }: { 
    variant?: 'default' | 'outline' | 'ghost';
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
    
    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };