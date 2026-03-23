import React, { useState, useEffect } from 'react';
import { cn } from '../utils/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  interval?: number;
  duration?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className, 
  interval = 5000, 
  duration = 200 
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), duration);
    };

    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerGlitch();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [interval, duration]);

  return (
    <span className={cn(
      "relative inline-block transition-all duration-75",
      isGlitching && "animate-glitch",
      className
    )}>
      {text}
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 -ml-[1px] text-red-500/50 opacity-70 animate-glitch-1 pointer-events-none">
            {text}
          </span>
          <span className="absolute top-0 left-0 ml-[1px] text-blue-500/50 opacity-70 animate-glitch-2 pointer-events-none">
            {text}
          </span>
        </>
      )}
    </span>
  );
};
