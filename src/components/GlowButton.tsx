import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/utils';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}) => {
  const variants = {
    primary: "border-system-primary/40 text-system-primary/80 hover:text-system-primary hover:border-system-primary hover:bg-system-primary/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]",
    secondary: "border-system-secondary/40 text-system-secondary/80 hover:text-system-secondary hover:border-system-secondary hover:bg-system-secondary/10 hover:shadow-[0_0_15px_rgba(79,0,208,0.2)]",
    danger: "border-red-500/40 text-red-500/80 hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[8px]",
    md: "px-5 py-2.5 text-[10px]",
    lg: "px-7 py-3.5 text-[12px]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "border uppercase tracking-[0.4em] font-black transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed relative overflow-hidden bg-black/60 backdrop-blur-sm",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <motion.div 
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-white/10 skew-x-12 z-0"
      />
    </motion.button>
  );
};
