"use client"

import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  defaultActive?: string;
}

export function AnimeNavBar({ items, className, defaultActive = 'Home' }: NavBarProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(defaultActive);
  const reducedMotion = useReducedMotion();
  const layoutId = useId();

  // Native hash links keep navigation working with keyboards, refresh, and history.
  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      const sections = items.flatMap(item => {
        if (!item.url.startsWith('#') || item.url.length < 2) return [];
        const section = document.getElementById(item.url.slice(1));
        return section ? [{ item, section }] : [];
      });
      const visibleSections = sections.filter(({ section }) => section.getBoundingClientRect().top <= window.innerHeight * 0.35);
      const current = visibleSections[visibleSections.length - 1];
      if (current) setActiveTab(current.item.name);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
    };
  }, [items]);

  return (
    <div className={cn('anime-navbar fixed inset-x-0 top-14 z-40 flex justify-center px-3 pointer-events-none', className)}>
      <LayoutGroup id={layoutId}>
        <motion.nav aria-label="Main navigation" className="anime-nav-surface relative isolate flex items-center gap-1 rounded-full border border-white/15 bg-black/85 p-1.5 shadow-lg backdrop-blur-lg pointer-events-auto"
          initial={reducedMotion ? false : { y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
          {items.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            const isHovered = hoveredTab === item.name;
            return (
              <a key={item.name} href={item.url} aria-label={item.name} aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveTab(item.name)}
                onMouseEnter={() => setHoveredTab(item.name)} onMouseLeave={() => setHoveredTab(null)}
                onFocus={() => setHoveredTab(item.name)} onBlur={() => setHoveredTab(null)}
                className={cn('anime-nav-link relative isolate flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 py-3 text-sm font-semibold text-white/70 transition-colors duration-150 hover:text-white md:px-5', isActive && 'text-white')}>
                {isActive && (
                  <motion.span layoutId="active-pill" className="absolute inset-0 -z-10 overflow-hidden rounded-full bg-primary/15 border border-primary/25" transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                    {!reducedMotion && <span className="anime-nav-shine absolute inset-0" />}
                  </motion.span>
                )}
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden"><Icon size={19} strokeWidth={2} aria-hidden="true" /></span>
                <AnimatePresence>
                  {isHovered && !isActive && <motion.span className="absolute inset-0 -z-10 rounded-full bg-white/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.15 }} />}
                </AnimatePresence>
                {isActive && (
                  <motion.span layoutId="anime-mascot" className="absolute -top-11 inset-x-0 flex justify-center pointer-events-none" initial={false} transition={{ type: 'spring', stiffness: 350, damping: 28, duration: reducedMotion ? 0 : undefined }} aria-hidden="true">
                    <motion.span className="anime-mascot relative block size-10" animate={reducedMotion ? {} : { y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
                      <motion.span className="absolute inset-x-0 top-0 h-9 rounded-full bg-[#fffdf6] border border-[#dcdcdc]" animate={reducedMotion ? {} : { rotate: hoveredTab ? [0, -6, 6, 0] : 0 }} transition={{ duration: 0.35 }}>
                        <span className="absolute left-[25%] top-[38%] size-1.5 rounded-full bg-[#232323]" />
                        <span className="absolute right-[25%] top-[38%] size-1.5 rounded-full bg-[#232323]" />
                        <span className="absolute left-[12%] top-[57%] h-1 w-2 rounded-full bg-pink-300/80" />
                        <span className="absolute right-[12%] top-[57%] h-1 w-2 rounded-full bg-pink-300/80" />
                        <span className="absolute left-[35%] top-[57%] h-2 w-3 rounded-full border-b-2 border-[#232323]" />
                      </motion.span>
                      <span className="absolute bottom-0 left-4 size-2 rotate-45 bg-[#fffdf6]" />
                      <AnimatePresence>{isHovered && <motion.span className="absolute -right-3 -top-2 text-sm text-lime-300" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.15 }}>✦</motion.span>}</AnimatePresence>
                    </motion.span>
                  </motion.span>
                )}
              </a>
            );
          })}
        </motion.nav>
      </LayoutGroup>
    </div>
  );
}
