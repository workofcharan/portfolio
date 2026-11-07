import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DOORS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BlurRevealText } from './BlurRevealText';

interface DoorsSectionProps {
  onSelectDoor: (doorId: string) => void;
}

export const DoorsSection: React.FC<DoorsSectionProps> = ({ onSelectDoor }) => {
  const { playClickSound } = useTheme();
  const [hoveredDoor, setHoveredDoor] = useState<string | null>(null);

  const handleDoorClick = (id: string) => {
    playClickSound(520);
    onSelectDoor(id);
    const target = document.getElementById('project-deck');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="doors" className="relative py-28 bg-black overflow-hidden border-t border-white/10">
      
      {/* Background glow effects - Pure white subtle blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching Instagram Reel */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-white/15 text-xs font-mono text-white mb-4"
          >
            <Sparkles size={13} />
            <span>Interactive Architectural Portals</span>
          </motion.div>

          <div className="flex justify-center">
            <BlurRevealText
              text="Magic happens behind the doors."
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight justify-center text-center"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-zinc-400 font-sans"
          >
            Hover to peek inside. Step through any door to inspect my production codebases, live deployments, and technical architectures.
          </motion.p>
        </div>

        {/* 4 3D Doors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-end perspective-1000">
          {DOORS.map((door, index) => {
            const isHovered = hoveredDoor === door.id;

            return (
              <motion.div
                key={door.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                onMouseEnter={() => {
                  setHoveredDoor(door.id);
                  playClickSound(640 + index * 40);
                }}
                onMouseLeave={() => setHoveredDoor(null)}
                onClick={() => handleDoorClick(door.id)}
                className="relative flex flex-col items-center group cursor-pointer"
              >
                {/* Door Frame Surround (Arched Wall Molding in Monochrome) */}
                <div className="relative w-full aspect-[9/16] max-w-[280px] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-3.5 rounded-t-full border-t-2 border-x-2 border-zinc-700 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
                  
                  {/* Inside Room (Revealed when door swings open) */}
                  <div className="absolute inset-x-3.5 top-3.5 bottom-0 rounded-t-full bg-black overflow-hidden flex flex-col justify-end p-5">
                    {/* Pure white luminous interior light spill */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.4) 0%, rgba(0,0,0,0.95) 80%)`,
                        opacity: isHovered ? 1 : 0.1
                      }}
                    />

                    {/* Faint Terminal / Code lines inside the room */}
                    <div className="relative z-10 font-mono text-[10px] text-zinc-400 space-y-1 mb-6 opacity-80">
                      <p className="text-white font-bold">// {door.tag}</p>
                      <p className="text-zinc-300">$ stack verify --prod</p>
                      <p className="text-white font-semibold">✓ Ready to explore</p>
                      <div className="pt-2 flex items-center gap-1.5 text-white font-semibold text-xs">
                        <span>Click to enter</span>
                        <ArrowRight size={13} className="text-white animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* 3D Hinged Door Leaf (Swings Open Inward on Hover) */}
                  <motion.div
                    animate={{
                      rotateY: isHovered ? -55 : 0,
                      transformOrigin: 'left center',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20
                    }}
                    className={`relative w-full h-full rounded-t-full bg-gradient-to-b ${door.doorColor} border-2 border-zinc-700 shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col justify-between p-6 z-20 backface-hidden preserve-3d`}
                  >
                    {/* Door Vertical Inset Paneling / Molding */}
                    <div className="absolute inset-x-4 top-14 bottom-4 border border-white/10 rounded-t-full pointer-events-none" />
                    <div className="absolute inset-x-6 top-16 bottom-6 border border-white/5 rounded-t-full pointer-events-none" />

                    {/* Top: Polished Chrome Nameplate */}
                    <div className="mt-14 relative z-10 flex justify-center">
                      <div className="chrome-metal px-3.5 py-1.5 rounded-sm shadow-md border border-white/80 flex items-center justify-center">
                        <span className="font-mono font-black text-[10px] sm:text-[11px] tracking-wider uppercase text-black">
                          {door.nameplate}
                        </span>
                      </div>
                    </div>

                    {/* Middle: Vertical Door Grooves & Chrome Handle */}
                    <div className="relative z-10 flex items-center justify-end pr-2 my-auto">
                      {/* Chrome Handle & Keyhole */}
                      <div className="flex flex-col items-center">
                        {/* Metallic lever handle */}
                        <div className="w-9 h-3 rounded-full bg-gradient-to-r from-zinc-300 via-white to-zinc-400 shadow-[0_4px_8px_rgba(0,0,0,0.8)] border border-white/60 group-hover:rotate-6 transition-transform" />
                        {/* Chrome backplate */}
                        <div className="w-3 h-8 -mt-2 rounded bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-800 shadow-sm flex items-center justify-center">
                          <div className="w-1 h-2 rounded-full bg-black" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Door Threshold badge */}
                    <div className="relative z-10 text-center pb-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white font-semibold">
                        0{index + 1} • {door.tag.split(' ')[0]}
                      </span>
                    </div>

                    {/* Subtle 3D woodgrain / metallic sheen */}
                    <div className="absolute inset-0 rounded-t-full bg-gradient-to-tr from-white/0 via-white/10 to-transparent pointer-events-none" />
                  </motion.div>

                </div>

                {/* Door Label & Description below */}
                <div className="text-center mt-5 w-full max-w-[280px]">
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-zinc-300 transition-colors flex items-center justify-center gap-1.5">
                    <span>{door.title}</span>
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1 px-2 font-sans">
                    {door.subtitle}
                  </p>
                  
                  {/* Enter CTA button */}
                  <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white group-hover:underline">
                    <span>Inspect Projects</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
