import { Plus, Minus, RefreshCw } from 'lucide-react';

interface QueueData {
  id: number;
  name: string;
  people: number;
  waitTime: string;
  threshold: number;
  status: 'normal' | 'critical';
}

interface QueueCardProps {
  queue: QueueData;
  onAdjust: (id: number, action: 'increase' | 'decrease' | 'reset') => void;
}

export const QueueCard = ({ queue, onAdjust }: QueueCardProps) => {
  const progressPercentage = Math.min((queue.people / queue.threshold) * 100, 100);
  const isCritical = queue.people > queue.threshold;

  return (
    <div className={`bg-surface rounded-xl p-5 shadow-soft border-l-4 ${
      isCritical ? 'border-danger' : 'border-accent'
    } hover:shadow-medium transition-all duration-300`}>
      {/* Queue Name */}
      <h3 className="font-semibold text-foreground mb-4">{queue.name}</h3>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{queue.people}</div>
          <div className="text-xs text-muted-foreground">People</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{queue.waitTime}</div>
          <div className="text-xs text-muted-foreground">Wait Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{queue.threshold}</div>
          <div className="text-xs text-muted-foreground">Threshold</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${
            isCritical ? 'bg-danger' : 'bg-accent'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Status Badge */}
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-4 ${
        isCritical 
          ? 'bg-danger/10 text-danger border border-danger/20' 
          : 'bg-accent/10 text-accent border border-accent/20'
      }`}>
        {isCritical ? 'Critical' : 'Normal'}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onAdjust(queue.id, 'decrease')}
          className="p-2 rounded-lg bg-muted hover:bg-muted-dark text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Minus size={16} />
        </button>
        
        <button
          onClick={() => onAdjust(queue.id, 'reset')}
          className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-light transition-colors duration-200"
        >
          <RefreshCw size={16} />
        </button>
        
        <button
          onClick={() => onAdjust(queue.id, 'increase')}
          className="p-2 rounded-lg bg-muted hover:bg-muted-dark text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};