import { 
  Home, 
  Video, 
  BarChart2, 
  Users, 
  AlertCircle, 
  Settings, 
  LogOut,
  Menu
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggle: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'cameras', label: 'Camera Feeds', icon: Video },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'crowd', label: 'Crowd Analysis', icon: Users },
  { id: 'emergency', label: 'Emergency', icon: AlertCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ isOpen, activeTab, onTabChange, onToggle }: SidebarProps) => {
  return (
    <div className={`fixed left-0 top-0 h-full z-50 transition-transform duration-300 ease-smooth ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="w-64 h-full bg-gradient-surface border-r border-border shadow-large">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 p-3 bg-gradient-primary rounded-xl shadow-glow">
            <div className="text-2xl">⛪</div>
            <h1 className="text-lg font-bold text-primary-foreground">Sacred Control</h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-smooth ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            
            {/* Logout */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-danger hover:text-danger-foreground transition-all duration-200 ease-smooth mt-8">
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};