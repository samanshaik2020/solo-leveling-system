import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '../store/useSystemStore';
import { TaskItem } from './TaskItem';

import { GlitchText } from './GlitchText';

interface QuestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onViewStats: () => void;
}

export const QuestPopup: React.FC<QuestPopupProps> = ({ isOpen, onClose, onViewStats }) => {
  const { tasks, playerName } = useSystemStore();
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="relative w-full max-w-2xl bg-black/90 backdrop-blur-md border border-white/10 p-1 shadow-[0_0_50px_rgba(0,229,255,0.05)]"
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 scanline pointer-events-none opacity-5"></div>
            
            {/* Inner Content Border */}
            <div className="border border-white/5 p-6 md:p-10 flex flex-col relative z-10">
              {/* Header Tag */}
              <div className="mb-8 self-start px-4 py-1 bg-system-primary text-black font-black tracking-[0.4em] text-[8px] uppercase">
                DAILY QUEST: PREPARATIONS TO BECOME STRONG
              </div>

              {/* Main Title */}
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase glow-text">
                    <GlitchText text="Daily Quest" />
                  </h1>
                  <p className="text-[9px] text-white/60 uppercase tracking-[0.4em] mt-2 font-black">
                    PLAYER: <span className="text-system-primary">{playerName}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-system-primary tracking-tighter">
                    {completedCount}<span className="text-white/20 mx-1">/</span>{totalCount}
                  </div>
                  <div className="text-[8px] text-white/60 uppercase tracking-[0.4em] font-black">GOAL_REACHED</div>
                </div>
              </div>

              {/* Visual Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-system-primary/40 to-transparent mb-8"></div>

              {/* Quest List */}
              <div className="space-y-4 mb-10 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>

              {/* Instruction */}
              <div className="mb-8 text-center">
                <p className="text-[8px] text-white/60 uppercase tracking-[0.4em] font-black">
                  CLICK ON THE OBJECTIVE TO MARK AS COMPLETED
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={onViewStats}
                  className="group relative py-4 bg-white/[0.02] border border-white/10 overflow-hidden transition-all active:scale-[0.98] hover:bg-white/[0.05] hover:border-system-primary/60"
                >
                  <span className="relative z-10 text-white/80 group-hover:text-system-primary font-black uppercase tracking-[0.4em] text-[10px] transition-colors">VIEW PLAYER STATS</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                
                <button 
                  onClick={onClose}
                  className="group relative py-4 bg-system-primary overflow-hidden transition-all active:scale-[0.98] active:brightness-125"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40"></div>
                  <span className="relative z-10 text-black font-black uppercase tracking-[0.4em] text-[10px]">CONFIRM</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              {/* Footer System Code */}
              <div className="mt-8 font-mono text-[8px] text-white/40 uppercase tracking-[0.4em] text-center font-black">
                ID: QUEST_DAILY_001 // STATUS: {completedCount === totalCount ? 'COMPLETED' : 'IN_PROGRESS'}
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
