import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Flame, Trophy, Calendar, Settings, Shield, Star, Zap, Crown, User, ListChecks } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { SystemPanel } from './SystemPanel';
import { XPBar } from './XPBar';
import { TaskItem } from './TaskItem';
import { GlowButton } from './GlowButton';
import { SystemMessageBox } from './SystemMessageBox';
import { LevelUpModal } from './LevelUpModal';
import { PunishmentModal } from './PunishmentModal';
import { QuestPopup } from './QuestPopup';
import { ProfileView } from './ProfileView';
import { SystemAlert } from './SystemAlert';
import { RankBadge } from './RankBadge';
import { GlitchText } from './GlitchText';

export const Dashboard: React.FC = () => {
  const { playerName, level, xp, streak, tasks, addTask, rank, resetDaily } = useSystemStore();
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskXP, setNewTaskXP] = useState(10);
  const [showAddTask, setShowAddTask] = useState(false);
  const [activeTab, setActiveTab] = useState<'quests' | 'profile'>('quests');
  const [showQuestPopup, setShowQuestPopup] = useState(false);

  useEffect(() => {
    resetDaily();
    // Show quest popup on login if not all completed
    const allCompleted = tasks.every(t => t.completed);
    if (!allCompleted) {
      setShowQuestPopup(true);
    }
  }, [resetDaily]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim()) {
      addTask(newTaskName.trim(), newTaskXP);
      setNewTaskName('');
      setShowAddTask(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-system-bg p-4 md:p-12 flex flex-col gap-10 max-w-6xl mx-auto relative">
      <LevelUpModal />
      <PunishmentModal />
      <QuestPopup 
        isOpen={showQuestPopup} 
        onClose={() => setShowQuestPopup(false)} 
        onViewStats={() => {
          setShowQuestPopup(false);
          setActiveTab('profile');
        }}
      />
      <SystemAlert />
      
      {/* HUD Corner Accents - Minimal */}
      <div className="fixed top-6 left-6 w-8 h-8 border-t border-l border-system-primary/10 pointer-events-none" />
      <div className="fixed top-6 right-6 w-8 h-8 border-t border-r border-system-primary/10 pointer-events-none" />
      <div className="fixed bottom-6 left-6 w-8 h-8 border-b border-l border-system-primary/10 pointer-events-none" />
      <div className="fixed bottom-6 right-6 w-8 h-8 border-b border-r border-system-primary/10 pointer-events-none" />

      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8 relative">
        <div className="flex items-center gap-6">
          <RankBadge rank={rank} size="lg" />
          
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-black tracking-[0.3em] uppercase text-white glow-text">
                <GlitchText text={playerName} />
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[8px] text-white/60 uppercase tracking-[0.4em] font-black">STATUS: <span className="text-system-primary">ACTIVE</span></span>
              <div className="w-1.5 h-1.5 bg-system-primary/80 rotate-45 animate-pulse" />
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => setActiveTab('quests')}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] transition-all ${activeTab === 'quests' ? 'text-system-primary glow-text' : 'text-white/40 hover:text-white/80'}`}
          >
            <ListChecks size={14} />
            Quests
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] transition-all ${activeTab === 'profile' ? 'text-system-primary glow-text' : 'text-white/40 hover:text-white/80'}`}
          >
            <User size={14} />
            Profile
          </button>
          <button 
            onClick={() => setShowQuestPopup(true)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-system-secondary hover:text-system-primary transition-all"
          >
            <Calendar size={14} />
            Daily Quest
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'quests' ? (
            <motion.div
              key="quests"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-10"
            >
              {/* Left Column: Stats & Messages */}
              <div className="md:col-span-4 space-y-8">
                <SystemPanel title="PLAYER PARAMETERS">
                  <div className="space-y-6">
                    <div className="text-center py-6 border border-white/10 bg-white/[0.02]">
                      <div className="text-[9px] text-white/80 uppercase tracking-[0.4em] mb-2 font-black">LEVEL</div>
                      <div className="text-5xl font-black text-system-primary tracking-tighter glow-text">
                        <GlitchText text={level.toString()} />
                      </div>
                    </div>
                    <XPBar xp={xp} level={level} />
                    <GlowButton 
                      onClick={() => setActiveTab('profile')}
                      className="w-full text-[9px] py-4 border border-white/10"
                    >
                      VIEW FULL PROFILE
                    </GlowButton>
                  </div>
                </SystemPanel>

                <SystemPanel title="SYSTEM NOTIFICATION" className="bg-system-primary/[0.02]">
                  <SystemMessageBox />
                </SystemPanel>
              </div>

              {/* Right Column: Quests */}
              <div className="md:col-span-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-lg font-black tracking-[0.5em] uppercase text-white/90">
                      DAILY OBJECTIVES
                    </h2>
                    <div className="h-px w-12 bg-system-primary/80" />
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-system-primary tracking-tighter">
                      {completedCount}<span className="text-white/40 mx-1">/</span>{totalCount}
                    </div>
                    <div className="text-[8px] text-white/80 uppercase tracking-[0.4em] font-black">COMPLETED</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {tasks.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </AnimatePresence>

                  {tasks.length === 0 && (
                    <div className="text-center py-20 border border-white/10 bg-white/[0.01] text-white/60 uppercase tracking-[0.5em] text-[9px] font-black">
                      NO ACTIVE QUESTS DETECTED
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {showAddTask ? (
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onSubmit={handleAddTask}
                      className="bg-black/90 backdrop-blur-md border border-white/10 p-6 space-y-6"
                    >
                      <div className="space-y-3">
                        <label className="text-[9px] text-system-primary/80 uppercase tracking-[0.4em] font-black">QUEST NAME</label>
                        <input
                          type="text"
                          value={newTaskName}
                          onChange={(e) => setNewTaskName(e.target.value)}
                          autoFocus
                          className="w-full bg-black/90 border-b border-white/10 p-3 text-[10px] text-white/90 focus:outline-none focus:border-system-primary transition-colors font-black uppercase tracking-[0.2em]"
                          placeholder="ENTER OBJECTIVE..."
                        />
                      </div>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-3">
                          <label className="text-[9px] text-system-primary/80 uppercase tracking-[0.4em] font-black">XP REWARD</label>
                          <input
                            type="number"
                            value={newTaskXP}
                            onChange={(e) => setNewTaskXP(parseInt(e.target.value) || 0)}
                            className="w-full bg-black/90 border-b border-white/10 p-3 text-[10px] text-white/90 focus:outline-none focus:border-system-primary transition-colors font-black"
                          />
                        </div>
                        <div className="flex items-end gap-3">
                          <GlowButton type="submit" className="flex-1 md:flex-none">ADD</GlowButton>
                          <GlowButton type="button" variant="danger" onClick={() => setShowAddTask(false)} className="flex-1 md:flex-none">CANCEL</GlowButton>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <GlowButton 
                      onClick={() => setShowAddTask(true)}
                      className="w-full py-5 border-dashed border-white/20 text-white/80 hover:text-system-primary hover:border-system-primary/80"
                    >
                      + INITIALIZE NEW QUEST
                    </GlowButton>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
            >
              <ProfileView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer System Alert */}
      <footer className="mt-auto pt-12 border-t border-white/10">
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex items-center justify-center gap-3 text-[8px] text-system-primary/60 tracking-[0.5em] uppercase font-black"
        >
          <div className="w-1 h-1 bg-system-primary/60 rotate-45" />
          SYSTEM STATUS: MONITORING PLAYER GROWTH
        </motion.div>
      </footer>
    </div>
  );
};
