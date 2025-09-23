import { Image, AlertTriangle, Wifi } from 'lucide-react';

export const CameraCard = ({ camera }) => {
  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-accent' : 'bg-danger';
  };

  const getCapacityColor = (capacity) => {
    if (capacity >= 90) return 'text-danger bg-danger/10';
    if (capacity >= 70) return 'text-warning bg-warning/10';
    return 'text-accent bg-accent/10';
  };

  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 ease-smooth hover:-translate-y-1">
      {/* Header */}
      <div className="bg-surface-elevated border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{camera.name}</h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(camera.status)}`} />
            <span className="text-sm text-muted-foreground">{camera.status}</span>
          </div>
        </div>
      </div>

      {/* Camera Feed */}
      <div className="relative aspect-video bg-muted">
        {camera.imageUrl ? (
          <img
            src={camera.imageUrl}
            alt={camera.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Image size={48} className="mx-auto mb-2" />
              <p className="text-sm">No feed available</p>
            </div>
          </div>
        )}

        {/* Overlays */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCapacityColor(camera.capacity)}`}>
            {camera.capacity}% Capacity
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-secondary/90 text-secondary-foreground rounded-full text-xs font-medium">
            <Wifi size={12} className="inline-block mr-1" />
            Live
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-surface/90 text-foreground rounded-full text-xs font-medium">
            {camera.lane}
          </span>
        </div>

        {camera.alerts > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 bg-danger text-danger-foreground rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
              <AlertTriangle size={12} />
              {camera.alerts} Alert{camera.alerts > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {camera.timestamp && (
          <div className="absolute bottom-1 right-1">
            <span className="px-1 py-0.5 bg-secondary/80 text-secondary-foreground rounded text-xs">
              {new Date(camera.timestamp).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};