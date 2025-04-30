
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  DollarSign, 
  Target, 
  BarChart3, 
  Settings,
  Menu
} from "lucide-react";
import { useFinance } from '@/context/FinanceContext';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const { balance } = useFinance();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  
  return (
    <div className="flex flex-col">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">CoinCompass</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </Button>
      </div>
      
      {/* Sidebar for desktop / Drawer for mobile */}
      <div className={`
        lg:block fixed lg:static top-0 left-0 z-30 h-full
        bg-white shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 border-r
      `}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">CoinCompass</h2>
          
          {/* Balance Card */}
          <div className="bg-gradient-to-r from-finance-secondary to-blue-700 rounded-lg p-4 text-white mb-6">
            <p className="text-sm opacity-80">Current Balance</p>
            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1">
            <NavItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              to="/"
              isActive={location.pathname === '/'}
            />
            <NavItem 
              icon={<DollarSign size={18} />} 
              label="Transactions" 
              to="/transactions"
              isActive={location.pathname === '/transactions'}
            />
            <NavItem 
              icon={<Target size={18} />} 
              label="Goals" 
              to="/goals"
              isActive={location.pathname === '/goals'}
            />
            <NavItem 
              icon={<BarChart3 size={18} />} 
              label="Reports" 
              to="/reports"
              isActive={location.pathname === '/reports'}
            />
            <NavItem 
              icon={<Settings size={18} />} 
              label="Settings" 
              to="/settings"
              isActive={location.pathname === '/settings'}
            />
          </nav>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 w-full p-3 rounded-md transition-colors ${
        isActive 
          ? 'bg-finance-secondary text-white' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default NavBar;
