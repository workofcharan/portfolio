import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_MILESTONES } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { Compass, CheckCircle2, Award, GraduationCap, Shield, Terminal } from 'lucide-react';
import { BlurRevealText } from './BlurRevealText';

export const MyStoryTimeline: React.FC = () => {
  const { playClickSound } = useTheme();
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  const activeMilestone = TIMELINE_MILESTONES[activeMilestoneIndex];

  const handleSelectMilestone = (idx: number) => {
    playClickSound(750 + idx * 25);
    setActiveMilestoneIndex(idx);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hackathon':
        return Award;
      case 'education':
        return GraduationCap;
      case 'certification':
        return Terminal;
      case 'internship':
        return Shield;
      default:
        return Compass;
    }
  };

  return (
    <section id="story" className="relative py-28 bg-black overflow-hidden border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column matching frame 014 of reel:
              - • My story
              - Let's go back in time.
              - Giant Year display (2026 / 2025 / 2024)
              - Rotating Compass / Starburst Dial */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-white/15 text-xs font-mono text-white mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>My Story</span>
              </div>
              
              <BlurRevealText
                text="Let's go back in time."
                className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight"
              />
              
              <p className="mt-3 text-sm text-zinc-400 font-sans">
                A verified chronological timeline of my academic milestones, national hackathons, technical credentials, and engineering projects.
              </p>
            </div>

            {/* Giant Year Display with Compass Dial background */}
            <div className="relative py-6 flex items-center justify-center sm:justify-start">
              
              {/* Starburst Dial */}
              <div className="absolute left-1/2 sm:left-24 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10 animate-spin-slow pointer-events-none flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-dashed border-white/15" />
                <div className="absolute w-2 h-2 rounded-full bg-white top-0 left-1/2 -translate-x-1/2" />
                <div className="absolute w-2 h-2 rounded-full bg-zinc-500 bottom-0 left-1/2 -translate-x-1/2" />
              </div>

              {/* Dynamic Giant Year typography */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMilestone.year}
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.15, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="text-7xl sm:text-8xl lg:text-9xl font-black font-display tracking-tighter text-white select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                      {activeMilestone.year}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Sub-period & index counter */}
                <div className="mt-2 flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="font-bold text-white">
                    {activeMilestone.period}
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/15 text-white">
                    0{activeMilestoneIndex + 1} / 0{TIMELINE_MILESTONES.length}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Timeline Selector Buttons */}
            <div className="flex gap-2">
              {TIMELINE_MILESTONES.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMilestone(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    idx === activeMilestoneIndex
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-zinc-950 border border-white/15 text-zinc-400 hover:text-white'
                  }`}
                >
                  {m.year} • 0{idx + 1}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Timeline Cards List with glowing connector line */}
          <div className="lg:col-span-7 relative space-y-6">
            
            {/* Connecting Vertical Track Line */}
            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-white via-zinc-600 to-zinc-900 hidden sm:block" />

            {TIMELINE_MILESTONES.map((milestone, idx) => {
              const Icon = getTypeIcon(milestone.type);
              const isActive = idx === activeMilestoneIndex;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleSelectMilestone(idx)}
                  className={`relative sm:pl-16 cursor-pointer group transition-all duration-300 ${
                    isActive ? 'scale-[1.02]' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Glowing Node Dot on Timeline */}
                  <div 
                    className={`absolute left-4 top-8 -translate-x-1/2 w-5 h-5 rounded-full border-2 transition-all hidden sm:flex items-center justify-center ${
                      isActive
                        ? 'bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.9)] scale-125'
                        : 'bg-black border-zinc-700 group-hover:border-white'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>

                  {/* Card Body */}
                  <div 
                    className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-zinc-950 border-white shadow-2xl shadow-white/5'
                        : 'bg-zinc-950/60 border-white/10 hover:bg-zinc-950 hover:border-white/30'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-bold text-white">
                        {milestone.period}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white border border-white/20">
                        {milestone.badge}
                      </span>
                    </div>

                    {/* Title & Role */}
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-zinc-200 transition-colors">
                      {milestone.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mt-1 mb-3">
                      <span className="text-white font-semibold">{milestone.role}</span>
                      <span>•</span>
                      <span>{milestone.organization}</span>
                      <span>•</span>
                      <span>{milestone.location}</span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-4">
                      {milestone.summary}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      {milestone.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                          <CheckCircle2 size={13} className="text-white shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
};
