import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { GlitchText } from './GlitchText';

const MESSAGES = [
  "YOU MUST SURVIVE.",
  "THE SYSTEM REWARDS EFFORT.",
  "FAILURE IS NOT PERMITTED.",
  "YOU ARE EVOLVING.",
  "STRENGTH IS THE ONLY TRUTH.",
  "THE GATE IS OPENING.",
  "LEVEL UP TO UNLOCK NEW ABILITIES.",
];

export const SystemMessageBox: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentMessage = MESSAGES[index];

    if (isTyping) {
      if (displayText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 4000);
      }
    } else {
      timeout = setTimeout(() => {
        setIsTyping(true);
        setDisplayText("");
        setIndex((prev) => (prev + 1) % MESSAGES.length);
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [displayText, index, isTyping]);

  return (
    <div className="h-10 flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-[9px] text-system-primary/80 tracking-[0.4em] font-black uppercase text-center leading-relaxed"
        >
          <GlitchText text={displayText} interval={3000} duration={150} />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-1.5 h-2.5 bg-system-primary/80 ml-2 align-middle"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
