import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateXPPercentage(xp: number, level: number) {
  const xpToLevel = level * 100;
  return Math.min(100, (xp / xpToLevel) * 100);
}

export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'NATIONAL';

export const getRankInfo = (level: number) => {
  if (level >= 100) return { rank: 'NATIONAL' as Rank, label: 'NATIONAL LEVEL HUNTER', color: '#FFD700', glow: 'shadow-[0_0_20px_#FFD700]' };
  if (level >= 50) return { rank: 'S' as Rank, label: 'S-RANK (ELITE)', color: '#9D4EDD', glow: 'shadow-[0_0_15px_#9D4EDD]' };
  if (level >= 40) return { rank: 'A' as Rank, label: 'A-RANK (HIGH)', color: '#FF4D4D', glow: 'shadow-[0_0_12px_#FF4D4D]' };
  if (level >= 30) return { rank: 'B' as Rank, label: 'B-RANK (MEDIUM-HIGH)', color: '#FFA500', glow: 'shadow-[0_0_10px_#FFA500]' };
  if (level >= 20) return { rank: 'C' as Rank, label: 'C-RANK (MEDIUM)', color: '#00E5FF', glow: 'shadow-[0_0_8px_#00E5FF]' };
  if (level >= 10) return { rank: 'D' as Rank, label: 'D-RANK (LOW)', color: '#4CAF50', glow: 'shadow-[0_0_6px_#4CAF50]' };
  return { rank: 'E' as Rank, label: 'E-RANK (LOWEST)', color: '#808080', glow: 'shadow-[0_0_4px_#808080]' };
};
