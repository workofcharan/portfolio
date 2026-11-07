import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, DOORS } from '../data/portfolioData';
import { Project } from '../types';
import { DeviceMockup } from './DeviceMockup';
import { useTheme } from '../context/ThemeContext';
import { ExternalLink, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

interface StackedProjectsDeckProps {
  selectedDoorId: string | null;
  onResetDoor: () => void;
}

export const StackedProjectsDeck: React.FC<StackedProjectsDeckProps> = ({
  selectedDoorId,
  onResetDoor,
}) => {
  const { playClickSound } = useTheme();

  const filteredProjects = selectedDoorId
    ? PROJECTS.filter((p) => p.category === selectedDoorId)
    : PROJECTS;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedDoorId]);

  const currentProject: Project = filteredProjects[activeIndex] || PROJECTS[0];
  const activeDoor = DOORS.find((d) => d.id === selectedDoorId);

  const handleNext = () => {
    playClickSound(750);
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    playClickSound(710);
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleSelectCard = (index: number) => {
    playClickSound(720);
    setActiveIndex(index);
  };

  return (
    <section id="projects" className="relative py-24 bg-black border-t border-b border-white/10 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[170px] pointer-events-none bg-white/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="project-deck">
        
        {/* Top Bar: Back to doors button & Category indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          <div className="flex items-center gap-3">
            {selectedDoorId && (
              <button
                onClick={() => {
                  playClickSound(600);
                  onResetDoor();
                }}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-white/20 text-xs font-mono font-semibold text-white transition-all"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to the doors</span>
              </button>
            )}

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                {activeDoor ? `Domain: ${activeDoor.title}` : 'Featured Showcase'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                {activeDoor ? activeDoor.tag : 'Production Projects & Architectures'}
              </h2>
            </div>
          </div>

          {/* Quick Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => {
                playClickSound(650);
                onResetDoor();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                !selectedDoorId
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-zinc-950 border border-white/15 text-zinc-400 hover:text-white'
              }`}
            >
              All ({PROJECTS.length})
            </button>
            {DOORS.map((door) => {
              const count = PROJECTS.filter((p) => p.category === door.id).length;
              return (
                <button
                  key={door.id}
                  onClick={() => {
                    playClickSound(650);
                    onResetDoor();
                    setTimeout(() => {
                      const btn = document.getElementById(`door-tab-${door.id}`);
                      if (btn) btn.click();
                    }, 50);
                  }}
                  id={`door-tab-${door.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                    selectedDoorId === door.id
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-zinc-950 border border-white/15 text-zinc-400 hover:text-white'
                  }`}
                >
                  {door.nameplate} ({count})
                </button>
              );
            })}
          </div>

        </div>

        {/* Stacked 3D Card Dossier Deck */}
        <div className="relative">
          
          {/* Card Tabs Bar on top of stack */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
            {filteredProjects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => handleSelectCard(idx)}
                className={`px-4 py-2 rounded-t-xl text-xs font-mono transition-all flex items-center gap-2 border-t-2 ${
                  idx === activeIndex
                    ? 'bg-zinc-900 text-white font-bold border-white shadow-md translate-y-0.5'
                    : 'bg-zinc-950 text-zinc-400 border-transparent hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>{proj.title}</span>
                <span className="text-[10px] opacity-60">0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Main Elevated Card View */}
          <div className="relative rounded-3xl bg-zinc-950 border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-xl p-6 sm:p-8 lg:p-10">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                
                {/* Left Column: Project Details, Highlights, Buttons */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Category Badge & Index Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-white/20 bg-white/10 text-white shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      {currentProject.categoryBadge}
                    </span>

                    <span className="text-xs font-mono text-zinc-400 font-semibold">
                      CARD {activeIndex + 1} OF {filteredProjects.length}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
                      {currentProject.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-zinc-300 font-display mt-1">
                      {currentProject.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                    {currentProject.description}
                  </p>

                  {/* Engineering Highlights */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                      Key Technical Innovations & Implementation:
                    </span>
                    <ul className="space-y-2">
                      {currentProject.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                          <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-2">
                      Verified Technology Stack:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/15 text-white text-xs font-mono font-medium shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Live Demo & GitHub */}
                  <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-white/10">
                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all"
                      >
                        <span>Open Live Deployment</span>
                        <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}

                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
                    >
                      <GithubIcon size={15} />
                      <span>Inspect Repository</span>
                      <ExternalLink size={13} className="text-zinc-400 group-hover:text-white" />
                    </a>
                  </div>

                </div>

                {/* Right Column: Device Screen Preview Mockup */}
                <div className="lg:col-span-5 flex justify-center">
                  <DeviceMockup project={currentProject} />
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Bottom Deck Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              
              <button
                onClick={handlePrev}
                disabled={filteredProjects.length <= 1}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-xs font-mono text-white disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={16} />
                <span>Previous Project</span>
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectCard(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === activeIndex ? 'bg-white w-6' : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={filteredProjects.length <= 1}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-xs font-mono text-white disabled:opacity-40 transition-colors"
              >
                <span>Next Project</span>
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
