import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const PullCordSwitch: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = () => {
    setIsPulling(true);
    toggleTheme();
    setTimeout(() => {
      setIsPulling(false);
    }, 450);
  };

  return (
    <div 
      className="fixed top-0 right-8 z-50 flex flex-col items-center pointer-events-auto cursor-pointer group select-none"
      onClick={handlePull}
      title={isDark ? "Pull cord to switch to light mode" : "Pull cord to switch to dark mode"}
    >
      {/* Ceiling Mount */}
      <div className="w-5 h-2 bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-700 rounded-b shadow-sm" />

      {/* Cord String with chrome beads */}
      <motion.div
        animate={{
          height: isPulling ? 130 : 75,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
        }}
        className="w-[2px] bg-gradient-to-b from-white/80 via-zinc-300 to-white/90 relative flex flex-col items-center shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      >
        {/* Tiny chrome beads */}
        <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-3 shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-8 shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-14 shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
      </motion.div>

      {/* Hanging Chrome Weight / Bell Tassel */}
      <motion.div
        animate={{
          y: isPulling ? 55 : 0,
          rotate: isPulling ? [0, -8, 8, -4, 4, 0] : [0, 1.5, -1.5, 0],
        }}
        transition={{
          y: { type: "spring", stiffness: 400, damping: 15 },
          rotate: { duration: isPulling ? 0.6 : 3, repeat: isPulling ? 0 : Infinity, ease: "easeInOut" }
        }}
        className="relative flex flex-col items-center group-hover:scale-110 transition-transform"
      >
        {/* Chrome Bead */}
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-white via-zinc-300 to-zinc-500 shadow-md" />
        {/* Chrome Weighted Cylinder */}
        <div className="w-3.5 h-7 rounded-full bg-gradient-to-r from-zinc-400 via-white to-zinc-600 shadow-[0_4px_12px_rgba(0,0,0,0.8)] border border-white/60 mt-0.5 flex items-center justify-center">
          <div className="w-1 h-3 rounded-full bg-black/40" />
        </div>
        {/* Ambient Glow underneath when pulling */}
        {isPulling && (
          <div className="absolute -bottom-2 w-8 h-8 rounded-full bg-white/40 blur-md pointer-events-none" />
        )}
      </motion.div>

      {/* Floating tooltip badge */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-24 -left-12 text-[10px] uppercase font-mono tracking-wider font-bold px-2.5 py-1 rounded bg-white text-black whitespace-nowrap pointer-events-none shadow-2xl">
        {isDark ? "💡 Lights On" : "🌙 Lights Out"}
      </div>
    </div>
  );
};
