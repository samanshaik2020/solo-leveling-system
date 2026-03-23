import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { playSystemSound } from '../utils/soundUtils';

export interface Task {
  id: string;
  name: string;
  xp: number;
  completed: boolean;
  completedAt?: string;
}

export interface Stats {
  strength: number;
  agility: number;
  sense: number;
  vitality: number;
  intelligence: number;
}

export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'NATIONAL';

interface SystemState {
  playerName: string;
  level: number;
  xp: number;
  streak: number;
  lastCompletedDate: string | null;
  lastLoginDate: string | null;
  tasks: Task[];
  stats: Stats;
  rank: Rank;
  isInitialized: boolean;
  showLevelUp: boolean;
  showPunishment: boolean;
  
  // Actions
  initialize: (name: string) => void;
  addTask: (name: string, xp: number) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  gainXP: (amount: number) => void;
  checkStreak: () => void;
  resetDaily: () => void;
  closeLevelUp: () => void;
  closePunishment: () => void;
}

const getTasksForRank = (rank: Rank): Task[] => {
  const repsMap: Record<Rank, number> = {
    'E': 50,
    'D': 60,
    'C': 70,
    'B': 80,
    'A': 100,
    'S': 100,
    'NATIONAL': 100,
  };

  const kmMap: Record<Rank, number> = {
    'E': 5,
    'D': 6,
    'C': 7,
    'B': 8,
    'A': 10,
    'S': 10,
    'NATIONAL': 10,
  };

  const xpMap: Record<Rank, number> = {
    'E': 50,
    'D': 60,
    'C': 70,
    'B': 80,
    'A': 100,
    'S': 100,
    'NATIONAL': 100,
  };
  
  const reps = repsMap[rank];
  const km = kmMap[rank];
  const totalXP = xpMap[rank];
  const baseXP = Math.floor(totalXP / 4);
  const lastXP = totalXP - (baseXP * 3);

  return [
    { id: '1', name: `Push-ups (${reps} Reps)`, xp: baseXP, completed: false },
    { id: '2', name: `Sit-ups (${reps} Reps)`, xp: baseXP, completed: false },
    { id: '3', name: `Squats (${reps} Reps)`, xp: baseXP, completed: false },
    { id: '4', name: `Running (${km}km)`, xp: lastXP, completed: false },
  ];
};

const calculateRank = (level: number): Rank => {
  if (level >= 100) return 'NATIONAL';
  if (level >= 80) return 'S';
  if (level >= 60) return 'A';
  if (level >= 40) return 'B';
  if (level >= 20) return 'C';
  if (level >= 10) return 'D';
  return 'E';
};

export const useSystemStore = create<SystemState>()(
  persist(
    (set, get) => ({
      playerName: '',
      level: 1,
      xp: 0,
      streak: 0,
      lastCompletedDate: null,
      lastLoginDate: null,
      tasks: getTasksForRank('E'),
      stats: {
        strength: 10,
        agility: 10,
        sense: 10,
        vitality: 10,
        intelligence: 10,
      },
      rank: 'E',
      isInitialized: false,
      showLevelUp: false,
      showPunishment: false,

      initialize: (name) => {
        const state = get();
        set({ 
          playerName: name, 
          isInitialized: true,
          lastLoginDate: new Date().toDateString(),
          tasks: getTasksForRank(state.rank)
        });
      },

      addTask: (name, xp) => set((state) => ({
        tasks: [...state.tasks, { id: Math.random().toString(36).substr(2, 9), name, xp, completed: false }]
      })),

      toggleTask: (id) => {
        const state = get();
        const task = state.tasks.find(t => t.id === id);
        if (!task || task.completed) return;

        const newTasks = state.tasks.map(t => 
          t.id === id ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
        );

        set({ tasks: newTasks });
        state.gainXP(task.xp);
        
        const allCompleted = newTasks.every(t => t.completed);
        if (allCompleted) {
          state.checkStreak();
        } else {
          playSystemSound('click');
        }
      },

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      gainXP: (amount) => set((state) => {
        let newXP = state.xp + amount;
        let newLevel = state.level;
        let leveledUp = false;
        
        const xpToLevel = state.level * 100;

        if (newXP >= xpToLevel) {
          newXP -= xpToLevel;
          newLevel += 1;
          leveledUp = true;
        }

        const newRank = calculateRank(newLevel);
        
        // Auto-increment stats on level up
        const newStats = leveledUp ? {
          strength: state.stats.strength + 2,
          agility: state.stats.agility + 1,
          sense: state.stats.sense + 1,
          vitality: state.stats.vitality + 2,
          intelligence: state.stats.intelligence + 1,
        } : state.stats;

        return { 
          xp: newXP, 
          level: newLevel, 
          rank: newRank,
          stats: newStats,
          showLevelUp: leveledUp || state.showLevelUp 
        };
      }),

      checkStreak: () => {
        const state = get();
        const allCompleted = state.tasks.every(t => t.completed);
        const today = new Date().toDateString();

        if (allCompleted && state.lastCompletedDate !== today) {
          set({ streak: state.streak + 1, lastCompletedDate: today });
          // Play "Arise" sound when the entire daily quest is cleared
          playSystemSound('arise');
        }
      },

      resetDaily: () => {
        const state = get();
        const today = new Date().toDateString();
        const lastLogin = state.lastLoginDate;

        if (lastLogin === today) return;

        // Check if previous day's tasks were not all completed
        const yesterdayTasksIncomplete = state.tasks.some(t => !t.completed);
        
        set({
          tasks: getTasksForRank(state.rank),
          lastLoginDate: today,
          showPunishment: yesterdayTasksIncomplete,
          streak: yesterdayTasksIncomplete ? 0 : state.streak
        });
      },

      closeLevelUp: () => set({ showLevelUp: false }),
      closePunishment: () => set({ showPunishment: false }),
    }),
    {
      name: 'solo-leveling-system-v3',
    }
  )
);
