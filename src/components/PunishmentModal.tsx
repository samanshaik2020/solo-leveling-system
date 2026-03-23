import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '../store/useSystemStore';

import { GlitchText } from './GlitchText';

export const PunishmentModal: React.FC = () => {
  const { showPunishment, closePunishment } = useSystemStore();

  return (
    <AnimatePresence>
      {showPunishment && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="relative w-full max-w-lg bg-black/90 backdrop-blur-md border border-red-500/20 p-1 shadow-[0_0_50px_rgba(239,68,68,0.05)]"
          >
            <div className="absolute inset-0 scanline pointer-events-none opacity-5 bg-red-500/5"></div>
            
            <div className="border border-red-500/10 p-8 flex flex-col items-center text-center relative z-10">
              <div className="mb-6 px-4 py-1 bg-red-600/80 text-white font-black tracking-[0.4em] text-[8px] uppercase animate-pulse">
                PENALTY PROTOCOL ACTIVATED
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-red-500 tracking-tighter uppercase mb-2 [text-shadow:0_0_15px_rgba(239,68,68,0.4)]">
                <GlitchText text="Quest Failed" />
              </h1>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-8"></div>

              <p className="text-[10px] text-white/80 uppercase tracking-[0.3em] mb-8 leading-relaxed font-black">
                YOU HAVE FAILED TO COMPLETE THE DAILY QUEST. <br/>
                <span className="text-red-500">PUNISHMENT: STREAK RESET TO ZERO.</span>
              </p>

              <div className="w-full bg-red-500/[0.02] border border-red-500/20 p-6 mb-10 text-left">
                <div className="text-[9px] text-red-500/80 uppercase tracking-[0.4em] mb-3 font-black">PUNISHMENT_LOG:</div>
                <p className="text-[10px] text-white/60 font-mono leading-relaxed tracking-widest font-black">
                  {'>'} SYSTEM DETECTED INCOMPLETE OBJECTIVES <br/>
                  {'>'} RESETTING PLAYER MOMENTUM... <br/>
                  {'>'} STREAK: 0 <br/>
                  {'>'} <GlitchText text="DO NOT FAIL AGAIN." className="text-red-500" />
                </p>
              </div>

              <button 
                onClick={closePunishment}
                className="group relative w-full py-4 bg-red-600/80 overflow-hidden transition-all active:scale-[0.98] active:brightness-125"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40"></div>
                <span className="relative z-10 text-white font-black uppercase tracking-[0.4em] text-[10px]">ACCEPT PENALTY</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <div className="mt-8 font-mono text-[8px] text-red-500/40 uppercase tracking-[0.4em] font-black">
                ID: ERR_PUNISHMENT_001 // STATUS: EXECUTED
              </div>
            </div>

            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-red-500/80"></div>
            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-red-500/80"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-red-500/80"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-red-500/80"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
