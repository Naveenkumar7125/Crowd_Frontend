import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AlertTicker } from './AlertTicker';
import { StatsGrid } from './StatsGrid';
import { CameraGrid } from './CameraGrid';
import { QueueManagement } from './QueueManagement';
import { CrowdManagement } from './CrowdManagement';
import { ChartsGrid } from './ChartsGrid';

// Mock data and types
interface CameraData {
  id: number;
  name: string;
  lane: string;
  status: 'Active' | 'Inactive';
  alerts: number;
  capacity: number;
  imageUrl?: string;
  timestamp?: string;
}

interface QueueData {
  id: number;
  name: string;
  people: number;
  waitTime: string;
  threshold: number;
  status: 'normal' | 'critical';
}

interface CrowdData {
  id: number;
  area: string;
  density: number;
  trend: string;
  imageUrl?: string;
}

interface Alert {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface StatsData {
  totalVisitors: number;
  currentVisitors: number;
  crowdDensity: number;
  avgWaitTime: string;
}

export const PilgrimageDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingCrowdData, setLoadingCrowdData] = useState(false);

  // Mock data
  const [cameras, setCameras] = useState<CameraData[]>([
    { id: 1, name: 'Main Entrance', lane: 'Entry Lane 1', status: 'Active', alerts: 0, capacity: 45, imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359521/Crowd_Detection/nz62gpkdiusiibxlbmgy.jpg' },
    { id: 2, name: 'West Gate', lane: 'Entry Lane 2', status: 'Active', alerts: 2, capacity: 78, imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359507/Crowd_Detection/dbsweorkqtdqhvolfymr.jpg' },
    { id: 3, name: 'East Exit', lane: 'Exit Lane 1', status: 'Active', alerts: 1, capacity: 32, imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359482/Crowd_Detection/hx298u9dwwotv14whm73.jpg' },
    { id: 4, name: 'Shrine Area', lane: 'Worship Zone', status: 'Active', alerts: 0, capacity: 62, imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359458/Crowd_Detection/wofmk9kfhhonryxnfloe.jpg' },
    { id: 5, name: 'Food Court', lane: 'Amenities Zone', status: 'Active', alerts: 3, capacity: 85, imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758350704/Crowd_Detection/ao4wcp3zbf6fwnnaitbf.jpg' },
    { id: 6, name: 'Parking Lot', lane: 'Vehicle Zone', status: 'Active', alerts: 0, capacity: 28, imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758350696/Crowd_Detection/aty3isedetlj2efgrez3.jpg' },
    { id: 7, name: 'Security Check', lane: 'Security Lane', status: 'Active', alerts: 1, capacity: 90, imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758350642/Crowd_Detection/t7hfjjzbepgqguxaxqvc.jpg' },
    { id: 8, name: 'Medical Tent', lane: 'Emergency Lane', status: 'Active', alerts: 0, capacity: 15, imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758349880/Crowd_Detection/gqegnrsm5d9r3xfzqj14.jpg' },
  ]);

  const [queues, setQueues] = useState<QueueData[]>([
    { id: 1, name: 'Security Check A', people: 42, waitTime: '18m', threshold: 35, status: 'critical' },
    { id: 2, name: 'Entry Gate B', people: 28, waitTime: '12m', threshold: 40, status: 'normal' },
    { id: 3, name: 'Food Court', people: 65, waitTime: '22m', threshold: 50, status: 'critical' },
    { id: 4, name: 'Shrine Access', people: 38, waitTime: '15m', threshold: 45, status: 'normal' }
  ]);

  const [crowdData, setCrowdData] = useState<CrowdData[]>([
    { id: 1, area: 'Main Plaza', density: 85, trend: 'increasing', imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359179/Stampede/dximkukfoae2z98minve.jpg' },
    { id: 2, area: 'Food Court', density: 92, trend: 'high', imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359207/Stampede/swh7kga2taxagz3y0nc6.jpg' },
    { id: 3, area: 'Prayer Hall', density: 45, trend: 'stable', imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359302/Stampede/xae0ngkq7dukp9aujcbg.jpg' },
    { id: 4, area: 'Entrance Gate', density: 78, trend: 'increasing', imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359637/Stampede/nsh7pnyd5gjbwsfdqwa1.jpg' },
    { id: 5, area: 'West Wing', density: 65, trend: 'decreasing', imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359693/Stampede/vuvjpbk2r662dv76u93p.jpg' },
    { id: 6, area: 'East Wing', density: 88, trend: 'high', imageUrl: 'https://res.cloudinary.com/dprwjya79/image/upload/v1758359841/Stampede/boyie8eksvfpjdj02dqp.jpg' },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, title: 'Overcrowding Alert', description: 'Food Court area exceeds capacity by 35%', priority: 'high' },
    { id: 2, title: 'Queue Congestion', description: 'Security Check A wait time exceeds 20 minutes', priority: 'high' }
  ]);

  const [stats, setStats] = useState<StatsData>({
    totalVisitors: 12542,
    currentVisitors: 2846,
    crowdDensity: 72,
    avgWaitTime: '15m'
  });

  // Handle refresh functions
  const handleRefreshCameras = () => {
    setLoadingImages(true);
    setTimeout(() => {
      // Simulate API call
      setCameras(prev => prev.map(cam => ({
        ...cam,
        capacity: Math.min(100, Math.max(0, cam.capacity + (Math.random() > 0.5 ? 5 : -5))),
        timestamp: new Date().toISOString()
      })));
      setLoadingImages(false);
    }, 1500);
  };

  const handleRefreshCrowd = () => {
    setLoadingCrowdData(true);
    setTimeout(() => {
      // Simulate API call
      setCrowdData(prev => prev.map(crowd => ({
        ...crowd,
        density: Math.min(100, Math.max(0, crowd.density + (Math.random() > 0.5 ? 5 : -5)))
      })));
      setLoadingCrowdData(false);
    }, 1500);
  };

  // Handle queue adjustments
  const handleAdjustQueue = (id: number, action: 'increase' | 'decrease' | 'reset') => {
    setQueues(prev => prev.map(queue => {
      if (queue.id === id) {
        switch (action) {
          case 'increase':
            return { ...queue, people: Math.min(100, queue.people + 5) };
          case 'decrease':
            return { ...queue, people: Math.max(0, queue.people - 5) };
          case 'reset':
            return { ...queue, people: 10, waitTime: '5m', status: 'normal' as const };
          default:
            return queue;
        }
      }
      return queue;
    }));
  };

  // Handle alert dismissal
  const handleDismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update camera capacities
      setCameras(prev => prev.map(cam => ({
        ...cam,
        capacity: Math.min(100, Math.max(0, cam.capacity + (Math.random() > 0.5 ? 2 : -2)))
      })));

      // Update queue data
      setQueues(prev => prev.map(queue => ({
        ...queue,
        people: Math.max(0, queue.people + (Math.random() > 0.5 ? 1 : -1)),
        waitTime: `${Math.max(1, Math.min(30, parseInt(queue.waitTime) + (Math.random() > 0.5 ? 1 : -1)))}m`,
        status: queue.people > queue.threshold ? 'critical' as const : 'normal' as const
      })));

      // Update stats
      setStats(prev => ({
        ...prev,
        crowdDensity: Math.floor(Math.random() * 20 + 60),
        currentVisitors: prev.currentVisitors + (Math.random() > 0.5 ? 5 : -3),
        avgWaitTime: `${Math.floor(Math.random() * 10 + 10)}m`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'cameras':
        return (
          <CameraGrid
            cameras={cameras}
            isLoading={loadingImages}
            onRefresh={handleRefreshCameras}
          />
        );
      
      case 'crowd':
        return (
          <CrowdManagement
            crowdData={crowdData}
            isLoading={loadingCrowdData}
            onRefresh={handleRefreshCrowd}
          />
        );

      case 'analytics':
        return <ChartsGrid />;

      case 'emergency':
        return (
          <div className="bg-surface rounded-xl shadow-soft p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Emergency Response Center</h2>
            <p className="text-muted-foreground">Emergency protocols and response management</p>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-surface rounded-xl shadow-soft p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">System Settings</h2>
            <p className="text-muted-foreground">Configure dashboard preferences and system parameters</p>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <StatsGrid stats={stats} />
            <QueueManagement 
              queues={queues} 
              onAdjustQueue={handleAdjustQueue} 
            />
            <ChartsGrid />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-smooth ${
        sidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          {/* Alert Ticker */}
          <AlertTicker alerts={alerts} onDismiss={handleDismissAlert} />
          
          {/* Content */}
          {renderContent()}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-secondary/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};