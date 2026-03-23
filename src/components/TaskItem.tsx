import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Zap } from 'lucide-react';
import { Task, useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/utils';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const toggleTask = useSystemStore((state) => state.toggleTask);
  const deleteTask = useSystemStore((state) => state.deleteTask);

  const handleToggle = () => {
    toggleTask(task.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "group flex items-center gap-4 p-4 border-l-2 transition-all duration-300",
        task.completed 
          ? "border-system-primary bg-system-primary/5 opacity-40" 
          : "border-white/10 bg-black/90 hover:border-system-primary hover:bg-white/[0.02]"
      )}
    >
      <button
        onClick={handleToggle}
        disabled={task.completed}
        className={cn(
          "w-5 h-5 flex items-center justify-center transition-all duration-300",
          task.completed 
            ? "border border-system-primary bg-system-primary text-black" 
            : "border border-white/20 bg-transparent hover:border-system-primary"
        )}
      >
        {task.completed ? <Check size={12} strokeWidth={4} /> : <div className="w-1 h-1 bg-white/20 group-hover:bg-system-primary transition-colors" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <p className={cn(
            "text-[10px] uppercase tracking-[0.4em] font-black truncate transition-all duration-500",
            task.completed ? "line-through text-white/40" : "text-white/80"
          )}>
            {task.name}
          </p>
          {task.completed && (
            <span className="text-[7px] px-1.5 py-0.5 border border-system-primary/40 text-system-primary font-black uppercase tracking-[0.4em]">
              CLEARED
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 mt-1.5">
          <div className="flex items-center gap-1.5">
            <Zap size={8} className="text-system-primary/80" />
            <span className="text-[8px] text-system-primary/80 tracking-[0.4em] font-black">
              +{task.xp} XP
            </span>
          </div>
        </div>
      </div>

      {!task.completed && (
        <button
          onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-500 transition-all duration-300 p-1"
        >
          <Trash2 size={12} />
        </button>
      )}
    </motion.div>
  );
};
