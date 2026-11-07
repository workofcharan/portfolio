import React from 'react';
import { Sparkles, Trophy, Award, Code2, Globe, Cpu, Layers } from 'lucide-react';

interface MarqueeItem {
  text: string;
  badge?: string;
  icon: React.ReactNode;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  {
    text: 'SMART INDIA HACKATHON 2026 FINALIST',
    badge: 'TEAM BATMAN',
    icon: <Trophy size={14} className="text-white" />,
  },
  {
    text: 'LOYOLA ACADEMY • B.SC CSE',
    badge: 'DEGREE & PG COLLEGE',
    icon: <Award size={14} className="text-white" />,
  },
  {
    text: 'EXPLAINABLE CREDIT LEDGER',
    badge: 'DUAL-SCORE FINTECH AI',
    icon: <Layers size={14} className="text-white" />,
  },
  {
    text: 'SAMPRADAYA EVENTS • 31K+ AUDIENCE',
    badge: 'PRODUCTION CLIENT SITE',
    icon: <Globe size={14} className="text-white" />,
  },
  {
    text: 'CISCO & TASK PYTHON CERTIFIED',
    badge: 'VERIFIED CREDENTIAL',
    icon: <Code2 size={14} className="text-white" />,
  },
  {
    text: 'YAADRI AI MEMORY COMPANION',
    badge: 'COGNITIVE GRAPH UI',
    icon: <Cpu size={14} className="text-white" />,
  },
  {
    text: 'CRAVE+ MULTILINGUAL DISCOVERY',
    badge: 'WEB SPEECH API',
    icon: <Sparkles size={14} className="text-white" />,
  },
  {
    text: 'FINCORE FINANCIAL CONSULTANCY',
    badge: 'ENTERPRISE PORTAL',
    icon: <Layers size={14} className="text-white" />,
  },
];

export const InfiniteMarquee: React.FC = () => {
  return (
    <div className="relative w-full py-4 bg-black border-y border-white/10 overflow-hidden select-none z-20">
      
      {/* Revanth-style Gradient Edge Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {/* Sequence 1 */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-3 group">
              <span className="p-1.5 rounded-md bg-white/10 border border-white/20 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                {item.icon}
              </span>
              <span className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-zinc-300 group-hover:text-white transition-colors uppercase whitespace-nowrap">
                {item.text}
              </span>
              {item.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-black font-bold tracking-widest whitespace-nowrap">
                  {item.badge}
                </span>
              )}
              <span className="text-zinc-600 font-serif ml-4">✦</span>
            </div>
          ))}
        </div>

        {/* Sequence 2 for seamless infinite scroll */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-3 group">
              <span className="p-1.5 rounded-md bg-white/10 border border-white/20 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                {item.icon}
              </span>
              <span className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-zinc-300 group-hover:text-white transition-colors uppercase whitespace-nowrap">
                {item.text}
              </span>
              {item.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-black font-bold tracking-widest whitespace-nowrap">
                  {item.badge}
                </span>
              )}
              <span className="text-zinc-600 font-serif ml-4">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

