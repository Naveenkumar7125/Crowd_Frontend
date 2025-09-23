import { Image, TrendingUp, TrendingDown, Minus, FileText, Eye } from 'lucide-react';

interface CrowdData {
  id: number;
  area: string;
  density: number;
  trend: string;
  imageUrl?: string;
}

interface CrowdCardProps {
  crowd: CrowdData;
}

export const CrowdCard = ({ crowd }: CrowdCardProps) => {
  const getDensityStatus = (density: number) => {
    if (density >= 90) return { label: 'Critical', color: 'danger' };
    if (density >= 80) return { label: 'High', color: 'warning' };
    if (density >= 60) return { label: 'Medium', color: 'primary' };
    return { label: 'Low', color: 'accent' };
  };

  const getTrendIcon = (trend: string) => {
    if (trend.includes('increasing') || trend === 'high' || trend === 'critical') {
      return <TrendingUp size={14} className="text-danger" />;
    }
    if (trend.includes('decreasing') || trend === 'low') {
      return <TrendingDown size={14} className="text-accent" />;
    }
    return <Minus size={14} className="text-muted-foreground" />;
  };

  const status = getDensityStatus(crowd.density);
  const statusColors = {
    danger: 'bg-danger/10 text-danger border-danger/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
  };

  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 ease-smooth hover:-translate-y-1">
      {/* Header */}
      <div className="bg-surface-elevated border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{crowd.area}</h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status.color as keyof typeof statusColors]}`}>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                status.color === 'danger' ? 'bg-danger' : 
                status.color === 'warning' ? 'bg-warning' :
                status.color === 'primary' ? 'bg-primary' : 'bg-accent'
              }`} />
              {status.label}
            </div>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-video bg-muted">
        {crowd.imageUrl ? (
          <img
            src={crowd.imageUrl}
            alt={crowd.area}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Image size={48} className="mx-auto mb-2" />
              <p className="text-sm">No image available</p>
            </div>
          </div>
        )}

        {/* Overlays */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            crowd.density >= 90 ? 'bg-danger text-danger-foreground' :
            crowd.density >= 80 ? 'bg-warning text-warning-foreground' :
            crowd.density >= 60 ? 'bg-primary text-primary-foreground' :
            'bg-accent text-accent-foreground'
          }`}>
            {crowd.density}% Density
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-surface/90 text-foreground rounded-full text-xs font-medium flex items-center gap-1">
            {getTrendIcon(crowd.trend)}
            {crowd.trend}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-light transition-colors duration-200 text-sm font-medium">
            <Eye size={14} />
            View Details
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted-dark hover:text-foreground transition-colors duration-200 text-sm font-medium">
            <FileText size={14} />
            Report
          </button>
        </div>
      </div>
    </div>
  );
};