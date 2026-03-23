import React from 'react';
import { Rank } from '../store/useSystemStore';
import { cn } from '../utils/utils';

interface RankBadgeProps {
  rank: Rank;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rank, className, size = 'md' }) => {
  const rankConfig: Record<Rank, { label: string; color: string; glow: string }> = {
    'E': { label: 'E', color: 'text-gray-400', glow: 'shadow-[0_0_10px_rgba(156,163,175,0.1)]' },
    'D': { label: 'D', color: 'text-green-400', glow: 'shadow-[0_0_10px_rgba(74,222,128,0.1)]' },
    'C': { label: 'C', color: 'text-blue-400', glow: 'shadow-[0_0_10px_rgba(96,165,250,0.1)]' },
    'B': { label: 'B', color: 'text-purple-400', glow: 'shadow-[0_0_10px_rgba(192,132,252,0.1)]' },
    'A': { label: 'A', color: 'text-red-400', glow: 'shadow-[0_0_10px_rgba(248,113,113,0.1)]' },
    'S': { label: 'S', color: 'text-yellow-400', glow: 'shadow-[0_0_15px_rgba(250,204,21,0.2)]' },
    'NATIONAL': { label: 'NATIONAL', color: 'text-orange-500', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]' },
  };

  const config = rankConfig[rank];
  
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 border',
    md: 'text-[14px] px-2.5 py-0.5 border',
    lg: 'text-[20px] px-4 py-1.5 border',
  };

  return (
    <div className={cn(
      "inline-flex items-center justify-center font-black tracking-tighter uppercase italic",
      "bg-black/60 backdrop-blur-md border-current transition-all duration-500",
      config.color,
      config.glow,
      sizeClasses[size],
      className
    )}>
      {config.label}
      {rank === 'NATIONAL' && size !== 'sm' && (
        <span className="ml-2 text-[8px] not-italic tracking-[0.4em] opacity-60">LEVEL</span>
      )}
    </div>
  );
};
