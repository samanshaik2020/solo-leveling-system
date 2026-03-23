import React from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../store/useSystemStore';
import { RankBadge } from './RankBadge';
import { GlitchText } from './GlitchText';
import { Shield, Flame, Trophy, Zap, Activity, Brain, Heart, Target } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { playerName, level, xp, streak, rank, stats } = useSystemStore();
  const xpToLevel = level * 100;
  const xpPercentage = (xp / xpToLevel) * 100;

  const statItems = [
    { label: 'STRENGTH', val: stats.strength, icon: <Activity size={14} />, color: 'text-red-500' },
    { label: 'AGILITY', val: stats.agility, icon: <Zap size={14} />, color: 'text-yellow-500' },
    { label: 'SENSE', val: stats.sense, icon: <Target size={14} />, color: 'text-green-500' },
    { label: 'VITALITY', val: stats.vitality, icon: <Heart size={14} />, color: 'text-blue-500' },
    { label: 'INTELLIGENCE', val: stats.intelligence, icon: <Brain size={14} />, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="relative bg-black/90 backdrop-blur-md border border-white/10 p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.05)]">
        <div className="absolute inset-0 scanline opacity-5 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start">
          {/* Rank Emblem */}
          <div className="relative">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-system-primary/20 rounded-full scale-125"
            />
            <RankBadge rank={rank} size="lg" className="w-32 h-32 flex items-center justify-center text-5xl" />
          </div>

          {/* Player Info */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase glow-text">
                <GlitchText text={playerName} />
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[9px] font-black tracking-[0.4em] uppercase text-white/80">
                <span className="flex items-center gap-2">
                  <Shield size={10} className="text-system-primary" />
                  STATUS: <span className="text-system-primary">AWAKENED</span>
                </span>
                <span className="flex items-center gap-2">
                  <Flame size={10} className={streak > 0 ? "text-orange-500" : "text-white/40"} />
                  STREAK: <span className={streak > 0 ? "text-white" : ""}>{streak} DAYS</span>
                </span>
                <span className="flex items-center gap-2">
                  <Trophy size={10} className="text-yellow-500" />
                  LEVEL: <span className="text-white">{level}</span>
                </span>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[9px] text-system-primary/80 uppercase tracking-[0.4em] font-black">XP PROGRESSION</span>
                <span className="text-[10px] font-black text-white/90 tracking-widest">{xp} <span className="text-white/40">/</span> {xpToLevel}</span>
              </div>
              <div className="h-1.5 w-full bg-black/90 border border-white/10 overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  className="h-full bg-system-primary relative z-10 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </motion.div>
                <div className="absolute inset-0 flex justify-between pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-px h-full bg-white/10" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parameters Section */}
        <div className="bg-black/90 backdrop-blur-md border border-white/10 p-8 space-y-8 shadow-[0_0_30px_rgba(0,229,255,0.02)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-system-primary tracking-[0.4em] uppercase">Parameters</h2>
            <div className="text-[8px] text-white/80 uppercase tracking-[0.4em] font-black">AVAILABLE POINTS: 0</div>
          </div>
          
          <div className="space-y-6">
            {statItems.map((stat) => (
              <div key={stat.label} className="space-y-2 group">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className={`${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                      {stat.icon}
                    </span>
                    <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                      {stat.label}
                    </span>
                  </div>
                  <span className="text-lg font-black text-system-primary group-hover:glow-text transition-all">
                    {stat.val}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (stat.val / 200) * 100)}%` }}
                    className={`h-full ${stat.color.replace('text-', 'bg-')} opacity-40 group-hover:opacity-60 transition-opacity`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Info Section */}
        <div className="bg-black/90 backdrop-blur-md border border-white/10 p-8 space-y-8 shadow-[0_0_30px_rgba(0,229,255,0.02)]">
          <h2 className="text-lg font-black text-system-primary tracking-[0.4em] uppercase">System Log</h2>
          
          <div className="space-y-4 font-mono text-[9px] text-white/80 leading-relaxed tracking-widest font-black">
            <p className="border-l border-system-primary/60 pl-4 py-1">
              [SYSTEM] PLAYER <GlitchText text={playerName.toUpperCase()} className="text-system-primary" /> HAS BEEN REGISTERED.
            </p>
            <p className="border-l border-system-primary/60 pl-4 py-1">
              [SYSTEM] CURRENT RANK: <span className="text-system-primary">{rank}</span>
            </p>
            <p className="border-l border-system-primary/60 pl-4 py-1">
              [SYSTEM] STREAK STATUS: {streak > 0 ? <span className="text-system-primary">MAINTAINED</span> : 'INACTIVE'}
            </p>
            <p className="border-l border-system-primary/60 pl-4 py-1">
              [SYSTEM] DAILY QUESTS RESET AT 00:00 LOCAL TIME.
            </p>
            <p className="border-l border-red-500/80 pl-4 py-1 text-red-500">
              [WARNING] FAILURE TO COMPLETE DAILY QUESTS WILL RESULT IN PENALTIES.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 flex justify-between items-center opacity-80">
            <div className="text-[8px] uppercase tracking-[0.4em] font-black">ID: PLAYER_PROFILE_{playerName.toUpperCase()}</div>
            <div className="text-[8px] uppercase tracking-[0.4em] font-black">VER: 2.4.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
