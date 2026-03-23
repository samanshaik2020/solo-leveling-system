import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Zap, ShieldAlert } from 'lucide-react';
import { playSystemSound } from '../utils/soundUtils';

import { GlitchText } from './GlitchText';

const MOTIVATIONAL_LINES = [
  "STRENGTH IS THE ONLY TRUTH.",
  "THE SYSTEM REWARDS THE PERSISTENT.",
  "LIMITS ARE MEANT TO BE BROKEN.",
  "EVERY STEP FORWARD IS AN EVOLUTION.",
  "THE WEAK ARE CONSUMED. BECOME STRONG.",
  "YOUR POTENTIAL IS LIMITLESS.",
  "THE GATE TO GREATNESS IS OPEN.",
];

export const SystemAlert: React.FC = () => {
  const [alert, setAlert] = useState<{ id: number; message: string; type: 'warning' | 'info' | 'motivational' } | null>(null);

  useEffect(() => {
    const triggerAlert = () => {
      const isMotivational = Math.random() > 0.5;
      const message = isMotivational 
        ? MOTIVATIONAL_LINES[Math.floor(Math.random() * MOTIVATIONAL_LINES.length)]
        : "Daily quests must be completed. Failure is not an option.";
      
      setAlert({
        id: Date.now(),
        message,
        type: isMotivational ? 'motivational' : 'warning'
      });
      
      playSystemSound('alert');

      setTimeout(() => {
        setAlert(null);
      }, 6000);
    };

    const initialTimeout = setTimeout(triggerAlert, 15000);
    const interval = setInterval(triggerAlert, 180000 + Math.random() * 180000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ x: 350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 350, opacity: 0 }}
          className="fixed top-12 right-6 z-[110] w-80"
        >
          <div className="relative bg-black/90 backdrop-blur-md border border-white/10 p-5 shadow-[0_0_30px_rgba(0,229,255,0.05)] overflow-hidden">
            {/* Minimal Corner Accents */}
            <div className="absolute top-[1px] left-[1px] w-2 h-2 border-t border-l border-system-primary/80" />
            <div className="absolute bottom-[1px] right-[1px] w-2 h-2 border-b border-r border-system-primary/80" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="mt-1 p-1.5 bg-white/[0.02] border border-white/10">
                {alert.type === 'warning' ? (
                  <ShieldAlert size={12} className="text-red-500" />
                ) : (
                  <Zap size={12} className="text-system-primary" />
                )}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-[8px] font-black uppercase tracking-[0.4em] text-white/60">
                  System Notification
                </h4>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed text-white/90">
                  <GlitchText text={alert.message} />
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-white/5 w-full">
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-system-primary/80"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
