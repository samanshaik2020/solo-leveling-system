import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../store/useSystemStore';

import { GlitchText } from './GlitchText';

export const InitializationScreen: React.FC = () => {
  const [name, setName] = useState('');
  const initialize = useSystemStore((state) => state.initialize);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      initialize(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 bg-black z-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.02)_0%,transparent_70%)]" />
      <div className="scanline opacity-5" />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-lg bg-black/90 backdrop-blur-md border border-white/10 p-1 shadow-[0_0_50px_rgba(0,229,255,0.05)]"
      >
        <div className="border border-white/5 p-8 md:p-12 flex flex-col items-center text-center">
          {/* Header Tag */}
          <div className="mb-8 px-4 py-1 bg-system-primary text-black font-black tracking-[0.4em] text-[8px] uppercase">
            SYSTEM REGISTRATION
          </div>

          {/* Main Announcement */}
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase mb-4 glow-text">
            <GlitchText text="Player Identification" />
          </h1>
          
          <p className="text-[9px] text-white/60 uppercase tracking-[0.4em] mb-10 leading-relaxed max-w-xs">
            THE SYSTEM HAS DETECTED A NEW POTENTIAL PLAYER. PLEASE PROVIDE YOUR IDENTIFICATION.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-8">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="w-full bg-black/80 border-b border-system-primary/40 p-4 text-white text-center focus:outline-none focus:border-system-primary transition-all uppercase tracking-[0.4em] text-sm font-black"
                placeholder="ENTER NAME..."
              />
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute right-0 bottom-4 w-2 h-6 bg-system-primary"
              />
            </div>

            <button 
              type="submit"
              disabled={!name.trim()}
              className="group relative w-full py-5 bg-system-primary overflow-hidden transition-all active:scale-[0.98] active:brightness-125 disabled:opacity-20 disabled:grayscale"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40"></div>
              <span className="relative z-10 text-black font-black uppercase tracking-[0.4em] text-[10px]">INITIALIZE CONNECTION</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          <div className="mt-10 font-mono text-[8px] text-white/40 uppercase tracking-[0.3em] leading-loose">
            WARNING: ONCE INITIALIZED, THE SYSTEM CANNOT BE DEACTIVATED. <br/>
            ID: AUTH_INIT_001 // STATUS: WAITING_FOR_INPUT
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-system-primary"></div>
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-system-primary"></div>
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-system-primary"></div>
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-system-primary"></div>
      </motion.div>
    </div>
  );
};
