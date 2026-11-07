import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { Cpu, Code, Layers, Wrench } from 'lucide-react';
import { BlurRevealText } from './BlurRevealText';

export const SkillsSection: React.FC = () => {
  const { playClickSound } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const categoryIcons = [Code, Layers, Cpu, Wrench];

  return (
    <section id="skills" className="relative py-28 bg-black border-t border-white/10 overflow-hidden">
      
      {/* Subtle white glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-white/15 text-xs font-mono text-white mb-4"
          >
            <Cpu size={13} />
            <span>Technical Arsenal</span>
          </motion.div>

          <div className="flex justify-center">
            <BlurRevealText
              text="Skills grounded in real production code."
              className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight justify-center text-center"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-zinc-400 font-sans"
          >
            Every technology listed below is actively utilized in my GitHub repositories and deployed live on Vercel.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx] || Code;
            const isSelected = selectedCategory === idx;

            return (
              <button
                key={cat.title}
                onClick={() => {
                  playClickSound(700 + idx * 30);
                  setSelectedCategory(idx);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-mono font-semibold transition-all ${
                  isSelected
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-zinc-950 border border-white/15 text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon size={16} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid for Selected Category */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 text-center">
            <p className="text-xs font-mono text-zinc-400">
              {SKILL_CATEGORIES[selectedCategory].subtitle}
            </p>
          </div>

          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {SKILL_CATEGORIES[selectedCategory].skills.map((skill) => (
              <div
                key={skill.name}
                className="p-5 rounded-2xl bg-zinc-950 border border-white/15 hover:border-white hover:bg-zinc-900 transition-all duration-200 group flex items-center justify-between shadow-sm"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold font-display text-white group-hover:text-zinc-200 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Category: {skill.category}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-zinc-900 text-white border border-white/20 group-hover:bg-white group-hover:text-black">
                    {skill.level}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
