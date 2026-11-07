import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, GraduationCap, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { BlurRevealText } from './BlurRevealText';

export const Hero: React.FC = () => {
  const { playClickSound } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);

  // Auto-flip role card every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleCardClick = () => {
    playClickSound(700);
    setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
  };

  const handleScrollTo = (id: string) => {
    playClickSound(850);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-black">
      
      {/* Background ambient lighting - Pure white subtle glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8">
          
          {/* Left Column: Heading, Spiral Flip Card, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-white/15 text-xs font-mono text-zinc-300 shadow-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="w-2 h-2 rounded-full bg-white -ml-4" />
              <span>Available for Software Engineering Roles & Projects</span>
            </motion.div>

            {/* Main Greeting */}
            <div className="space-y-1">
              <BlurRevealText
                text="Hi, I'm Sri Charan."
                as="h1"
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.08]"
              />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-400 font-display">
                I am a
              </p>
            </div>

            {/* Signature Spiral-Ring Desk Calendar / Tear-Off Flip Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={handleCardClick}
              className="mt-6 mb-8 w-full max-w-lg cursor-pointer group select-none"
              title="Click to flip role"
            >
              {/* Spiral Chrome Rings on Top */}
              <div className="flex justify-between px-6 -mb-3 relative z-20">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Ring loop */}
                    <div className="w-2.5 h-6 rounded-full bg-gradient-to-r from-zinc-400 via-white to-zinc-500 shadow-md border border-white/40 transform -rotate-3 group-hover:rotate-0 transition-transform" />
                    {/* Hole in paper */}
                    <div className="w-2 h-2 rounded-full bg-black -mt-1 shadow-inner" />
                  </div>
                ))}
              </div>

              {/* Physical Desk Calendar Card */}
              <div className="relative rounded-2xl bg-white text-black pt-8 pb-6 px-6 sm:px-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-zinc-200 group-hover:border-black transition-all duration-300">
                
                {/* Subtle paper line texture */}
                <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_bottom,transparent_95%,rgba(0,0,0,0.03)_100%)] bg-[length:100%_24px] pointer-events-none" />

                {/* Flip role text container with AnimatePresence */}
                <div className="h-16 sm:h-20 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={roleIndex}
                      initial={{ y: 25, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -25, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="w-full"
                    >
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-black">
                        {PERSONAL_INFO.roles[roleIndex]}
                      </h2>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom card footer: Pagination & helper */}
                <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs font-mono text-zinc-600">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-800">
                    <Sparkles size={12} className="text-black" />
                    Click to flip
                  </span>
                  <span className="font-bold px-2 py-0.5 rounded bg-zinc-100 text-black border border-zinc-300">
                    0{roleIndex + 1} / 0{PERSONAL_INFO.roles.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary Pill Button with hover arrow slide */}
              <button
                onClick={() => handleScrollTo('doors')}
                className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide shadow-xl hover:bg-zinc-200 transition-all duration-200"
              >
                <span>Enter The Doors</span>
                <span className="w-7 h-7 rounded-full bg-black text-white group-hover:bg-zinc-800 flex items-center justify-center transition-colors">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              {/* Secondary Ghost Button */}
              <button
                onClick={() => handleScrollTo('projects')}
                className="px-6 py-4 rounded-full border border-white/20 hover:border-white bg-black hover:bg-white/10 text-white font-medium text-sm transition-all duration-200"
              >
                See All Projects
              </button>

              {/* Contact Button */}
              <button
                onClick={() => handleScrollTo('contact')}
                className="px-6 py-4 rounded-full text-zinc-400 hover:text-white text-sm font-mono transition-colors"
              >
                Get in touch →
              </button>
            </motion.div>

          </div>

          {/* Right Column: Editorial Portrait Card & Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md group"
            >
              {/* Subtle monochrome border glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-white/20 via-zinc-400/20 to-white/20 blur-lg opacity-40 group-hover:opacity-80 transition-opacity" />

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-white/15 shadow-2xl">
                
                {/* Portrait Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950">
                  <img
                    src="/charan-portrait.jpg"
                    alt="Rekapalli Sri Charan"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  {/* Subtle luxury vignette blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-75 pointer-events-none" />

                  {/* Floating Ability Card Badge matching Instagram reel */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/90 backdrop-blur-md border border-white/15 shadow-2xl group-hover:border-white/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-bold flex items-center gap-1.5">
                        <GraduationCap size={13} className="text-white" />
                        Loyola Academy '26
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        B.Sc CSE • Sem V
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/10">
                      <span className="flex items-center gap-1 text-zinc-300">
                        <MapPin size={12} className="text-white" />
                        Secunderabad, IN
                      </span>
                      <span className="text-white font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        SIH '26 Finalist
                      </span>
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator matching Instagram Reel */}
      <div className="w-full flex justify-center pb-4 z-10">
        <button
          onClick={() => handleScrollTo('doors')}
          className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors group"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-white">
            Scroll to discover
          </span>
          <ChevronDown size={16} className="animate-bounce text-zinc-400 group-hover:text-white" />
        </button>
      </div>

    </section>
  );
};
