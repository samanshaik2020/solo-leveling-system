import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '../store/useSystemStore';

import { GlitchText } from './GlitchText';

export const LevelUpModal: React.FC = () => {
  const { level, showLevelUp, closeLevelUp, stats } = useSystemStore();

  return (
    <AnimatePresence>
      {showLevelUp && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          {/* LEVEL UP POPUP CONTAINER */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="relative w-full max-w-lg bg-black/90 backdrop-blur-md border border-white/10 p-1 shadow-[0_0_50px_rgba(0,229,255,0.05)]"
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 scanline pointer-events-none opacity-5"></div>
            
            {/* Inner Content Border */}
            <div className="border border-white/5 p-8 flex flex-col items-center text-center relative z-10">
              {/* Header Tag */}
              <div className="mb-6 px-4 py-1 bg-system-primary text-black font-black tracking-[0.4em] text-[8px] uppercase">
                SYSTEM MESSAGE
              </div>

              {/* Main Announcement */}
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 glow-text">
                <GlitchText text="You Have Leveled Up" />
              </h1>

              {/* Visual Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-system-primary/40 to-transparent my-8"></div>

              {/* Level Stats */}
              <div className="flex items-center gap-8 mb-10">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-white/40 uppercase tracking-[0.4em] mb-2 font-black">CURRENT_LVL</span>
                  <span className="text-4xl font-black text-white/40">{level - 1}</span>
                </div>
                <div className="w-8 h-px bg-system-primary/60 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-system-primary/60 rotate-45" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-system-primary/80 uppercase tracking-[0.4em] mb-2 font-black">NEW_LVL</span>
                  <span className="text-6xl font-black text-system-primary glow-text">{level}</span>
                </div>
              </div>

              {/* Rewards / Data Rows */}
              <div className="w-full space-y-2 mb-10">
                <div className="flex justify-between items-center border-l border-system-primary/60 bg-white/[0.02] px-4 py-3">
                  <span className="text-[10px] text-white/80 uppercase tracking-[0.3em] font-black">STRENGTH_STAT</span>
                  <span className="text-xs font-black text-system-primary">+{stats.strength}</span>
                </div>
                <div className="flex justify-between items-center border-l border-system-primary/60 bg-white/[0.02] px-4 py-3">
                  <span className="text-[10px] text-white/80 uppercase tracking-[0.3em] font-black">AGILITY_STAT</span>
                  <span className="text-xs font-black text-system-primary">+{stats.agility}</span>
                </div>
                <div className="flex justify-between items-center border-l border-system-primary/60 bg-white/[0.02] px-4 py-3">
                  <span className="text-[10px] text-white/80 uppercase tracking-[0.3em] font-black">VITALITY_STAT</span>
                  <span className="text-xs font-black text-system-primary">+{stats.vitality}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={closeLevelUp}
                className="group relative w-full py-4 bg-system-primary overflow-hidden transition-all active:scale-[0.98] active:brightness-125"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40"></div>
                <span className="relative z-10 text-black font-black uppercase tracking-[0.4em] text-[10px]">CONTINUE</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* Footer System Code */}
              <div className="mt-8 font-mono text-[8px] text-white/40 uppercase tracking-[0.4em] font-black">
                ID: AUTH_772_LEVELUP_SUCCESS // TIMESTAMP: {new Date().toLocaleTimeString()}
              </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-system-primary/80"></div>
            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-system-primary/80"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-system-primary/80"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-system-primary/80"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
