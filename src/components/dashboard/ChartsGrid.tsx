import { BarChart3, PieChart, Activity } from 'lucide-react';

export const ChartsGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Crowd Density Heatmap */}
      <div className="bg-surface rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Crowd Density Heatmap</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger" />
              <span className="text-sm text-muted-foreground">High</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto mb-3" />
            <p className="text-sm">Interactive Heatmap Visualization</p>
            <p className="text-xs mt-1">Real-time crowd density mapping</p>
          </div>
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-surface rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Resource Allocation</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Medical</span>
            </div>
          </div>
        </div>
        
        <div className="h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground mb-6">
          <div className="text-center">
            <PieChart size={48} className="mx-auto mb-3" />
            <p className="text-sm">Resource Distribution Chart</p>
          </div>
        </div>

        {/* Resource Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-elevated rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Security Personnel</div>
            <div className="text-sm font-semibold text-foreground">24/30 deployed</div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
          <div className="bg-surface-elevated rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Medical Staff</div>
            <div className="text-sm font-semibold text-foreground">12/15 deployed</div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div className="bg-accent h-1.5 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
          <div className="bg-surface-elevated rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Support Staff</div>
            <div className="text-sm font-semibold text-foreground">18/20 deployed</div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div className="bg-warning h-1.5 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>
          <div className="bg-surface-elevated rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Active Units</div>
            <div className="text-sm font-semibold text-foreground">92% operational</div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div className="bg-accent h-1.5 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="lg:col-span-2 bg-surface rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Activity Timeline</h3>
          <div className="text-sm text-muted-foreground">Last 24 hours</div>
        </div>
        
        <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Activity size={48} className="mx-auto mb-3" />
            <p className="text-sm">Real-time Activity Graph</p>
            <p className="text-xs mt-1">Visitor flow and incident tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};