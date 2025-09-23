import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'positive' | 'negative';
  };
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'accent' | 'warning';
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: IconComponent, 
  variant = 'default' 
}: StatCardProps) => {
  const variants = {
    default: 'bg-surface border-border',
    primary: 'bg-gradient-primary text-primary-foreground border-primary/20',
    accent: 'bg-gradient-accent text-accent-foreground border-accent/20',
    warning: 'bg-gradient-to-br from-warning/10 to-warning/20 border-warning/30',
  };

  const iconVariants = {
    default: 'text-primary',
    primary: 'text-primary-foreground',
    accent: 'text-accent-foreground',
    warning: 'text-warning',
  };

  return (
    <div className={`${variants[variant]} border rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 ease-smooth hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-medium ${
          variant === 'default' ? 'text-muted-foreground' : 'text-current/80'
        }`}>
          {title}
        </h3>
        <IconComponent 
          size={20} 
          className={iconVariants[variant]} 
        />
      </div>
      
      <div className="space-y-2">
        <p className={`text-2xl font-bold ${
          variant === 'default' ? 'text-foreground' : 'text-current'
        }`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        
        {change && (
          <div className={`flex items-center gap-1 text-sm ${
            change.type === 'positive' ? 'text-accent' : 'text-danger'
          }`}>
            {change.type === 'positive' ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            <span>{change.value}</span>
          </div>
        )}
      </div>
    </div>
  );
};