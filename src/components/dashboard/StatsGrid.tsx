import { Users, BarChart3, Clock, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';

interface StatsData {
  totalVisitors: number;
  currentVisitors: number;
  crowdDensity: number;
  avgWaitTime: string;
}

interface StatsGridProps {
  stats: StatsData;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Visitors Today"
        value={stats.totalVisitors}
        change={{ value: "12.5% from yesterday", type: "positive" }}
        icon={Users}
        variant="primary"
      />
      
      <StatCard
        title="Current Visitors"
        value={stats.currentVisitors}
        change={{ value: "3.2% in last hour", type: "positive" }}
        icon={TrendingUp}
        variant="accent"
      />
      
      <StatCard
        title="Crowd Density"
        value={`${stats.crowdDensity}%`}
        change={{ value: "5.7% increase", type: "negative" }}
        icon={BarChart3}
        variant={stats.crowdDensity > 80 ? "warning" : "default"}
      />
      
      <StatCard
        title="Avg. Wait Time"
        value={stats.avgWaitTime}
        change={{ value: "2.3% improvement", type: "positive" }}
        icon={Clock}
      />
    </div>
  );
};