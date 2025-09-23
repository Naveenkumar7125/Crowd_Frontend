import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="bg-surface border-b border-border shadow-soft">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 ease-smooth"
          >
            <Menu size={20} className="text-muted-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">
            Pilgrimage Management Dashboard
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-200 ease-smooth">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-danger-foreground text-xs rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* User Profile */}
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary ring-opacity-20">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};