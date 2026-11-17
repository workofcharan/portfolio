import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin, Code2, Sparkles } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './Icons';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { TiltCard } from './ui/tilt-card';

export const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const rise = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' as const } },
  };
  return (
    <motion.section id="home" className="portfolio-hero hero-redesign relative overflow-hidden"
      initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.09 } } }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={rise} className="flex flex-wrap items-center justify-between gap-4 mb-12 text-xs text-zinc-400">
          <span className="hero-availability inline-flex items-center gap-2.5 rounded-full border border-white/15 px-3 py-2"><span className="size-1.5 rounded-full bg-lime-300" />Open to opportunities</span>
          <span className="inline-flex items-center gap-2"><MapPin size={13} />Hyderabad, India</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.p variants={rise} className="text-base sm:text-lg text-zinc-300 mb-5">Hi, I&apos;m <span className="text-white font-semibold">Sri Charan.</span><span className="hero-greeting-mark text-lime-300 ml-2" aria-hidden="true">&#10038;</span></motion.p>
            <h1 className="hero-display hero-heading">
              <span className="block overflow-hidden"><motion.span variants={rise} className="block">Ideas into</motion.span></span>
              <span className="block overflow-hidden pb-3"><motion.span variants={rise} className="hero-display-serif block">experiences.</motion.span></span>
            </h1>
            <motion.p variants={rise} className="hero-description mt-5 max-w-lg text-base sm:text-lg leading-relaxed">A software developer bringing thoughtful interfaces and intelligent systems to life. I build for the web, explore AI, and care about the details that make software feel right.</motion.p>
            <motion.div variants={rise} className="hero-actions mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="hero-primary inline-flex items-center justify-between gap-7 rounded-full px-6 py-4 text-sm font-semibold">See what I build <ArrowUpRight size={19} /></a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center gap-5 rounded-full border border-white/20 px-6 py-4 text-sm font-medium text-white hover:bg-white/5">Let&apos;s talk <ArrowUpRight size={17} /></a>
            </motion.div>
            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-5">
              <span className="text-xs text-zinc-500">Find me elsewhere</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hero-social inline-flex items-center gap-2 text-xs text-zinc-300 hover:text-white"><Github size={15} />GitHub <ArrowUpRight size={12} /></a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hero-social inline-flex items-center gap-2 text-xs text-zinc-300 hover:text-white"><Linkedin size={15} />LinkedIn <ArrowUpRight size={12} /></a>
            </motion.div>
          </div>

          <motion.figure variants={rise} className="hero-photo-composition lg:col-span-5 relative m-0">
            <div className="hero-photo-outline absolute inset-0 rounded-[2rem] border border-white/15 pointer-events-none" aria-hidden="true" />
            <TiltCard className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-zinc-950">
              <img src="/charan-portrait.jpg" alt="Sri Charan, software developer based in Hyderabad" className="hero-photo w-full object-cover" fetchPriority="high" width={935} height={1024} />
            </TiltCard>
            <div className="hero-photo-index absolute top-5 left-5 flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-mono"><Code2 size={12} />DEVELOPER &amp; CURIOUS HUMAN</div>
            <figcaption className="hero-photo-note relative mx-4 -mt-8 sm:mx-6 rounded-2xl border border-white/15 bg-zinc-950 p-4 sm:p-5 flex items-center justify-between gap-4">
              <div><span className="block text-sm font-semibold text-white">Always learning. Always building.</span><span className="block mt-1.5 text-xs text-zinc-400">Computer Science &amp; Engineering, Loyola Academy</span></div>
              <Sparkles size={24} className="shrink-0 text-lime-300" aria-hidden="true" />
            </figcaption>
          </motion.figure>
        </div>

        <motion.div variants={rise} className="hero-footnotes mt-14 lg:mt-16 grid sm:grid-cols-3 gap-6 sm:gap-8 border-t border-white/15 py-7">
          <div className="flex items-center gap-4"><span className="hero-project-count text-3xl font-display text-white tabular-nums">{String(PROJECTS.length).padStart(2, '0')}<span className="text-lime-300">+</span></span><div><span className="block text-xs font-medium text-white">Projects &amp; experiments</span><span className="block mt-1 text-xs text-zinc-500">Ideas brought to life</span></div></div>
          <div className="sm:border-l sm:border-white/15 sm:pl-8"><span className="block text-xs font-medium text-white">Full-stack meets AI</span><span className="block mt-2 text-xs text-zinc-400">React / TypeScript / Python</span></div>
          <a href="#projects" className="hero-featured-link sm:border-l sm:border-white/15 sm:pl-8 flex items-center justify-between gap-4 group"><div><span className="block text-[10px] font-mono text-zinc-500 mb-1.5">EXPLORE SELECTED WORK</span><span className="block text-xs font-medium text-white">From first idea to final detail</span></div><span className="size-9 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-white"><ArrowDown size={15} className="transition-transform duration-150 group-hover:translate-y-0.5" /></span></a>
        </motion.div>
      </div>
    </motion.section>
  );
};
