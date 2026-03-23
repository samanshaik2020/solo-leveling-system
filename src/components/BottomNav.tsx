import React from 'react';
import { Home, BarChart2, PlusCircle, Bell, User } from 'lucide-react';
import { cn } from '../utils/utils';

export const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="bg-black/60 border border-white/10 backdrop-blur-xl p-3 flex items-center justify-around system-panel-glow">
        <NavItem icon={<Home size={20} />} active />
        <NavItem icon={<BarChart2 size={20} />} />
        <NavItem icon={<PlusCircle size={24} className="text-system-primary" />} />
        <NavItem icon={<Bell size={20} />} />
        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
          <img src="https://picsum.photos/seed/hunter/100/100" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; active?: boolean; className?: string }> = ({ icon, active, className }) => (
  <button className={cn(
    "p-2 transition-all duration-300",
    active ? "text-system-primary bg-system-primary/10" : "text-white/40 hover:text-white/70",
    className
  )}>
    {icon}
  </button>
);
