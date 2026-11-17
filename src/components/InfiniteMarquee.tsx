import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
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
    icon: <Trophy size={14} />,
  },
  {
    text: 'LOYOLA ACADEMY • B.SC CSE',
    badge: 'DEGREE & PG COLLEGE',
    icon: <Award size={14} />,
  },
  {
    text: 'EXPLAINABLE CREDIT LEDGER',
    badge: 'DUAL-SCORE FINTECH AI',
    icon: <Layers size={14} />,
  },
  {
    text: 'SAMPRADAYA EVENTS • 31K+ AUDIENCE',
    badge: 'PRODUCTION CLIENT SITE',
    icon: <Globe size={14} />,
  },
  {
    text: 'CISCO & TASK PYTHON CERTIFIED',
    badge: 'VERIFIED CREDENTIAL',
    icon: <Code2 size={14} />,
  },
  {
    text: 'YAADRI AI MEMORY COMPANION',
    badge: 'COGNITIVE GRAPH UI',
    icon: <Cpu size={14} />,
  },
  {
    text: 'CRAVE+ MULTILINGUAL DISCOVERY',
    badge: 'WEB SPEECH API',
    icon: <Sparkles size={14} />,
  },
  {
    text: 'FINCORE FINANCIAL CONSULTANCY',
    badge: 'ENTERPRISE PORTAL',
    icon: <Layers size={14} />,
  },
];

export const InfiniteMarquee: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(tickerRef);
  return (
  <div ref={tickerRef} className="credentials-ticker relative w-full overflow-hidden py-4 select-none">
    <div className="credentials-ticker-mask">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center" style={isVisible ? undefined : { animationPlayState: 'paused' }}>
        {[0, 1].map(copy => (
          <div key={copy} className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12" aria-hidden={copy === 1 ? true : undefined}>
            {MARQUEE_ITEMS.map(item => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="ticker-icon p-1.5 rounded-md border" aria-hidden="true">{item.icon}</span>
                <span className="ticker-text text-xs sm:text-sm font-mono font-semibold uppercase whitespace-nowrap">{item.text}</span>
                {item.badge && <span className="ticker-badge text-[10px] font-mono px-2 py-0.5 rounded-full font-bold whitespace-nowrap">{item.badge}</span>}
                <span className="ticker-separator ml-4" aria-hidden="true">&#10022;</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);
};
