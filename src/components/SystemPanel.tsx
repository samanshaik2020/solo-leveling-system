import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/utils';

interface SystemPanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glow?: boolean;
}

export const SystemPanel: React.FC<SystemPanelProps> = ({ children, title, className, glow = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative bg-black/90 border border-white/10 p-6 overflow-hidden backdrop-blur-md",
        glow && "shadow-[0_0_30px_rgba(0,229,255,0.05)]",
        className
      )}
    >
      {title && (
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/80 flex items-center gap-2">
            {title}
          </h3>
          <div className="w-1.5 h-1.5 bg-system-primary/80 rotate-45" />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
