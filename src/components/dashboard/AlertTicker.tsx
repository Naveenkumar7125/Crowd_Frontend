import { AlertCircle, X } from 'lucide-react';

interface Alert {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface AlertTickerProps {
  alerts: Alert[];
  onDismiss: (id: number) => void;
}

export const AlertTicker = ({ alerts, onDismiss }: AlertTickerProps) => {
  if (!alerts || alerts.length === 0) return null;

  const primaryAlert = alerts[0];

  return (
    <div className="bg-gradient-to-r from-warning to-warning-light border-l-4 border-warning-light rounded-lg p-4 mb-6 shadow-medium animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle size={24} className="text-warning-foreground animate-pulse" />
          <div className="flex-1">
            <h4 className="font-semibold text-warning-foreground">
              {primaryAlert.title}
            </h4>
            <p className="text-sm text-warning-foreground/90 mt-1">
              {primaryAlert.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-surface/90 transition-colors duration-200 font-medium">
            View Details
          </button>
          <button 
            onClick={() => onDismiss(primaryAlert.id)}
            className="p-2 hover:bg-warning-light/20 rounded-lg transition-colors duration-200"
          >
            <X size={16} className="text-warning-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};