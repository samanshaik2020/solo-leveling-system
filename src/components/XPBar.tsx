import React from 'react';
import { motion } from 'framer-motion';
import { calculateXPPercentage } from '../utils/utils';

interface XPBarProps {
  xp: number;
  level: number;
}

export const XPBar: React.FC<XPBarProps> = ({ xp, level }) => {
  const xpToLevel = level * 100;
  const percentage = (xp / xpToLevel) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-[9px] text-system-primary/80 uppercase tracking-[0.4em] font-black">XP PROGRESSION</span>
          <div className="h-px w-8 bg-system-primary/80" />
        </div>
        <span className="text-[10px] font-black text-white/90 tracking-widest">{xp} <span className="text-white/40">/</span> {xpToLevel}</span>
      </div>
      <div className="h-1.5 w-full bg-black/90 border border-white/10 overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-system-primary relative z-10 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </motion.div>
        {/* Background segments */}
        <div className="absolute inset-0 flex justify-between pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-px h-full bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
};
