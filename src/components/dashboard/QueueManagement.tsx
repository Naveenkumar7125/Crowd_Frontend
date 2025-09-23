import { Plus, Settings } from 'lucide-react';
import { QueueCard } from './QueueCard';

interface QueueData {
  id: number;
  name: string;
  people: number;
  waitTime: string;
  threshold: number;
  status: 'normal' | 'critical';
}

interface QueueManagementProps {
  queues: QueueData[];
  onAdjustQueue: (id: number, action: 'increase' | 'decrease' | 'reset') => void;
}

export const QueueManagement = ({ queues, onAdjustQueue }: QueueManagementProps) => {
  return (
    <div className="bg-surface rounded-xl shadow-soft p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Queue Management</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-light transition-colors duration-200">
            <Plus size={16} />
            Add Queue
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted-dark hover:text-foreground transition-colors duration-200">
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {queues.map((queue) => (
          <QueueCard
            key={queue.id}
            queue={queue}
            onAdjust={onAdjustQueue}
          />
        ))}
      </div>
    </div>
  );
};